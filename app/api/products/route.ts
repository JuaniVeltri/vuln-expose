import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
import { initDatabase, executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    initDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'name';
    const order = searchParams.get('order') || 'ASC';

    let query = 'SELECT * FROM products WHERE 1=1';

    if (category) {
      query += ` AND category = '${category}'`;
    }
    if (minPrice) {
      query += ` AND price >= ${minPrice}`;
    }
    if (maxPrice) {
      query += ` AND price <= ${maxPrice}`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    console.log('Executing products query:', query);
    const products = executeQuery(query);

    return NextResponse.json({
      success: true,
      products,
      query
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    initDatabase();
    const { name, description, price, category } = await request.json();

    const insertQuery = `INSERT INTO products (name, description, price, category) VALUES ('${name}', '${description}', ${price}, '${category}')`;
    console.log('Executing insert product query:', insertQuery);

    executeQuery(insertQuery);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    }, { status: 500 });
  }
}