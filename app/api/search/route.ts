import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
import { initDatabase, executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    initDatabase();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const table = searchParams.get('table') || 'products';

    const sqlQuery = `SELECT * FROM ${table} WHERE name LIKE '%${query}%' OR description LIKE '%${query}%'`;
    console.log('Executing search query:', sqlQuery);

    const results = executeQuery(sqlQuery);

    return NextResponse.json({
      success: true,
      results,
      query: sqlQuery
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Search failed',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    initDatabase();
    const { searchTerm, tableName = 'products' } = await request.json();

    const sqlQuery = `SELECT * FROM ${tableName} WHERE name = '${searchTerm}' OR description = '${searchTerm}'`;
    console.log('Executing POST search query:', sqlQuery);

    const results = executeQuery(sqlQuery);

    return NextResponse.json({
      success: true,
      results,
      query: sqlQuery
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Search failed',
      error: error.message
    }, { status: 500 });
  }
}