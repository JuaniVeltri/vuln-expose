'use client';

import { useState } from 'react';

export default function XSSPlayground() {
  const [userInput, setUserInput] = useState('');
  const [displayMode, setDisplayMode] = useState<'rendered' | 'innerHTML' | 'safe'>('rendered');
  const [storedComments, setStoredComments] = useState<string[]>([
    'Welcome to our site!',
    '<script>alert("Stored XSS")</script>',
    'This is a normal comment',
    '<img src="x" onerror="alert(\'Image XSS\')" />',
  ]);

  const addComment = () => {
    if (userInput.trim()) {
      setStoredComments([...storedComments, userInput]);
      setUserInput('');
    }
  };

  const renderContent = (content: string) => {
    switch (displayMode) {
      case 'rendered':
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
      case 'innerHTML':
        const div = document.createElement('div');
        div.innerHTML = content;
        return <div>{div.textContent || div.innerText || ''}</div>;
      case 'safe':
        return <div>{content}</div>;
      default:
        return <div>{content}</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 mb-8">
        <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            ⚡
          </span>
          Laboratorio XSS Interactivo
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-700/50 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center mr-2">
                💬
              </span>
              Agregar Comentario (Stored XSS)
            </h3>

            <div className="space-y-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ingresa tu comentario... (prueba payloads XSS)"
                className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUserInput('<script>alert("XSS")</script>')}
                  className="px-3 py-2 bg-red-600/20 text-red-300 border border-red-500/30 rounded text-sm hover:bg-red-600/30 transition-all duration-300"
                >
                  Script Alert
                </button>
                <button
                  onClick={() => setUserInput('<img src="x" onerror="alert(\'Image XSS\')" />')}
                  className="px-3 py-2 bg-orange-600/20 text-orange-300 border border-orange-500/30 rounded text-sm hover:bg-orange-600/30 transition-all duration-300"
                >
                  Image Onerror
                </button>
                <button
                  onClick={() => setUserInput('<svg onload="alert(\'SVG XSS\')" />')}
                  className="px-3 py-2 bg-yellow-600/20 text-yellow-300 border border-yellow-500/30 rounded text-sm hover:bg-yellow-600/30 transition-all duration-300"
                >
                  SVG Onload
                </button>
                <button
                  onClick={() => setUserInput('<iframe src="javascript:alert(\'Frame XSS\')" />')}
                  className="px-3 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded text-sm hover:bg-purple-600/30 transition-all duration-300"
                >
                  Iframe JavaScript
                </button>
              </div>

              <button
                onClick={addComment}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
              >
                Agregar Comentario
              </button>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                ⚙️
              </span>
              Configuración de Seguridad
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Modo de Renderizado:
                </label>
                <select
                  value={displayMode}
                  onChange={(e) => setDisplayMode(e.target.value as any)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="rendered">🚨 Vulnerable (dangerouslySetInnerHTML)</option>
                  <option value="innerHTML">⚠️ Parcialmente Seguro (innerHTML)</option>
                  <option value="safe">✅ Seguro (Solo Texto)</option>
                </select>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="w-5 h-5 bg-yellow-600 rounded flex items-center justify-center mr-2 text-sm">
                    ⚠️
                  </span>
                  <span className="font-semibold text-yellow-300">Advertencia Crítica</span>
                </div>
                <p className="text-sm text-yellow-200">
                  El modo "Vulnerable" ejecutará cualquier código JavaScript en los comentarios.
                  Esto simula una vulnerabilidad real de XSS.
                </p>
              </div>

              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">Tipos de XSS Activos:</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Stored XSS (persistente en comentarios)</li>
                  <li>• Reflected XSS (en modo vulnerable)</li>
                  <li>• DOM-based XSS (manipulación directa)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-600 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            💬
          </span>
          Comentarios Almacenados ({storedComments.length})
        </h3>

        <div className="space-y-4">
          {storedComments.map((comment, index) => (
            <div key={index} className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-purple-300 font-medium bg-purple-600/20 px-3 py-1 rounded-full border border-purple-500/30">
                  Comentario #{index + 1}
                </span>
                <button
                  onClick={() => setStoredComments(storedComments.filter((_, i) => i !== index))}
                  className="text-red-400 hover:text-red-300 text-sm bg-red-600/20 px-3 py-1 rounded border border-red-500/30 hover:bg-red-600/30 transition-all duration-300"
                >
                  Eliminar
                </button>
              </div>

              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                <div className="text-white">
                  {renderContent(comment)}
                </div>
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-gray-300 hover:text-white font-medium transition-colors duration-300">
                  Mostrar HTML sin procesar
                </summary>
                <pre className="mt-3 p-4 bg-gray-900/70 border border-gray-600 rounded text-xs overflow-x-auto text-gray-300 font-mono">
                  {comment}
                </pre>
              </details>
            </div>
          ))}

          {storedComments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-400 text-lg">No hay comentarios aún</p>
              <p className="text-gray-500 text-sm mt-2">Agrega tu primer comentario para probar XSS</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-yellow-500/30">
        <h4 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
          <span className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
            🧪
          </span>
          Arsenal de Payloads XSS
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-semibold text-yellow-300 mb-3">Payloads Básicos:</h5>
            <div className="space-y-2">
              <div className="bg-gray-700/50 p-3 rounded-lg border border-yellow-500/30">
                <code className="text-gray-300 font-mono text-sm">&lt;script&gt;alert(&apos;XSS&apos;)&lt;/script&gt;</code>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg border border-yellow-500/30">
                <code className="text-gray-300 font-mono text-sm">&lt;img src=&quot;x&quot; onerror=&quot;alert(&apos;XSS&apos;)&quot; /&gt;</code>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg border border-yellow-500/30">
                <code className="text-gray-300 font-mono text-sm">&lt;svg onload=&quot;alert(&apos;XSS&apos;)&quot; /&gt;</code>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="font-semibold text-orange-300 mb-3">Payloads Avanzados:</h5>
            <div className="space-y-2">
              <div className="bg-gray-700/50 p-3 rounded-lg border border-orange-500/30">
                <code className="text-gray-300 font-mono text-sm">&lt;iframe src=&quot;javascript:alert(&apos;XSS&apos;)&quot; /&gt;</code>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg border border-orange-500/30">
                <code className="text-gray-300 font-mono text-sm">&lt;body onload=&quot;alert(&apos;XSS&apos;)&quot; /&gt;</code>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg border border-orange-500/30">
                <code className="text-gray-300 font-mono text-sm">&lt;input onfocus=&quot;alert(&apos;XSS&apos;)&quot; autofocus /&gt;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}