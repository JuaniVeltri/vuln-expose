import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { initDatabase, executeQuery } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const authorName = searchParams.get('author');

    let query = 'SELECT * FROM comments WHERE 1=1';

    if (postId) {
      query += ` AND post_id = ${postId}`;
    }
    if (authorName) {
      query += ` AND author_name = '${authorName}'`;
    }

    query += ' ORDER BY created_at DESC';

    console.log('Executing comments query:', query);
    const comments = await executeQuery(query);

    return NextResponse.json({
      success: true,
      comments,
      query
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch comments',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    const { postId, authorName, content } = await request.json();

    const insertQuery = `INSERT INTO comments (post_id, author_name, content) VALUES (${postId}, '${authorName}', '${content}')`;
    console.log('Executing insert comment query:', insertQuery);

    await executeQuery(insertQuery);

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to add comment',
      error: error.message
    }, { status: 500 });
  }
}