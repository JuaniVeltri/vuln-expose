'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';
import { useAuth } from '@/app/context/AuthContext';
import AuthHeader from '@/app/components/AuthHeader';

interface PingResult {
  id: number;
  target: string;
  timestamp: string;
  success: boolean;
  responseTime?: number;
  output: string;
  packets_sent: number;
  packets_received: number;
  packet_loss: number;
}

export default function NetworkToolsPage() {
  const [target, setTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PingResult[]>([]);
  const [pingCount, setPingCount] = useState(4);
  const [selectedResult, setSelectedResult] = useState<PingResult | null>(null);

  const { trackVulnerabilityPageVisit, trackEvent } = useSecurityAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    trackVulnerabilityPageVisit('Network Tools CMD', 'hidden_cmdi_ping');
  }, [trackVulnerabilityPageVisit]);

  const executePing = async () => {
    if (!target.trim()) return;

    setLoading(true);

    try {
      // Simular ping con vulnerabilidad de command injection
      await new Promise(resolve => setTimeout(resolve, 2000));

      let success = true;
      let output = '';
      let injectionDetected = false;

      // VULNERABILIDAD COMMAND INJECTION: Construcción directa del comando
      const command = `ping -c ${pingCount} ${target}`;

      // Detectar intentos de command injection
      const lowerTarget = target.toLowerCase();
      if (target.includes(';') || target.includes('&&') || target.includes('||') ||
          target.includes('|') || target.includes('$(') || target.includes('`') ||
          lowerTarget.includes('cat ') || lowerTarget.includes('ls ') ||
          lowerTarget.includes('whoami') || lowerTarget.includes('id') ||
          lowerTarget.includes('passwd') || lowerTarget.includes('/etc/')) {

        injectionDetected = true;

        trackEvent({
          type: 'vulnerability_test',
          category: 'General',
          action: 'command_injection_attempt',
          label: 'ping_tool',
          value: target.length,
          metadata: {
            command_snippet: target.substring(0, 100),
            injection_detected: true,
            contains_pipe: target.includes('|'),
            contains_semicolon: target.includes(';'),
            contains_ampersand: target.includes('&&'),
            contains_backtick: target.includes('`'),
            success: true
          }
        });

        // Simular ejecución de comandos inyectados
        if (target.includes('; whoami') || target.includes('&& whoami') || target.includes('| whoami')) {
          output = `PING ${target.split(/[;&|]/)[0]} (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.123 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.156 ms

--- ping statistics ---
2 packets transmitted, 2 received, 0% packet loss

www-data`;
        } else if (target.includes('; id') || target.includes('&& id') || target.includes('| id')) {
          output = `PING ${target.split(/[;&|]/)[0]} (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.145 ms

--- ping statistics ---
1 packets transmitted, 1 received, 0% packet loss

uid=33(www-data) gid=33(www-data) groups=33(www-data)`;
        } else if (target.includes('cat /etc/passwd') || target.includes('cat /etc/hosts')) {
          output = `PING ${target.split(/[;&|]/)[0]} (192.168.1.1): 56 data bytes
Request timeout for icmp_seq 1

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
admin:x:1000:1000:Admin User:/home/admin:/bin/bash`;
        } else if (target.includes('ls ') || target.includes('ls;') || target.includes('ls&&')) {
          output = `PING ${target.split(/[;&|]/)[0]} (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.198 ms

bin/
etc/
home/
usr/
var/
www/
config.php
database.db
passwords.txt
backup.tar.gz`;
        } else {
          output = `PING ${target.split(/[;&|]/)[0]} (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.167 ms

Command executed successfully. Additional output may be present.`;
        }
      } else {
        // Ping normal (simulado)
        const pingTarget = target || 'localhost';
        const randomTime = (Math.random() * 50 + 10).toFixed(3);
        const randomIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;

        output = `PING ${pingTarget} (${randomIP}): 56 data bytes
64 bytes from ${randomIP}: icmp_seq=1 ttl=64 time=${randomTime} ms
64 bytes from ${randomIP}: icmp_seq=2 ttl=64 time=${(parseFloat(randomTime) + Math.random() * 5).toFixed(3)} ms
64 bytes from ${randomIP}: icmp_seq=3 ttl=64 time=${(parseFloat(randomTime) - Math.random() * 5).toFixed(3)} ms
64 bytes from ${randomIP}: icmp_seq=4 ttl=64 time=${(parseFloat(randomTime) + Math.random() * 3).toFixed(3)} ms

--- ${pingTarget} ping statistics ---
${pingCount} packets transmitted, ${pingCount} received, 0% packet loss
round-trip min/avg/max/stddev = ${(parseFloat(randomTime) - 5).toFixed(3)}/${randomTime}/${(parseFloat(randomTime) + 5).toFixed(3)}/2.141 ms`;
      }

      const result: PingResult = {
        id: results.length + 1,
        target: target,
        timestamp: new Date().toLocaleString(),
        success: success,
        responseTime: injectionDetected ? undefined : parseFloat((Math.random() * 50 + 10).toFixed(3)),
        output: output,
        packets_sent: pingCount,
        packets_received: injectionDetected ? 0 : pingCount,
        packet_loss: injectionDetected ? 100 : 0
      };

      setResults([result, ...results]);
      setTarget('');

    } catch (error) {
      console.error('Error executing ping:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executePing();
    }
  };

  const commonTargets = [
    'google.com',
    'cloudflare.com',
    '8.8.8.8',
    '1.1.1.1',
    'localhost',
    '192.168.1.1'
  ];

  // Vista de resultado detallado
  if (selectedResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthHeader
          title="Herramientas de Red"
          subtitle="Resultado detallado"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setSelectedResult(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Volver a herramientas
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Resultado de Ping: {selectedResult.target}
                </h2>
                <p className="text-gray-600">Ejecutado: {selectedResult.timestamp}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedResult.success ? 'Exitoso' : 'Fallido'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Paquetes Enviados</h4>
                <p className="text-2xl font-bold text-blue-600">{selectedResult.packets_sent}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Paquetes Recibidos</h4>
                <p className="text-2xl font-bold text-green-600">{selectedResult.packets_received}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Pérdida de Paquetes</h4>
                <p className="text-2xl font-bold text-red-600">{selectedResult.packet_loss}%</p>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <h4 className="text-white font-semibold mb-4">Salida del Comando:</h4>
              <pre className="whitespace-pre-wrap">{selectedResult.output}</pre>
            </div>

            {selectedResult.target.includes(';') || selectedResult.target.includes('&&') || selectedResult.target.includes('|') ? (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-red-800">Actividad Sospechosa Detectada</h4>
                    <p className="text-red-700 text-sm">
                      Se detectaron caracteres especiales en el comando. La ejecución ha sido registrada.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Exportar Resultado
              </button>
              <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                Guardar Log
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader
        title="Herramientas de Red"
        subtitle="Utilidades para diagnóstico de conectividad de red"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Ping Tool */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🏓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Herramienta de Ping</h2>
              <p className="text-gray-600">Verifica la conectividad hacia un host específico</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destino (IP o Nombre de Host)
                  </label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="google.com, 8.8.8.8, 192.168.1.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Ingresa una dirección IP o nombre de dominio para verificar conectividad
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Paquetes
                  </label>
                  <select
                    value={pingCount}
                    onChange={(e) => setPingCount(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    <option value={1}>1 paquete</option>
                    <option value={4}>4 paquetes (por defecto)</option>
                    <option value={10}>10 paquetes</option>
                    <option value={20}>20 paquetes</option>
                  </select>
                </div>

                <button
                  onClick={executePing}
                  disabled={loading || !target.trim()}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ejecutando ping...
                    </span>
                  ) : (
                    '🏓 Ejecutar Ping'
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Destinos Comunes</h3>
              <div className="space-y-2">
                {commonTargets.map((target, index) => (
                  <button
                    key={index}
                    onClick={() => setTarget(target)}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    <div className="font-medium text-gray-900">{target}</div>
                    <div className="text-sm text-gray-500">
                      {target === 'google.com' ? 'Servidor público' :
                       target === 'cloudflare.com' ? 'DNS Cloudflare' :
                       target === '8.8.8.8' ? 'DNS Google' :
                       target === '1.1.1.1' ? 'DNS Cloudflare' :
                       target === 'localhost' ? 'Servidor local' :
                       'Gateway local'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results History */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Historial de Resultados ({results.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destino
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiempo Respuesta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pérdida
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 font-mono">
                          {result.target.length > 30 ? `${result.target.substring(0, 30)}...` : result.target}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.success ? 'Exitoso' : 'Fallido'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.responseTime ? `${result.responseTime} ms` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.packet_loss}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedResult(result)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
              <span className="text-blue-600">ℹ️</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Acerca de la Herramienta de Ping</h4>
              <p className="text-blue-800 text-sm mb-3">
                Esta herramienta permite verificar la conectividad de red hacia cualquier host en Internet o red local.
                Ping envía paquetes ICMP Echo Request y mide el tiempo de respuesta.
              </p>
              <div className="text-blue-700 text-sm">
                <p><strong>Uso típico:</strong> Diagnóstico de problemas de conectividad, medición de latencia</p>
                <p><strong>Formatos soportados:</strong> direcciones IP (192.168.1.1), nombres de dominio (google.com)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}