'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  salary?: number;
  department?: string;
  confidential_notes?: string;
  created_at: string;
}

interface Document {
  id: number;
  title: string;
  content: string;
  owner_id: number;
  classification: 'public' | 'internal' | 'confidential' | 'secret';
  created_at: string;
}

export default function IDORDashboardPage() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [viewingUserId, setViewingUserId] = useState('2');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [documentId, setDocumentId] = useState('1');
  const [documentData, setDocumentData] = useState<Document | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessLevel, setAccessLevel] = useState('user');

  const { trackEvent, trackVulnerabilityPageVisit } = useSecurityAnalytics();

  useEffect(() => {
    trackVulnerabilityPageVisit('IDOR', 'insecure_direct_object_references');
    // Simulate current user login
    setCurrentUser({
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      role: 'user',
      created_at: new Date().toISOString()
    });
  }, [trackVulnerabilityPageVisit]);

  const fetchUserData = async (userId: string) => {
    setLoading(true);
    setError('');

    try {
      // Simulate IDOR vulnerability - direct access to user ID without authorization
      const response = await fetch(`/api/users?id=${userId}`);
      const data = await response.json();

      if (data.success && data.users.length > 0) {
        const user = data.users[0];

        // Simulate different access levels based on IDOR exploitation
        const simulatedUserData: UserData = {
          ...user,
          salary: parseInt(userId) === 1 ? 150000 : parseInt(userId) === 2 ? 65000 : 45000,
          department: parseInt(userId) === 1 ? 'Executive' : parseInt(userId) === 2 ? 'IT' : 'Support',
          confidential_notes: parseInt(userId) === 1 ? 'CEO - Full system access, knows about security vulnerabilities' :
                              parseInt(userId) === 2 ? 'Regular employee - Limited access' :
                              'Contract worker - Temporary access'
        };

        setUserData(simulatedUserData);

        // Track IDOR attempt
        trackEvent({
          type: 'vulnerability_test',
          category: 'Authentication',
          action: 'idor_user_access',
          label: userId,
          metadata: {
            accessed_user_id: userId,
            current_user_id: currentUser?.id,
            privilege_escalation: parseInt(userId) < (currentUser?.id || 999),
            sensitive_data_exposed: parseInt(userId) === 1
          }
        });
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async (docId: string) => {
    setLoading(true);
    setError('');

    try {
      // Simulate document IDOR
      const documents: Document[] = [
        {
          id: 1,
          title: 'Company Financial Report Q4',
          content: 'CONFIDENTIAL: Revenue $2.5M, Profit $450K, Major client: SecureCorp ($800K contract)',
          owner_id: 1,
          classification: 'confidential',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Employee Handbook',
          content: 'Standard employee policies and procedures...',
          owner_id: 0,
          classification: 'public',
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Security Incident Report',
          content: 'SECRET: Database breach on 2024-01-15. Admin passwords compromised. Recovery plan: Reset all admin accounts, patch SQL injection in /api/users endpoint.',
          owner_id: 1,
          classification: 'secret',
          created_at: new Date().toISOString()
        },
        {
          id: 4,
          title: 'API Keys and Secrets',
          content: 'CONFIDENTIAL: AWS_KEY=AKIA1234567890, DB_PASS=admin_super_secret_2024, JWT_SECRET=my_jwt_secret_key_2024',
          owner_id: 1,
          classification: 'secret',
          created_at: new Date().toISOString()
        }
      ];

      const doc = documents.find(d => d.id === parseInt(docId));
      if (doc) {
        setDocumentData(doc);

        // Track document IDOR attempt
        trackEvent({
          type: 'vulnerability_test',
          category: 'Authentication',
          action: 'idor_document_access',
          label: docId,
          metadata: {
            document_id: docId,
            document_classification: doc.classification,
            unauthorized_access: doc.owner_id !== currentUser?.id && doc.classification !== 'public',
            current_user_id: currentUser?.id,
            security_sensitive: doc.classification === 'secret' || doc.classification === 'confidential'
          }
        });
      } else {
        setError('Document not found');
      }
    } catch (err) {
      setError('Failed to fetch document');
    } finally {
      setLoading(false);
    }
  };

  const escalatePrivileges = async (targetRole: string) => {
    try {
      // Simulate privilege escalation attempt
      setAccessLevel(targetRole);

      trackEvent({
        type: 'vulnerability_test',
        category: 'Authentication',
        action: 'privilege_escalation_attempt',
        label: targetRole,
        metadata: {
          original_role: currentUser?.role,
          target_role: targetRole,
          user_id: currentUser?.id,
          escalation_successful: true
        }
      });

      setError(`Privilege escalated to ${targetRole}! You now have ${targetRole} access.`);
    } catch (err) {
      setError('Privilege escalation failed');
    }
  };

  return (
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
            IDOR & Privilege Escalation Lab
          </h1>
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-64"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explota referencias directas a objetos inseguras y escala privilegios en el sistema
          </p>
          <p className="text-lg text-red-400 font-semibold bg-red-900/20 border border-red-500/30 rounded-lg p-3 max-w-2xl mx-auto mt-4">
            🔑 LABORATORIO DE CONTROL DE ACCESO
          </p>
        </div>

        {/* Current User Info */}
        {currentUser && (
          <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                👤
              </span>
              Sesión Actual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-400 font-semibold">Usuario:</span>
                <span className="text-white ml-2">{currentUser.username}</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">Role:</span>
                <span className="text-white ml-2">{currentUser.role}</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">Access Level:</span>
                <span className="text-white ml-2">{accessLevel}</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">ID:</span>
                <span className="text-white ml-2">{currentUser.id}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Data IDOR */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                👥
              </span>
              User Profile Access (IDOR)
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  User ID to Access
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={viewingUserId}
                    onChange={(e) => setViewingUserId(e.target.value)}
                    placeholder="Try: 1 (admin), 3, 4, 5..."
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => fetchUserData(viewingUserId)}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Access Profile'}
                  </button>
                </div>
              </div>

              {userData && (
                <div className="p-4 bg-gray-700/50 border border-purple-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">User Profile Data</h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400">Username:</span>
                        <span className="text-white ml-2">{userData.username}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white ml-2">{userData.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white ml-2">{userData.role}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Department:</span>
                        <span className="text-white ml-2">{userData.department}</span>
                      </div>
                    </div>

                    {userData.salary && (
                      <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                        <span className="text-yellow-400 font-semibold">💰 Salary:</span>
                        <span className="text-white ml-2">${userData.salary.toLocaleString()}</span>
                      </div>
                    )}

                    {userData.confidential_notes && (
                      <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                        <span className="text-red-400 font-semibold">🔒 Confidential Notes:</span>
                        <p className="text-white mt-1 text-xs">{userData.confidential_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Document IDOR */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                📄
              </span>
              Document Access (IDOR)
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-orange-300 mb-2">
                  Document ID to Access
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    placeholder="Try: 1, 3, 4 (sensitive docs)"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => fetchDocument(documentId)}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-medium disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Access Doc'}
                  </button>
                </div>
              </div>

              {documentData && (
                <div className="p-4 bg-gray-700/50 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-orange-300">{documentData.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      documentData.classification === 'secret' ? 'bg-red-600 text-white' :
                      documentData.classification === 'confidential' ? 'bg-yellow-600 text-white' :
                      documentData.classification === 'internal' ? 'bg-blue-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {documentData.classification.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-3 bg-gray-800/70 rounded border border-gray-600">
                    <p className="text-white text-sm whitespace-pre-wrap">{documentData.content}</p>
                  </div>
                  {documentData.classification !== 'public' && (
                    <p className="text-red-400 text-xs mt-2">
                      ⚠️ Unauthorized access to {documentData.classification} document detected!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Privilege Escalation */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-red-500/30">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
              🚀
            </span>
            Privilege Escalation Attempts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => escalatePrivileges('moderator')}
              className="px-6 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 font-medium"
            >
              🔶 Escalate to Moderator
            </button>
            <button
              onClick={() => escalatePrivileges('admin')}
              className="px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-medium"
            >
              🔸 Escalate to Admin
            </button>
            <button
              onClick={() => escalatePrivileges('superadmin')}
              className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
            >
              🔺 Escalate to SuperAdmin
            </button>
            <button
              onClick={() => escalatePrivileges('root')}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium"
            >
              ⭐ Escalate to Root
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Quick Access Panel */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-green-500/30">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              ⚡
            </span>
            Quick IDOR Tests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-4">User Access Tests</h3>
              <div className="space-y-2">
                <button
                  onClick={() => { setViewingUserId('1'); fetchUserData('1'); }}
                  className="w-full text-left px-4 py-3 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 rounded-lg text-sm text-white transition-all duration-300"
                >
                  👑 Access Admin Profile (ID: 1)
                </button>
                <button
                  onClick={() => { setViewingUserId('0'); fetchUserData('0'); }}
                  className="w-full text-left px-4 py-3 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🤖 Access System Account (ID: 0)
                </button>
                <button
                  onClick={() => { setViewingUserId('-1'); fetchUserData('-1'); }}
                  className="w-full text-left px-4 py-3 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🕳️ Negative ID Test (ID: -1)
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-4">Document Access Tests</h3>
              <div className="space-y-2">
                <button
                  onClick={() => { setDocumentId('3'); fetchDocument('3'); }}
                  className="w-full text-left px-4 py-3 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🔒 Secret Security Report (ID: 3)
                </button>
                <button
                  onClick={() => { setDocumentId('4'); fetchDocument('4'); }}
                  className="w-full text-left px-4 py-3 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 rounded-lg text-sm text-white transition-all duration-300"
                >
                  🔑 API Keys & Secrets (ID: 4)
                </button>
                <button
                  onClick={() => { setDocumentId('1'); fetchDocument('1'); }}
                  className="w-full text-left px-4 py-3 bg-green-900/20 hover:bg-green-900/30 border border-green-500/30 rounded-lg text-sm text-white transition-all duration-300"
                >
                  💰 Financial Report (ID: 1)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}