'use client';

import { useState } from 'react';

interface SearchResult {
  id: number;
  name: string;
  description: string;
  price?: number;
  category?: string;
}

export default function VulnerableSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setLastQuery(data.query);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 mb-8">
        <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            🔍
          </span>
          Sistema de Búsqueda Vulnerable
        </h2>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos... (prueba: ' OR 1=1 --)"
              className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {lastQuery && (
          <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-blue-500/30">
            <div className="flex items-center mb-2">
              <span className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                ⚡
              </span>
              <span className="font-semibold text-green-400">Consulta SQL ejecutada:</span>
            </div>
            <code className="block mt-2 text-sm text-gray-300 font-mono bg-gray-800/70 p-3 rounded border border-green-500/30">{lastQuery}</code>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg">
            <div className="flex items-center">
              <span className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center mr-2">
                ⚠️
              </span>
              <span className="font-semibold">Error en la búsqueda:</span>
            </div>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
            <h3 className="font-semibold text-xl text-white mb-3" dangerouslySetInnerHTML={{ __html: result.name }} />
            <p className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: result.description }} />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {result.price && (
                  <p className="text-green-400 font-semibold text-lg">${result.price}</p>
                )}
                {result.category && (
                  <span className="inline-block bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs px-3 py-1 rounded-full">
                    {result.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-gray-400 text-lg">No se encontraron resultados</p>
          <p className="text-gray-500 text-sm mt-2">Prueba con diferentes términos de búsqueda o SQL injection</p>
        </div>
      )}
    </div>
  );
}