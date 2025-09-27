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

        {/* Aplicaciones Empresariales Realistas */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              🏢 Aplicaciones Empresariales
            </h2>
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-64"></div>
            </div>
            <p className="text-lg text-gray-300">
              Plataforma corporativa con aplicaciones de uso diario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Blog Corporativo</h2>
                  <p className="text-blue-400 font-medium">TechCorp News & Updates</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Lee las últimas noticias y actualizaciones de nuestra empresa.
                Mantente informado sobre nuevos productos, servicios y novedades tecnológicas.
              </p>
              <Link href="/blog" className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium">
                📰 Leer Blog Corporativo
              </Link>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Sistema de Facturas</h2>
                  <p className="text-green-400 font-medium">Gestión Empresarial</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Gestiona y consulta facturas empresariales. Accede a información detallada
                de clientes, montos y estados de pago de manera eficiente.
              </p>
              <Link href="/invoices" className="block w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white text-center rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium">
                💼 Acceder al Sistema
              </Link>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Portal de Empleados</h2>
                  <p className="text-purple-400 font-medium">Recursos Humanos</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Portal interno para empleados. Accede a tu información personal,
                documentos laborales y directorio de la empresa.
              </p>
              <Link href="/employee-portal" className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium">
                👥 Acceder al Portal
              </Link>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Herramientas de Red</h2>
                  <p className="text-orange-400 font-medium">Diagnóstico de Conectividad</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Utilidades para diagnóstico de red. Herramientas como ping, traceroute
                y verificación de conectividad para administradores de sistemas.
              </p>
              <Link href="/network-tools" className="block w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 font-medium">
                🔧 Usar Herramientas
              </Link>
            </div>
          </div>
        </div>

        {/* Laboratorios de Vulnerabilidades */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
              🔬 Laboratorios de Seguridad
            </h2>
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-64"></div>
            </div>
            <p className="text-lg text-gray-300">
              Entornos controlados para testing de vulnerabilidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">SQL Injection</h2>
                  <p className="text-red-400 font-medium">Database Exploitation</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Exploita vulnerabilidades SQL avanzadas: Union-based, Blind, Time-based,
                Error-based y Boolean-based injection techniques.
              </p>
              <div className="space-y-3">
                <Link href="/sqli/login" className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium">
                  🔓 Authentication Bypass
                </Link>
                <Link href="/sqli/search" className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium">
                  🔍 Data Extraction
                </Link>
                <Link href="/sqli/users" className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium">
                  👥 User Enumeration
                </Link>
                <Link href="/sqli/blind" className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium">
                  🕵️ Blind SQL Injection
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">XSS (Cross-Site Scripting)</h2>
                  <p className="text-blue-400 font-medium">Client-Side Code Injection</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Domina técnicas avanzadas de XSS: Stored, Reflected, DOM-based,
                Filter Bypass y CSP Evasion attacks.
              </p>
              <div className="space-y-3">
                <Link href="/xss/playground" className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium">
                  ⚡ XSS Laboratory
                </Link>
                <Link href="/xss/comments" className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium">
                  💬 Persistent XSS
                </Link>
                <Link href="/xss/profile" className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium">
                  👤 Profile Injection
                </Link>
                <Link href="/xss/csp-bypass" className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25 font-medium">
                  🛡️ CSP Bypass
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Laboratorios Avanzados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href="/idor/dashboard" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">IDOR & Access Control</h3>
            <p className="text-gray-400 text-sm">Bypass de autorizaciones y escalada de privilegios</p>
          </Link>

          <Link href="/cmdi" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Command Injection</h3>
            <p className="text-gray-400 text-sm">Ejecución de comandos del sistema y reverse shells</p>
          </Link>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-500/30">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">File Upload (Próximamente)</h3>
            <p className="text-gray-500 text-sm">Bypass de validaciones y ejecución remota</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-500/30">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">CSRF (Próximamente)</h3>
            <p className="text-gray-500 text-sm">Cross-Site Request Forgery attacks</p>
          </div>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                🛡️ Plataforma de Pentesting Completa
              </h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Aplicaciones Realistas</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><span className="text-blue-500 mr-2">📰</span> Blog corporativo con XSS oculto en comentarios</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">💼</span> Sistema de facturas con SQL injection en búsqueda</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">👥</span> Portal de empleados con IDOR en documentos</li>
                  <li className="flex items-center"><span className="text-orange-500 mr-2">🔧</span> Herramientas de red con command injection</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Laboratorios Explícitos</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> SQL Injection (Union, Blind, Time-based)</li>
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> XSS (Stored, Reflected, DOM-based, CSP Bypass)</li>
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> IDOR & Broken Access Control</li>
                  <li className="flex items-center"><span className="text-red-400 mr-2">●</span> Command Injection & Privilege Escalation</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-center text-red-300 font-semibold">
                ⚠️ PLATAFORMA DUAL: Aplicaciones que parecen legítimas + Laboratorios explícitos.
                <span className="text-red-400">Diseñado para pentesting realista y aprendizaje progresivo.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
