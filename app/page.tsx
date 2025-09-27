import Link from "next/link";
import { Metadata } from "next";
import StructuredData from "./components/StructuredData";

export const metadata: Metadata = {
  title: "VulnSite - Home | Web Security Testing Platform",
  description: "Learn and practice web security vulnerabilities including SQL injection, XSS, and other penetration testing techniques in a safe educational environment.",
  keywords: "web security home, penetration testing platform, SQL injection practice, XSS testing, cybersecurity training",
  openGraph: {
    title: "VulnSite - Web Security Testing Platform",
    description: "Educational platform for practicing web vulnerabilities like SQL injection and XSS",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData type="homepage" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            VulnSite
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 mb-2">
            Plataforma Avanzada de Testing de Vulnerabilidades Web
          </p>
          <p className="text-lg text-red-400 font-semibold bg-red-900/20 border border-red-500/30 rounded-lg p-3 max-w-2xl mx-auto">
            ⚠️ ENTORNO DE PENTESTING PROFESIONAL - SOLO PARA TESTING
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  SQL Injection
                </h2>
                <p className="text-red-400 font-medium">Advanced Database Exploitation</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Exploita vulnerabilidades SQL avanzadas: Union-based, Blind, Time-based,
              Error-based y Boolean-based injection techniques.
            </p>
            <div className="space-y-3">
              <Link
                href="/sqli/login"
                className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium"
              >
                🔓 Authentication Bypass
              </Link>
              <Link
                href="/sqli/search"
                className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium"
              >
                🔍 Data Extraction
              </Link>
              <Link
                href="/sqli/users"
                className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium"
              >
                👥 User Enumeration
              </Link>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  XSS (Cross-Site Scripting)
                </h2>
                <p className="text-blue-400 font-medium">Client-Side Code Injection</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Domina técnicas avanzadas de XSS: Stored, Reflected, DOM-based,
              Filter Bypass y CSP Evasion attacks.
            </p>
            <div className="space-y-3">
              <Link
                href="/xss/playground"
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                ⚡ XSS Laboratory
              </Link>
              <Link
                href="/xss/comments"
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                💬 Persistent XSS
              </Link>
              <Link
                href="/xss/profile"
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                👤 Profile Injection
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Blind SQL Injection</h3>
              <p className="text-gray-400 text-sm">Técnicas avanzadas de extracción de datos sin output directo</p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">IDOR & Access Control</h3>
              <p className="text-gray-400 text-sm">Bypass de autorizaciones y escalada de privilegios</p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Advanced XSS</h3>
              <p className="text-gray-400 text-sm">CSP bypass, filter evasion y DOM clobbering</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                🛡️ Entorno de Pentesting Profesional
              </h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Objetivos de Entrenamiento</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Desarrollar herramientas para detectar vulnerabilidades</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Practicar técnicas avanzadas de penetration testing</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Demostrar la importancia de la codificación segura</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Simulación de entornos reales vulnerables</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Técnicas Implementadas</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> SQL Injection (Union, Blind, Time-based)</li>
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> XSS (Stored, Reflected, DOM-based)</li>
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> IDOR & Broken Access Control</li>
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> Filter Bypass & WAF Evasion</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-center text-red-300 font-semibold">
                ⚠️ ADVERTENCIA: Esta aplicación contiene vulnerabilidades intencionales.
                <span className="text-red-400">NUNCA uses estos patrones en aplicaciones de producción.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
