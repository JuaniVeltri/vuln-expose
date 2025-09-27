import VulnerableLogin from "@/app/components/VulnerableLogin";
import Link from "next/link";
import { Metadata } from "next";
import StructuredData from "@/app/components/StructuredData";

export const metadata: Metadata = {
  title: "SQL Injection Authentication Bypass | VulnSite",
  description: "Learn and practice SQL injection authentication bypass techniques. Educational platform for testing login vulnerabilities and pentesting authentication systems.",
  keywords: "SQL injection login, authentication bypass, SQL injection tutorial, login vulnerability, pentesting authentication",
  openGraph: {
    title: "SQL Injection Authentication Bypass - VulnSite",
    description: "Practice SQL injection techniques for bypassing authentication systems",
  },
};

export default function SQLiLoginPage() {
  return (
    <>
      <StructuredData
        type="vulnerability-page"
        title="SQL Injection Authentication Bypass"
        description="Learn and practice SQL injection authentication bypass techniques"
        vulnerabilityType="SQL Injection"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-red-400 hover:text-red-300 flex items-center font-medium transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            SQL Injection - Authentication Bypass
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explota vulnerabilidades de autenticación mediante técnicas avanzadas de SQL injection
          </p>
          <p className="text-lg text-red-400 font-semibold bg-red-900/20 border border-red-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            🔓 LABORATORIO DE BYPASS DE AUTENTICACIÓN
          </p>
        </div>

        <VulnerableLogin />

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  👥
                </span>
                Usuarios de Prueba
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-red-400 font-semibold">Admin:</span>
                        <span className="font-mono">admin / admin123</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-blue-400 font-semibold">Usuario:</span>
                        <span className="font-mono">user1 / password123</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-green-400 font-semibold">Test:</span>
                        <span className="font-mono">testuser / test123</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-purple-400 font-semibold">Alice:</span>
                        <span className="font-mono">alice / alice456</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  🔥
                </span>
                Técnicas Avanzadas
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold mb-2">Authentication Bypass</h3>
                  <div className="space-y-2 text-sm font-mono text-gray-300">
                    <p className="bg-gray-800/70 p-2 rounded">admin&apos; --</p>
                    <p className="bg-gray-800/70 p-2 rounded">&apos; OR &apos;1&apos;=&apos;1&apos; --</p>
                    <p className="bg-gray-800/70 p-2 rounded">admin&apos; OR 1=1 #</p>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">Union-based Extraction</h3>
                  <div className="space-y-2 text-sm font-mono text-gray-300">
                    <p className="bg-gray-800/70 p-2 rounded">admin&apos; UNION SELECT 1,2,3 --</p>
                    <p className="bg-gray-800/70 p-2 rounded">x&apos; UNION SELECT username,password FROM users --</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎯 Objetivos del Laboratorio
              </h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔓</span>
                </div>
                <h4 className="text-lg font-semibold text-red-400 mb-2">Bypass de Autenticación</h4>
                <p className="text-gray-400 text-sm">Comprende cómo las inyecciones SQL pueden comprometer sistemas de login</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔍</span>
                </div>
                <h4 className="text-lg font-semibold text-orange-400 mb-2">Extracción de Datos</h4>
                <p className="text-gray-400 text-sm">Aprende técnicas para extraer información sensible de la base de datos</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🛡️</span>
                </div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Contramedidas</h4>
                <p className="text-gray-400 text-sm">Identifica patrones para desarrollar defensas efectivas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
