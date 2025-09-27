import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { initDatabase, executeQuery } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const { username, password } = await request.json();

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log('Executing query:', query);

    const result = await executeQuery(query) as any[];

    if (result.length > 0) {
      const user = result[0];
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        message: 'Login successful'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Login failed',
      error: error.message
    }, { status: 500 });
  }
}