/* eslint-disable @typescript-eslint/no-explicit-any */

import { kv } from '@vercel/kv';

// Las variables se configuran automáticamente por Vercel
// KV_REST_API_URL y KV_REST_API_TOKEN son las variables estándar

// Interfaces para TypeScript
interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

// Datos iniciales (para fallback o inicialización)
const initialData = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@vulnsite.com', role: 'admin', created_at: new Date().toISOString() },
    { id: 2, username: 'user1', password: 'password123', email: 'user1@example.com', role: 'user', created_at: new Date().toISOString() },
    { id: 3, username: 'testuser', password: 'test123', email: 'test@example.com', role: 'user', created_at: new Date().toISOString() },
    { id: 4, username: 'alice', password: 'alice456', email: 'alice@company.com', role: 'user', created_at: new Date().toISOString() }
  ] as User[],

  products: [
    { id: 1, name: 'Laptop Gaming', description: 'Laptop para gaming de alta gama', price: 1299.99, category: 'Electronics' },
    { id: 2, name: 'Mouse Inalámbrico', description: 'Mouse ergonómico inalámbrico', price: 29.99, category: 'Accessories' },
    { id: 3, name: 'Teclado Mecánico', description: 'Teclado mecánico RGB', price: 89.99, category: 'Accessories' },
    { id: 4, name: 'Monitor 4K', description: 'Monitor 27" 4K HDR', price: 399.99, category: 'Electronics' }
  ] as Product[],

  comments: [
    { id: 1, post_id: 1, author_name: 'Admin', content: '¡Bienvenidos al sistema de comentarios!', created_at: new Date().toISOString() },
    { id: 2, post_id: 1, author_name: 'Hacker', content: '<script>alert("Stored XSS")</script>', created_at: new Date().toISOString() },
    { id: 3, post_id: 1, author_name: 'Usuario', content: 'Este es un comentario normal', created_at: new Date().toISOString() },
    { id: 4, post_id: 1, author_name: 'Tester', content: '<img src="x" onerror="alert(\'Image XSS\')" />', created_at: new Date().toISOString() }
  ] as Comment[]
};

// Helpers para Vercel KV
async function getFromKV(key: string) {
  try {
    return await kv.get(key);
  } catch (error) {
    console.warn('KV not available, using memory fallback');
    return null;
  }
}

async function setToKV(key: string, value: any) {
  try {
    return await kv.set(key, value);
  } catch (error) {
    console.warn('KV not available for writing');
    return null;
  }
}

export async function initDatabase() {
  try {
    console.log('🚀 Inicializando Vercel KV database...');

    // Verificar si ya hay datos en KV
    const users = await getFromKV('users');

    if (!users) {
      console.log('📊 Poblando datos iniciales en Vercel KV...');

      // Inicializar datos en KV
      await setToKV('users', initialData.users);
      await setToKV('products', initialData.products);
      await setToKV('comments', initialData.comments);
      await setToKV('comment_counter', 4); // Para IDs incrementales

      console.log('✅ Datos iniciales guardados en Vercel KV');
    } else {
      console.log('✅ Vercel KV ya tiene datos, usando existentes');
    }

    return true;
  } catch (error) {
    console.warn('⚠️ KV no disponible, usando memoria fallback');
    return true;
  }
}

