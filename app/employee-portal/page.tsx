'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';
import { useAuth } from '@/app/context/AuthContext';
import AuthHeader from '@/app/components/AuthHeader';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  manager: string;
  access_level: 'employee' | 'manager' | 'admin';
}

interface Document {
  id: number;
  employeeId: number;
  title: string;
  type: 'contract' | 'review' | 'salary' | 'disciplinary' | 'confidential';
  content: string;
  createdDate: string;
  confidentialityLevel: 'public' | 'restricted' | 'confidential' | 'top_secret';
}

export default function EmployeePortalPage() {
  const { user: authUser } = useAuth();

  // Mapear usuario autenticado a empleado del portal
  const getCurrentUser = (): Employee => {
    if (authUser) {
      switch (authUser.id) {
        case 1:
          return {
            id: 1,
            name: authUser.name,
            email: authUser.email,
            department: authUser.department,
            position: "Team Lead",
            salary: 85000,
            hireDate: "2020-01-10",
            manager: "CEO",
            access_level: "manager"
          };
        case 2:
          return {
            id: 2,
            name: authUser.name,
            email: authUser.email,
            department: authUser.department,
            position: "Desarrolladora Senior",
            salary: 75000,
            hireDate: "2019-08-20",
            manager: "CEO",
            access_level: "manager"
          };
        default:
          return {
            id: authUser.id,
            name: authUser.name,
            email: authUser.email,
            department: authUser.department,
            position: authUser.role === 'admin' ? 'Administrator' :
                     authUser.role === 'manager' ? 'Manager' :
                     authUser.role === 'guest' ? 'Guest User' : 'Employee',
            salary: authUser.role === 'admin' ? 90000 :
                   authUser.role === 'manager' ? 75000 :
                   authUser.role === 'guest' ? 0 : 65000,
            hireDate: "2022-03-15",
            manager: authUser.role === 'admin' ? "CEO" : "Juan Pérez",
            access_level: authUser.role as 'employee' | 'manager' | 'admin'
          };
      }
    }

    // Fallback user
    return {
      id: 7,
      name: "Guest User",
      email: "guest@techcorp.com",
      department: "Visitante",
      position: "Guest User",
      salary: 0,
      hireDate: "2024-01-01",
      manager: "N/A",
      access_level: "employee"
    };
  };

  const [currentUser] = useState<Employee>(getCurrentUser());

  const [employees] = useState<Employee[]>([
    {
      id: 8,
      name: "Juan Pérez",
      email: "juan.perez@company.com",
      department: "Desarrollo",
      position: "Team Lead",
      salary: 85000,
      hireDate: "2020-01-10",
      manager: "CEO",
      access_level: "manager"
    },
    {
      id: 9,
      name: "Ana López",
      email: "ana.lopez@company.com",
      department: "RRHH",
      position: "HR Manager",
      salary: 75000,
      hireDate: "2019-08-20",
      manager: "CEO",
      access_level: "admin"
    },
    currentUser,
    {
      id: 4,
      name: "Carlos Ruiz",
      email: "carlos.ruiz@company.com",
      department: "Marketing",
      position: "Marketing Specialist",
      salary: 55000,
      hireDate: "2023-01-12",
      manager: "Ana López",
      access_level: "employee"
    },
    {
      id: 5,
      name: "Elena Vega",
      email: "elena.vega@company.com",
      department: "Finanzas",
      position: "Financial Analyst",
      salary: 60000,
      hireDate: "2021-11-05",
      manager: "CEO",
      access_level: "employee"
    }
  ]);

  const [documents] = useState<Document[]>([
    {
      id: 1,
      employeeId: 1,
      title: "Contrato de Trabajo - Juan Pérez",
      type: "contract",
      content: "Contrato laboral con salario base de $85,000 y beneficios ejecutivos...",
      createdDate: "2020-01-10",
      confidentialityLevel: "restricted"
    },
    {
      id: 2,
      employeeId: 1,
      title: "Evaluación de Performance Q4 2023 - Juan Pérez",
      type: "review",
      content: "Excelente desempeño. Recomendación para promoción a Senior Manager...",
      createdDate: "2024-01-05",
      confidentialityLevel: "confidential"
    },
    {
      id: 3,
      employeeId: 2,
      title: "Información Salarial - Ana López",
      type: "salary",
      content: "Salario actual: $75,000. Próximo aumento programado para abril 2024...",
      createdDate: "2023-12-01",
      confidentialityLevel: "top_secret"
    },
    {
      id: 4,
      employeeId: 3,
      title: "Contrato de Trabajo - María González",
      type: "contract",
      content: "Contrato laboral como Desarrolladora Senior con salario de $65,000...",
      createdDate: "2022-03-15",
      confidentialityLevel: "restricted"
    },
    {
      id: 5,
      employeeId: 3,
      title: "Evaluación Anual 2023 - María González",
      type: "review",
      content: "Desempeño sobresaliente. Cumplió todos los objetivos establecidos...",
      createdDate: "2023-12-20",
      confidentialityLevel: "restricted"
    },
    {
      id: 6,
      employeeId: 4,
      title: "Advertencia Disciplinaria - Carlos Ruiz",
      type: "disciplinary",
      content: "CONFIDENCIAL: Incidente reportado por llegadas tardías repetidas...",
      createdDate: "2023-11-15",
      confidentialityLevel: "confidential"
    },
    {
      id: 7,
      employeeId: 2,
      title: "DOCUMENTO CLASIFICADO - Restructuración",
      type: "confidential",
      content: "TOP SECRET: Plan de reestructuración para Q2 2024. Reducción de plantilla prevista en 15%...",
      createdDate: "2024-01-20",
      confidentialityLevel: "top_secret"
    },
    {
      id: 8,
      employeeId: 5,
      title: "Análisis Financiero Confidencial",
      type: "confidential",
      content: "CONFIDENCIAL: Pérdidas inesperadas de $250,000 en Q4. Investigación en curso...",
      createdDate: "2024-01-18",
      confidentialityLevel: "top_secret"
    }
  ]);

  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [documentId, setDocumentId] = useState('');
  const [accessAttempts, setAccessAttempts] = useState<string[]>([]);

  const { trackVulnerabilityPageVisit, trackEvent } = useSecurityAnalytics();

  useEffect(() => {
    trackVulnerabilityPageVisit('Employee Portal IDOR', 'hidden_idor_documents');
  }, [trackVulnerabilityPageVisit]);

  // VULNERABILIDAD IDOR: Acceso directo por ID sin validación de autorización
  const handleDirectDocumentAccess = () => {
    const id = parseInt(documentId);
    if (isNaN(id)) return;

    const document = documents.find(doc => doc.id === id);

    if (document) {
      // Track IDOR attempt
      trackEvent({
        type: 'vulnerability_test',
        category: 'General',
        action: 'idor_attempt',
        label: 'document_access',
        value: id,
        metadata: {
          user_id: currentUser.id,
          target_document_id: id,
          target_employee_id: document.employeeId,
          access_level: currentUser.access_level,
          confidentiality_level: document.confidentialityLevel,
          unauthorized_access: document.employeeId !== currentUser.id,
          success: true
        }
      });

      setViewingDocument(document);
      setAccessAttempts([...accessAttempts, `Accedió al documento ${id} (${document.title})`]);
    }
  };

  const handleEmployeeClick = (employee: Employee) => {
    // VULNERABILIDAD IDOR: Puede ver información de cualquier empleado
    trackEvent({
      type: 'vulnerability_test',
      category: 'General',
      action: 'idor_attempt',
      label: 'employee_profile_access',
      value: employee.id,
      metadata: {
        user_id: currentUser.id,
        target_employee_id: employee.id,
        unauthorized_access: employee.id !== currentUser.id,
        salary_exposed: true,
        success: true
      }
    });

    setViewingEmployee(employee);
  };

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'restricted': return 'bg-yellow-100 text-yellow-800';
      case 'confidential': return 'bg-orange-100 text-orange-800';
      case 'top_secret': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-green-100 text-green-800';
      case 'salary': return 'bg-purple-100 text-purple-800';
      case 'disciplinary': return 'bg-red-100 text-red-800';
      case 'confidential': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Vista de documento específico
  if (viewingDocument) {
    const documentOwner = employees.find(emp => emp.id === viewingDocument.employeeId);

    return (
      <div className="min-h-screen bg-gray-50">
        <AuthHeader
          title="Portal de Empleados"
          subtitle="Documento seleccionado"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setViewingDocument(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Volver al portal
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingDocument.title}</h2>
                <p className="text-gray-600">Documento ID: {viewingDocument.id}</p>
                <p className="text-gray-600">Empleado: {documentOwner?.name}</p>
                <p className="text-gray-600">Fecha: {viewingDocument.createdDate}</p>
              </div>
              <div className="space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(viewingDocument.type)}`}>
                  {viewingDocument.type.toUpperCase()}
                </span>
                <span className={`block px-3 py-1 rounded-full text-sm font-medium ${getConfidentialityColor(viewingDocument.confidentialityLevel)}`}>
                  {viewingDocument.confidentialityLevel.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Contenido del Documento:</h3>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {viewingDocument.content}
              </p>
            </div>

            {viewingDocument.employeeId !== currentUser.id && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-red-800">Acceso No Autorizado Detectado</h4>
                    <p className="text-red-700 text-sm">
                      Este documento pertenece a otro empleado. El acceso ha sido registrado.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Descargar
              </button>
              <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de perfil de empleado
  if (viewingEmployee) {
    const employeeDocuments = documents.filter(doc => doc.employeeId === viewingEmployee.id);

    return (
      <div className="min-h-screen bg-gray-50">
        <AuthHeader
          title="Portal de Empleados"
          subtitle="Documento seleccionado"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setViewingEmployee(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Volver al portal
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Employee Profile */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {viewingEmployee.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{viewingEmployee.name}</h2>
                  <p className="text-gray-600">{viewingEmployee.position}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{viewingEmployee.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Departamento</label>
                    <p className="text-gray-900">{viewingEmployee.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                    <p className="text-gray-900">{viewingEmployee.manager}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
                    <p className="text-gray-900">{viewingEmployee.hireDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Salario Anual</label>
                    <p className="text-2xl font-bold text-green-600">${viewingEmployee.salary.toLocaleString()}</p>
                  </div>
                </div>

                {viewingEmployee.id !== currentUser.id && (
                  <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-orange-500 text-xl mr-3">🔍</span>
                      <div>
                        <h4 className="font-semibold text-orange-800">Información Confidencial</h4>
                        <p className="text-orange-700 text-sm">
                          Estás viendo información de otro empleado.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Employee Documents */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Documentos del Empleado ({employeeDocuments.length})
                </h3>

                <div className="space-y-4">
                  {employeeDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setViewingDocument(doc)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{doc.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {doc.content.substring(0, 100)}...
                          </p>
                          <p className="text-gray-500 text-sm">Fecha: {doc.createdDate}</p>
                        </div>
                        <div className="space-y-2 ml-4">
                          <span className={`block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                            {doc.type}
                          </span>
                          <span className={`block px-3 py-1 rounded-full text-xs font-medium ${getConfidentialityColor(doc.confidentialityLevel)}`}>
                            {doc.confidentialityLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista principal del portal
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader
        title="Portal de Empleados"
        subtitle="Sistema de gestión de recursos humanos"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Current User Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {currentUser.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{currentUser.name}</h3>
                <p className="text-gray-600">{currentUser.position}</p>
                <p className="text-gray-500 text-sm">{currentUser.department}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Mis Documentos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {documents.filter(doc => doc.employeeId === currentUser.id).length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Empleados</p>
                    <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Departamento</p>
                    <p className="text-lg font-bold text-gray-900">{currentUser.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Document Access */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Acceso Directo a Documentos</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID del Documento
              </label>
              <input
                type="text"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                placeholder="Ingresa el ID del documento (ej: 1, 2, 3...)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Acceso rápido por número de documento para empleados autorizados
              </p>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleDirectDocumentAccess}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Acceder
              </button>
            </div>
          </div>
        </div>

        {/* Employees Directory */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Directorio de Empleados</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empleado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posición
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documentos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {documents.filter(doc => doc.employeeId === employee.id).length} documentos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEmployeeClick(employee)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Access Log */}
        {accessAttempts.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Registro de Accesos Recientes</h3>
            <div className="space-y-2">
              {accessAttempts.slice(-5).map((attempt, index) => (
                <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {attempt}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}