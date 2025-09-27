'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VulnerableComment from '@/app/components/VulnerableComment';

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export default function XSSCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ authorName: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments?postId=1');
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: 1,
          authorName: newComment.authorName,
          content: newComment.content
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewComment({ authorName: '', content: '' });
        fetchComments();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error posting comment');
    } finally {
      setLoading(false);
    }
  };

  const insertXSSPayload = (payload: string) => {
    setNewComment(prev => ({ ...prev, content: payload }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="mb-6">
          <Link href="/" className="text-green-400 hover:text-green-300 flex items-center font-medium transition-colors duration-300">
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            XSS - Persistent Comments
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Laboratorio avanzado de XSS persistente (Stored) mediante sistema de comentarios
          </p>
          <p className="text-lg text-green-400 font-semibold bg-green-900/20 border border-green-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            💬 STORED XSS LABORATORY
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-green-500/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  ✍️
                </span>
                Crear Comentario Vulnerable
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Nombre del Autor
                  </label>
                  <input
                    type="text"
                    value={newComment.authorName}
                    onChange={(e) => setNewComment(prev => ({ ...prev, authorName: e.target.value }))}
                    placeholder="Ingresa tu nombre"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Comentario (Vulnerable a XSS)
                  </label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-32 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Escribe tu comentario aquí... o prueba algún payload XSS"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-5 h-5 bg-red-600 rounded flex items-center justify-center mr-2 text-sm">
                        ⚠️
                      </span>
                      <span className="font-semibold">Error:</span>
                    </div>
                    <p className="mt-1 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
                >
                  {loading ? 'Enviando Comentario...' : 'Publicar Comentario'}
                </button>
              </form>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  💬
                </span>
                Comentarios Persistentes ({comments.length})
              </h2>

              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <VulnerableComment key={comment.id} comment={comment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-gray-400 text-lg">No hay comentarios aún</p>
                  <p className="text-gray-500 text-sm mt-2">Sé el primero en agregar un comentario vulnerable</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold mb-6 text-red-400 flex items-center">
                <span className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center mr-2">
                  🚀
                </span>
                Payloads XSS Rápidos
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => insertXSSPayload('<script>alert("XSS básico")</script>')}
                  className="w-full text-left px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg text-sm transition-all duration-300"
                >
                  <span className="font-semibold">Script Alert</span>
                  <div className="text-xs text-red-400 mt-1">&lt;script&gt;alert()&lt;/script&gt;</div>
                </button>
                <button
                  onClick={() => insertXSSPayload('<img src="x" onerror="alert(\'Image XSS\')" />')}
                  className="w-full text-left px-4 py-3 bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 rounded-lg text-sm transition-all duration-300"
                >
                  <span className="font-semibold">Image Onerror</span>
                  <div className="text-xs text-orange-400 mt-1">&lt;img onerror=&quot;...&quot;&gt;</div>
                </button>
                <button
                  onClick={() => insertXSSPayload('<svg onload="alert(\'SVG XSS\')" />')}
                  className="w-full text-left px-4 py-3 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/30 rounded-lg text-sm transition-all duration-300"
                >
                  <span className="font-semibold">SVG Onload</span>
                  <div className="text-xs text-yellow-400 mt-1">&lt;svg onload=&quot;...&quot;&gt;</div>
                </button>
                <button
                  onClick={() => insertXSSPayload('<iframe src="javascript:alert(\'Frame XSS\')" />')}
                  className="w-full text-left px-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-lg text-sm transition-all duration-300"
                >
                  <span className="font-semibold">Iframe JavaScript</span>
                  <div className="text-xs text-purple-400 mt-1">&lt;iframe src=&quot;javascript:...&quot;&gt;</div>
                </button>
                <button
                  onClick={() => insertXSSPayload('<input onfocus="alert(\'Focus XSS\')" autofocus />')}
                  className="w-full text-left px-4 py-3 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 rounded-lg text-sm transition-all duration-300"
                >
                  <span className="font-semibold">Input Focus</span>
                  <div className="text-xs text-pink-400 mt-1">&lt;input onfocus=&quot;...&quot; autofocus&gt;</div>
                </button>
                <button
                  onClick={() => insertXSSPayload('<details open ontoggle="alert(\'Details XSS\')" />')}
                  className="w-full text-left px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm transition-all duration-300"
                >
                  <span className="font-semibold">Details Toggle</span>
                  <div className="text-xs text-indigo-400 mt-1">&lt;details ontoggle=&quot;...&quot;&gt;</div>
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  🔍
                </span>
                Características Vulnerables
              </h3>
              <ul className="text-sm space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <div>
                    <strong className="text-red-300">Sin sanitización de HTML:</strong>
                    <span className="text-gray-400 block text-xs">El contenido se renderiza directamente</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <div>
                    <strong className="text-red-300">dangerouslySetInnerHTML:</strong>
                    <span className="text-gray-400 block text-xs">React permite HTML sin escape</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <div>
                    <strong className="text-red-300">Sin Content Security Policy:</strong>
                    <span className="text-gray-400 block text-xs">No hay restricciones de ejecución</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">•</span>
                  <div>
                    <strong className="text-red-300">Persistencia en base de datos:</strong>
                    <span className="text-gray-400 block text-xs">Los payloads se almacenan permanentemente</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold mb-6 text-green-400 flex items-center">
                <span className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                  🛡️
                </span>
                Contramedidas de Seguridad
              </h3>
              <ul className="text-sm space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  <div>
                    <strong className="text-green-300">HTML Escaping:</strong>
                    <span className="text-gray-400 block text-xs">Escapar &lt;, &gt;, &quot;, &apos;, &amp;</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  <div>
                    <strong className="text-green-300">Content Security Policy:</strong>
                    <span className="text-gray-400 block text-xs">Bloquear ejecución de scripts inline</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  <div>
                    <strong className="text-green-300">Input Validation:</strong>
                    <span className="text-gray-400 block text-xs">Whitelist de caracteres permitidos</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  <div>
                    <strong className="text-green-300">Sanitization Libraries:</strong>
                    <span className="text-gray-400 block text-xs">DOMPurify, Bleach, etc.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}