import XSSPlayground from '@/app/components/XSSPlayground';
import Link from 'next/link';

export default function XSSPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center font-medium transition-colors duration-300">
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            XSS Laboratory
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Laboratorio avanzado para explorar y dominar técnicas de Cross-Site Scripting
          </p>
          <p className="text-lg text-blue-400 font-semibold bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            ⚡ ENTORNO DE EXPLOTACIÓN XSS AVANZADO
          </p>
        </div>

        <XSSPlayground />

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 mb-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                🧪
              </span>
              Vectores de Ataque XSS Implementados
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gray-700/50 rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">💾</span>
                  </div>
                  <h3 className="text-xl font-bold text-red-400">Stored XSS</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  El payload malicioso se almacena persistentemente en la base de datos y se ejecuta
                  cada vez que cualquier usuario carga la página.
                </p>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-300">
                    <strong>🔥 Nivel de Peligro:</strong> CRÍTICO - Afecta a todos los usuarios que visiten la página
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-red-300">Payloads de ejemplo:</h4>
                  <code className="block text-xs bg-gray-800/70 p-2 rounded text-gray-300 font-mono">
                    &lt;script&gt;alert('XSS')&lt;/script&gt;
                  </code>
                  <code className="block text-xs bg-gray-800/70 p-2 rounded text-gray-300 font-mono">
                    &lt;img src=x onerror=alert(1)&gt;
                  </code>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🔄</span>
                  </div>
                  <h3 className="text-xl font-bold text-orange-400">Reflected XSS</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  El payload se refleja inmediatamente en la respuesta HTTP
                  sin ser almacenado permanentemente.
                </p>
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-orange-300">
                    <strong>⚡ Vector común:</strong> Parámetros URL, formularios de búsqueda
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-orange-300">Técnicas avanzadas:</h4>
                  <code className="block text-xs bg-gray-800/70 p-2 rounded text-gray-300 font-mono">
                    javascript:alert(document.cookie)
                  </code>
                  <code className="block text-xs bg-gray-800/70 p-2 rounded text-gray-300 font-mono">
                    &lt;svg onload=alert(1)&gt;
                  </code>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400">DOM-based XSS</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  El payload se ejecuta modificando el DOM del lado del cliente
                  sin interacción directa con el servidor.
                </p>
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-300">
                    <strong>🎯 Ejecutado:</strong> Completamente en el navegador del usuario
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-yellow-300">Vectores DOM:</h4>
                  <code className="block text-xs bg-gray-800/70 p-2 rounded text-gray-300 font-mono">
                    #&lt;img src=x onerror=alert(1)&gt;
                  </code>
                  <code className="block text-xs bg-gray-800/70 p-2 rounded text-gray-300 font-mono">
                    javascript:eval(location.hash.slice(1))
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
              <h4 className="text-xl font-bold mb-4 text-red-400 flex items-center">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  ⚠️
                </span>
                Advertencia Crítica
              </h4>
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h5 className="font-semibold text-red-300 mb-2">dangerouslySetInnerHTML</h5>
                  <p className="text-sm text-gray-300">
                    Esta página utiliza <code className="bg-gray-800/70 px-2 py-1 rounded text-red-300">dangerouslySetInnerHTML</code>
                    que permite la ejecución de JavaScript arbitrario. En aplicaciones de producción,
                    <strong className="text-red-400"> NUNCA uses esta función con datos no confiables</strong>.
                  </p>
                </div>
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-300 mb-2">Impacto Real</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Robo de cookies y tokens de sesión</li>
                    <li>• Phishing y redirección maliciosa</li>
                    <li>• Keylogging y captura de credenciales</li>
                    <li>• Defacement y manipulación de contenido</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
              <h4 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  🛡️
                </span>
                Contramedidas Avanzadas
              </h4>
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <h5 className="font-semibold text-green-300 mb-2">Content Security Policy (CSP)</h5>
                  <p className="text-sm text-gray-300">
                    Implementa CSP estrictas para bloquear la ejecución de scripts inline
                    y restringir las fuentes de recursos.
                  </p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-300 mb-2">Input Sanitization</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• HTML encoding/escaping</li>
                    <li>• Whitelist de elementos permitidos</li>
                    <li>• Validación en servidor y cliente</li>
                    <li>• Bibliotecas como DOMPurify</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}