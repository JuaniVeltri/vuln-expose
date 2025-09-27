import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({
      success: true,
      message: 'Database initialized',
      endpoints: {
        login: '/api/auth/login',
        search: '/api/search',
        products: '/api/products',
        users: '/api/users',
        comments: '/api/comments'
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Database initialization failed',
      error: error.message
    }, { status: 500 });
  }
}