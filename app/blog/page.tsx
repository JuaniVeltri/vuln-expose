'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSecurityAnalytics } from '@/app/hooks/useSecurityAnalytics';
import { useAuth } from '@/app/context/AuthContext';
import AuthHeader from '@/app/components/AuthHeader';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
  email?: string;
}

export default function BlogPage() {
  const [posts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Nuevas Actualizaciones de Seguridad en Nuestros Sistemas",
      excerpt: "Implementamos las últimas actualizaciones de seguridad para proteger mejor los datos de nuestros usuarios...",
      author: "Equipo de Seguridad",
      date: "2024-01-15",
      category: "Seguridad",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Cómo Optimizar el Rendimiento de tu Base de Datos",
      excerpt: "Tips y mejores prácticas para optimizar consultas SQL y mejorar el rendimiento general de tu aplicación...",
      author: "María González",
      date: "2024-01-12",
      category: "Tecnología",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Nuestro Compromiso con la Privacidad de Datos",
      excerpt: "En TechCorp valoramos la privacidad de nuestros usuarios. Te contamos sobre nuestras políticas de protección...",
      author: "Juan Pérez",
      date: "2024-01-10",
      category: "Empresa",
      readTime: "3 min"
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      postId: 1,
      author: "Ana López",
      content: "Excelente artículo! Me parece muy importante mantener actualizados los sistemas de seguridad.",
      date: "2024-01-16",
      email: "ana@email.com"
    },
    {
      id: 2,
      postId: 1,
      author: "Carlos Ruiz",
      content: "¿Podrían compartir más detalles sobre qué específicamente se actualizó?",
      date: "2024-01-16",
      email: "carlos@email.com"
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' });
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { trackVulnerabilityPageVisit, trackXSSInjection } = useSecurityAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    trackVulnerabilityPageVisit('Blog Corporate XSS', 'hidden_xss_comments');
  }, [trackVulnerabilityPageVisit]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setShowCommentForm(false);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPost && newComment.content) {
      const comment: Comment = {
        id: comments.length + 1,
        postId: selectedPost.id,
        author: newComment.author || user?.name || 'Anónimo',
        content: newComment.content, // VULNERABILIDAD: No hay sanitización de input
        date: new Date().toISOString().split('T')[0],
        email: newComment.email || user?.email || ''
      };

      setComments([...comments, comment]);

      // Track XSS injection attempt (si contiene tags HTML)
      if (newComment.content.includes('<') || newComment.content.includes('script')) {
        trackXSSInjection(newComment.content, 'stored', 'comment_field');
      }

      setNewComment({ author: '', email: '', content: '' });
      setShowCommentForm(false);
    }
  };

  const getPostComments = (postId: number) => {
    return comments.filter(comment => comment.postId === postId);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        <AuthHeader
          title="TechCorp Blog"
          subtitle="Artículo seleccionado"
        />

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              ← Volver al blog
            </button>
          </div>

          {/* Article */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-4">{selectedPost.category}</span>
                <span>{selectedPost.date}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.readTime} de lectura</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>

              <div className="flex items-center text-gray-600 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {selectedPost.author.charAt(0)}
                </div>
                <span>Por {selectedPost.author}</span>
              </div>

              <div className="prose max-w-none text-gray-800 leading-relaxed">
                <p className="text-lg mb-4">{selectedPost.excerpt}</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Características Principales</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Implementación de mejores prácticas de seguridad</li>
                  <li>Actualizaciones automáticas del sistema</li>
                  <li>Monitoreo continuo de amenazas</li>
                  <li>Respaldo seguro de datos</li>
                </ul>
                <p>
                  Estas mejoras nos permiten mantener los más altos estándares de seguridad y confiabilidad para nuestros usuarios.
                </p>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Comentarios ({getPostComments(selectedPost.id).length})
              </h3>
              <button
                onClick={() => setShowCommentForm(!showCommentForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar comentario
              </button>
            </div>

            {/* Comment Form */}
            {showCommentForm && (
              <form onSubmit={handleSubmitComment} className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Nuevo Comentario</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                    <input
                      type="text"
                      value={newComment.author || user?.name || ''}
                      onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                      placeholder={user?.name || 'Tu nombre'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={newComment.email || user?.email || ''}
                      onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                      placeholder={user?.email || 'tu@email.com'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comentario *</label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Comparte tu opinión sobre este artículo..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Publicar comentario
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {getPostComments(selectedPost.id).map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold mr-4 mt-1">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-gray-900 mr-3">{comment.author}</h4>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      {/* VULNERABILIDAD XSS: Renderizado directo sin sanitización */}
                      <div
                        className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {getPostComments(selectedPost.id).length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Sé el primero en comentar este artículo.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader
        title="TechCorp Blog"
        subtitle="Noticias, actualizaciones y recursos tecnológicos"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículo Destacado</h2>
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handlePostClick(posts[0])}
          >
            <div className="h-64 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">{posts[0].title}</h3>
                <p className="text-blue-100">Por {posts[0].author} • {posts[0].readTime} de lectura</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-3">{posts[0].category}</span>
                <span>{posts[0].date}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{posts[0].excerpt}</p>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.slice(1).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handlePostClick(post)}
              >
                <div className="h-48 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📰</span>
                    </div>
                    <p className="text-sm">{post.category}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full mr-3">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Por {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} de lectura</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-900 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Suscríbete a nuestro newsletter</h3>
          <p className="text-blue-200 mb-6">Recibe las últimas actualizaciones y artículos directamente en tu email</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Suscribirme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}