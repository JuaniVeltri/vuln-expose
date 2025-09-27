import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export const runtime = 'nodejs';

export async function GET() {
  try {
    initDatabase();
    return NextResponse.json({ success: true, message: 'Database initialized' });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Database initialization failed',
      error: error.message
    }, { status: 500 });
  }
}