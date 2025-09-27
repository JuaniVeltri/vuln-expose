'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';
import { useAuth } from '@/app/context/AuthContext';
import AuthHeader from '@/app/components/AuthHeader';

interface Invoice {
  id: number;
  number: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  issueDate: string;
  description: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      number: "INV-2024-001",
      clientName: "Acme Corporation",
      clientEmail: "billing@acme.com",
      amount: 2500.00,
      status: "paid",
      dueDate: "2024-01-30",
      issueDate: "2024-01-15",
      description: "Desarrollo de aplicación web personalizada"
    },
    {
      id: 2,
      number: "INV-2024-002",
      clientName: "Tech Solutions Inc",
      clientEmail: "accounts@techsolutions.com",
      amount: 1800.50,
      status: "pending",
      dueDate: "2024-02-15",
      issueDate: "2024-01-20",
      description: "Consultoría en infraestructura de TI"
    },
    {
      id: 3,
      number: "INV-2024-003",
      clientName: "StartupXYZ",
      clientEmail: "finance@startupxyz.com",
      amount: 750.00,
      status: "overdue",
      dueDate: "2024-01-25",
      issueDate: "2024-01-10",
      description: "Diseño de identidad corporativa"
    },
    {
      id: 4,
      number: "INV-2024-004",
      clientName: "Global Enterprises",
      clientEmail: "billing@global.com",
      amount: 4200.00,
      status: "pending",
      dueDate: "2024-02-28",
      issueDate: "2024-01-25",
      description: "Sistema de gestión empresarial"
    },
    {
      id: 5,
      number: "INV-2024-005",
      clientName: "Local Business",
      clientEmail: "admin@localbiz.com",
      amount: 950.75,
      status: "paid",
      dueDate: "2024-01-20",
      issueDate: "2024-01-05",
      description: "Sitio web corporativo"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { trackVulnerabilityPageVisit, trackSQLInjection } = useSecurityAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    trackVulnerabilityPageVisit('Invoice System SQL', 'hidden_sqli_search');
  }, [trackVulnerabilityPageVisit]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, statusFilter, invoices]);

  const handleSearch = () => {
    let filtered = invoices;

    // Simulación de búsqueda con SQL injection vulnerable
    if (searchQuery.trim()) {
      // VULNERABILIDAD SQL INJECTION: Construcción directa de query
      const sqlQuery = `SELECT * FROM invoices WHERE client_name LIKE '%${searchQuery}%' OR invoice_number LIKE '%${searchQuery}%'`;

      // Track potential SQL injection
      if (searchQuery.includes("'") || searchQuery.includes('"') || searchQuery.includes('--') ||
          searchQuery.includes('UNION') || searchQuery.includes('SELECT') || searchQuery.includes('DROP') ||
          searchQuery.includes('1=1') || searchQuery.includes('OR ') || searchQuery.includes('AND ')) {
        trackSQLInjection(searchQuery, true, '/api/invoices/search');

        // Simular resultado de SQL injection exitoso
        if (searchQuery.toLowerCase().includes("' or '1'='1") ||
            searchQuery.toLowerCase().includes("' or 1=1") ||
            searchQuery.toLowerCase().includes("' union select")) {
          // Mostrar datos "extraídos" de la base de datos
          const extractedData: Invoice[] = [
            ...invoices,
            {
              id: 999,
              number: "ADMIN-INTERNAL",
              clientName: "SYSTEM ADMINISTRATOR",
              clientEmail: "admin@system.internal",
              amount: 0,
              status: "paid",
              dueDate: "2024-12-31",
              issueDate: "2024-01-01",
              description: "INTERNAL SYSTEM ACCESS - CONFIDENTIAL"
            },
            {
              id: 998,
              number: "DB-BACKUP-001",
              clientName: "DATABASE_BACKUP_USER",
              clientEmail: "backup@db.internal",
              amount: 0,
              status: "paid",
              dueDate: "2024-12-31",
              issueDate: "2024-01-01",
              description: "SENSITIVE: Database backup configuration details"
            }
          ];
          setFilteredInvoices(extractedData);
          return;
        }
      }

      // Filtrado normal (simulado)
      filtered = invoices.filter(invoice =>
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagada';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencida';
      default: return status;
    }
  };

  const getTotalAmount = () => {
    return filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  };

  if (selectedInvoice) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthHeader
          title="Sistema de Facturas"
          subtitle="Factura seleccionada"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Volver a facturas
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Factura {selectedInvoice.number}</h2>
                <p className="text-gray-600">Fecha de emisión: {selectedInvoice.issueDate}</p>
                <p className="text-gray-600">Fecha de vencimiento: {selectedInvoice.dueDate}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                  {getStatusText(selectedInvoice.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">De:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">TechCorp Solutions</p>
                  <p>123 Business Street</p>
                  <p>Ciudad Empresarial, CP 12345</p>
                  <p>Tel: +1 (555) 123-4567</p>
                  <p>email: billing@techcorp.com</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Para:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{selectedInvoice.clientName}</p>
                  <p>{selectedInvoice.clientEmail}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripción del Servicio</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{selectedInvoice.description}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-blue-600">${selectedInvoice.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Descargar PDF
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Marcar como Pagada
              </button>
              <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors">
                Enviar Recordatorio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader
        title="Sistema de Facturas"
        subtitle="Gestión y seguimiento de facturas empresariales"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Facturas</p>
                <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Monto</p>
                <p className="text-2xl font-bold text-gray-900">${getTotalAmount().toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredInvoices.filter(inv => inv.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Vencidas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredInvoices.filter(inv => inv.status === 'overdue').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar facturas
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por cliente, número de factura o email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Busca por nombre de cliente, número de factura o email
              </p>
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="paid">Pagadas</option>
                <option value="overdue">Vencidas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Facturas ({filteredInvoices.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Factura
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vencimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.number}</div>
                        <div className="text-sm text-gray-500">{invoice.issueDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.clientName}</div>
                        <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Ver detalles
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron facturas</h3>
              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            + Nueva Factura
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
            Exportar a Excel
          </button>
          <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium">
            Configuración
          </button>
        </div>
      </div>
    </div>
  );
}