export async function executeQuery(query: string, params: any[] = []): Promise<any[]> {
  // Simulación vulnerable de SQL injection usando Vercel KV
  console.log('🔍 Executing query:', query);
  console.log('📝 Params:', params);

  const lowerQuery = query.toLowerCase();

  try {
    // SELECT queries
    if (lowerQuery.includes('select')) {
      // Users table
      if (lowerQuery.includes('from users')) {
        const users = (await getFromKV('users')) as User[] || initialData.users;

        if (lowerQuery.includes('where')) {
          // Login query vulnerable
          if (lowerQuery.includes("username = '") && lowerQuery.includes("password = '")) {
            // 🚨 Detectar SQL injection directamente en el query completo
            console.log('🔍 Query completo para análisis:', query);

            // Buscar patrones de SQL injection directamente en el query
            if (query.includes(" OR ") || query.includes(" or ") ||
                query.includes("--") || query.includes("#") ||
                query.includes("1=1") || query.includes("' OR '") ||
                query.includes("admin' OR") || query.includes("admin'--") ||
                query.includes("OR 1=1") || query.includes("or 1=1")) {
              console.log('🚨 SQL Injection detectado en query! Devolviendo usuario admin');
              return [users[0]]; // Admin user
            }

            // Si no hay injection, hacer búsqueda normal
            const usernameMatch = query.match(/username = '([^']*)'/);
            const passwordMatch = query.match(/password = '([^']*)'/);

            if (usernameMatch && passwordMatch) {
              const username = usernameMatch[1] || '';
              const password = passwordMatch[1] || '';

              console.log('🔍 Búsqueda normal - Username:', username, 'Password:', password);

              // Búsqueda normal
              const user = users.find(u => u.username === username && u.password === password);
              return user ? [user] : [];
            }
          }

          // ID filters
          if (lowerQuery.includes('id =') || lowerQuery.includes('id=')) {
            const user = users.find(u => u.id === (params[0] || 1));
            return user ? [user] : [];
          }
        }

        // UNION injection o 1=1
        if (lowerQuery.includes('union') || lowerQuery.includes('1=1')) {
          console.log('🚨 UNION/Boolean injection detectado! Devolviendo todos los usuarios');
          return users;
        }

        return users;
      }

      // Products table
      if (lowerQuery.includes('from products')) {
        const products = (await getFromKV('products')) as Product[] || initialData.products;

        if (lowerQuery.includes('like')) {
          // UNION injection en productos
          if (lowerQuery.includes('union')) {
            console.log('🚨 UNION injection en productos! Devolviendo datos de usuarios');
            const users = (await getFromKV('users')) as User[] || initialData.users;
            return users.map(u => ({
              id: u.id,
              name: u.username,
              description: u.password,
              price: u.email,
              category: u.role
            }));
          }

          // Búsqueda normal
          const searchTerm = params[0] || '';
          return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return products;
      }

      // Comments table
      if (lowerQuery.includes('from comments')) {
        const comments = (await getFromKV('comments')) as Comment[] || initialData.comments;

        if (lowerQuery.includes('post_id')) {
          const postId = params[0] || 1;
          return comments.filter(c => c.post_id === postId);
        }
        return comments;
      }
    }

    // INSERT queries
    if (lowerQuery.includes('insert')) {
      if (lowerQuery.includes('into comments')) {
        const comments = (await getFromKV('comments')) as Comment[] || [];
        const counter = (await getFromKV('comment_counter')) as number || comments.length;

        const newComment: Comment = {
          id: counter + 1,
          post_id: params[0] || 1,
          author_name: params[1] || 'Anonymous',
          content: params[2] || '',
          created_at: new Date().toISOString()
        };

        comments.push(newComment);

        // Guardar en KV
        await setToKV('comments', comments);
        await setToKV('comment_counter', counter + 1);

        console.log('💬 Nuevo comentario agregado a KV:', newComment);
        return [{ id: newComment.id }];
      }

      if (lowerQuery.includes('into users')) {
        const users = (await getFromKV('users')) as User[] || [];

        const newUser: User = {
          id: users.length + 1,
          username: params[0] || '',
          password: params[1] || '',
          email: params[2] || '',
          role: params[3] || 'user',
          created_at: new Date().toISOString()
        };

        users.push(newUser);

        // Guardar en KV
        await setToKV('users', users);

        console.log('👤 Nuevo usuario agregado a KV:', newUser);
        return [{ id: newUser.id }];
      }
    }

    return [];
  } catch (error) {
    console.error('❌ Database error:', error);
    // Fallback a datos iniciales
    if (lowerQuery.includes('from users')) return initialData.users;
    if (lowerQuery.includes('from products')) return initialData.products;
    if (lowerQuery.includes('from comments')) return initialData.comments;
    throw error;
  }
}

export async function executeQueryUnsafe(query: string) {
  return await executeQuery(query, []);
}

export async function runQuery(query: string, params: any[] = []) {
  const result = await executeQuery(query, params);
  return {
    changes: result.length > 0 ? 1 : 0,
    lastInsertRowid: result.length > 0 ? result[0].id || 0 : 0
  };
}