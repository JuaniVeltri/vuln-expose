'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function XSSProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Juan Pérez',
    bio: 'Desarrollador web con 5 años de experiencia',
    website: 'https://example.com',
    location: 'Madrid, España'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [reflectedSearch, setReflectedSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResult(reflectedSearch);
  };

  const insertXSSPayload = (field: string, payload: string) => {
    setTempProfile(prev => ({ ...prev, [field]: payload }));
  };

  const insertSearchPayload = (payload: string) => {
    setReflectedSearch(payload);
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
            XSS - Profile Injection
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Laboratorio avanzado de XSS en perfiles de usuario con vulnerabilidades almacenadas y reflejadas
          </p>
          <p className="text-lg text-purple-400 font-semibold bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            👤 PROFILE XSS LABORATORY
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    👤
                  </span>
                  Perfil de Usuario Vulnerable
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium"
                  >
                    Editar Perfil
                  </button>
                ) : (
                  <div className="space-x-3">
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Nombre</label>
                    <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="text-white" dangerouslySetInnerHTML={{ __html: profile.name }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Biografía</label>
                    <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="text-white" dangerouslySetInnerHTML={{ __html: profile.bio }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Sitio Web</label>
                    <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="text-white" dangerouslySetInnerHTML={{ __html: profile.website }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Ubicación</label>
                    <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="text-white" dangerouslySetInnerHTML={{ __html: profile.location }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Nombre (Vulnerable a XSS)</label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ingresa tu nombre"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Biografía (Vulnerable a XSS)</label>
                    <textarea
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Cuéntanos sobre ti"
                      className="w-full h-24 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Sitio Web (Vulnerable a XSS)</label>
                    <input
                      type="text"
                      value={tempProfile.website}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://tu-sitio.com"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">Ubicación (Vulnerable a XSS)</label>
                    <input
                      type="text"
                      value={tempProfile.location}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Tu ciudad, país"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  🔍
                </span>
                Búsqueda en Perfil (XSS Reflejado)
              </h3>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={reflectedSearch}
                    onChange={(e) => setReflectedSearch(e.target.value)}
                    placeholder="Buscar en perfiles... (ej: <script>alert('XSS')</script>)"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              {searchResult && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-300 mb-2">Resultados para:</p>
                  <div
                    className="font-medium text-white"
                    dangerouslySetInnerHTML={{ __html: `"${searchResult}"` }}
                  />
                  <p className="text-xs text-yellow-400 mt-2">No se encontraron resultados.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {isEditing && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold mb-4 text-red-400 flex items-center">
                  <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    💥
                  </span>
                  Payloads XSS para Perfil
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => insertXSSPayload('name', '<script>alert("XSS en nombre")</script>')}
                    className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 hover:border-red-400/50 rounded-lg text-sm text-white transition-all duration-300"
                  >
                    🔥 Script en Nombre
                  </button>
                  <button
                    onClick={() => insertXSSPayload('bio', '<img src="x" onerror="alert(\'XSS en bio\')" />')}
                    className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 hover:border-red-400/50 rounded-lg text-sm text-white transition-all duration-300"
                  >
                    🖼️ Image en Bio
                  </button>
                  <button
                    onClick={() => insertXSSPayload('website', '<a href="javascript:alert(\'XSS en web\')">Click aquí</a>')}
                    className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 hover:border-red-400/50 rounded-lg text-sm text-white transition-all duration-300"
                  >
                    🔗 Link malicioso
                  </button>
                  <button
                    onClick={() => insertXSSPayload('location', '<svg onload="alert(\'XSS en ubicación\')" />')}
                    className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 hover:border-red-400/50 rounded-lg text-sm text-white transition-all duration-300"
                  >
                    📍 SVG en Ubicación
                  </button>
                </div>
              </div>
            )}

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  🔍
                </span>
                Payloads para Búsqueda
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => insertSearchPayload('<script>alert("XSS reflejado")</script>')}
                  className="w-full text-left px-4 py-3 bg-orange-900/20 hover:bg-orange-900/30 border border-orange-500/30 hover:border-orange-400/50 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🔥 Script básico
                </button>
                <button
                  onClick={() => insertSearchPayload('<img src=x onerror=alert("Reflected")>')}
                  className="w-full text-left px-4 py-3 bg-orange-900/20 hover:bg-orange-900/30 border border-orange-500/30 hover:border-orange-400/50 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🖼️ Image onerror
                </button>
                <button
                  onClick={() => insertSearchPayload('<svg/onload=alert("SVG")>')}
                  className="w-full text-left px-4 py-3 bg-orange-900/20 hover:bg-orange-900/30 border border-orange-500/30 hover:border-orange-400/50 rounded-lg text-sm text-white transition-all duration-300"
                >
                  📐 SVG compacto
                </button>
                <button
                  onClick={() => insertSearchPayload('"><script>alert("Escape")</script>')}
                  className="w-full text-left px-4 py-3 bg-orange-900/20 hover:bg-orange-900/30 border border-orange-500/30 hover:border-orange-400/50 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🔓 Escape atributo
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  📋
                </span>
                Tipos de XSS aquí
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">💾 Stored XSS</h4>
                  <p className="text-gray-300">En campos del perfil que se guardan y muestran</p>
                </div>
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-400 mb-2">🔄 Reflected XSS</h4>
                  <p className="text-gray-300">En la búsqueda que refleja la entrada inmediatamente</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  🛡️
                </span>
                Contramedidas
              </h3>
              <ul className="text-sm space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Validación de entrada
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Encoding de salida
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Content Security Policy
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  HttpOnly cookies
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  HTTPS obligatorio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}