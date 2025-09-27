import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { initDatabase, executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const username = searchParams.get('username');
    const role = searchParams.get('role');

    let query = 'SELECT id, username, email, role, created_at FROM users WHERE 1=1';

    if (userId) {
      query += ` AND id = ${userId}`;
    }
    if (username) {
      query += ` AND username = '${username}'`;
    }
    if (role) {
      query += ` AND role = '${role}'`;
    }

    console.log('Executing user query:', query);
    const users = await executeQuery(query);

    return NextResponse.json({
      success: true,
      users,
      query,
      vulnerabilities: {
        id_injection: "Try id: 1 OR 1=1",
        username_injection: "Try username: admin' OR '1'='1",
        role_injection: "Try role: admin' UNION SELECT password,null,null,null,null FROM users WHERE username='admin'--"
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const { username, password, email, role = 'user' } = await request.json();

    const insertQuery = `INSERT INTO users (username, password, email, role) VALUES ('${username}', '${password}', '${email}', '${role}')`;
    console.log('Executing insert query:', insertQuery);

    await executeQuery(insertQuery);

    return NextResponse.json({
      success: true,
      message: 'User created successfully'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    }, { status: 500 });
  }
}