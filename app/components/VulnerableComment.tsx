'use client';

import { useState } from 'react';

interface Comment {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export default function VulnerableComment({ comment }: { comment: Comment }) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm">👤</span>
          </div>
          <h4 className="font-semibold text-white">{comment.author_name}</h4>
        </div>
        <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>

      <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
        {showRaw ? (
          <div>
            <div className="flex items-center mb-2">
              <span className="w-5 h-5 bg-orange-600 rounded flex items-center justify-center mr-2 text-sm">
                📝
              </span>
              <span className="text-orange-400 font-semibold text-sm">HTML Sin Procesar:</span>
            </div>
            <pre className="bg-gray-900/70 p-3 rounded text-sm overflow-x-auto text-gray-300 font-mono border border-gray-600">
              {comment.content}
            </pre>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-2">
              <span className="w-5 h-5 bg-red-600 rounded flex items-center justify-center mr-2 text-sm">
                ⚡
              </span>
              <span className="text-red-400 font-semibold text-sm">Contenido Renderizado (VULNERABLE):</span>
            </div>
            <div className="text-white bg-gray-900/30 p-3 rounded border border-red-500/30" dangerouslySetInnerHTML={{ __html: comment.content }} />
          </div>
        )}
      </div>

      <button
        onClick={() => setShowRaw(!showRaw)}
        className="text-blue-400 hover:text-blue-300 text-sm underline font-medium transition-colors duration-300 bg-blue-600/20 px-3 py-1 rounded border border-blue-500/30 hover:bg-blue-600/30"
      >
        {showRaw ? 'Mostrar Renderizado' : 'Mostrar HTML Crudo'}
      </button>
    </div>
  );
}