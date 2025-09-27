'use client';

import { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function VulnerableLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPayload, setShowPayload] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-green-500/30">
        <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center">
          <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
            ✓
          </span>
          Login Successful!
        </h2>
        <div className="space-y-3 mb-6">
          <p className="text-gray-300"><span className="font-semibold text-green-400">ID:</span> {user.id}</p>
          <p className="text-gray-300"><span className="font-semibold text-green-400">Username:</span> {user.username}</p>
          <p className="text-gray-300"><span className="font-semibold text-green-400">Email:</span> {user.email}</p>
          <p className="text-gray-300"><span className="font-semibold text-green-400">Role:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-bold rounded ${
              user.role === 'admin' ? 'bg-red-600/20 text-red-300 border border-red-500/30' : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
            }`}>
              {user.role}
            </span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-red-500/30">
      <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
        <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
          🔐
        </span>
        Authentication System
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg">
            <div className="flex items-center">
              <span className="w-5 h-5 bg-red-600 rounded flex items-center justify-center mr-2 text-sm">
                ⚠️
              </span>
              <span className="font-semibold">Error de autenticación:</span>
            </div>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
        >
          {loading ? 'Autenticando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={() => setShowPayload(!showPayload)}
          className="text-sm text-red-400 hover:text-red-300 underline font-medium transition-colors duration-300"
        >
          {showPayload ? 'Ocultar' : 'Mostrar'} Ejemplos de SQL Injection
        </button>

        {showPayload && (
          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-red-500/30">
            <p className="text-sm font-semibold mb-3 text-red-400">Payloads para probar:</p>
            <ul className="text-xs space-y-2 text-gray-300">
              <li className="bg-gray-800/70 p-2 rounded font-mono">
                <code className="text-red-300">admin&apos; --</code>
                <span className="text-gray-400 ml-2">(bypass password)</span>
              </li>
              <li className="bg-gray-800/70 p-2 rounded font-mono">
                <code className="text-red-300">&apos; OR 1=1 --</code>
                <span className="text-gray-400 ml-2">(always true condition)</span>
              </li>
              <li className="bg-gray-800/70 p-2 rounded font-mono">
                <code className="text-red-300">&apos; UNION SELECT * FROM users --</code>
                <span className="text-gray-400 ml-2">(union injection)</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}