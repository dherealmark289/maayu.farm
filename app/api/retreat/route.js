import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, country, phone, email, days, calling } = body;

    // Validate required fields
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create retreat submission
    const retreat = await prisma.retreat.create({
      data: {
        name: name.trim(),
        country: country?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        days: days ? parseInt(days) : null,
        calling: calling?.trim() || null,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Retreat submission received successfully!',
        data: retreat 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating retreat:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit retreat application',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const retreats = await prisma.retreat.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ retreats }, { status: 200 });
  } catch (error) {
    console.error('Error fetching retreats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch retreats' },
      { status: 500 }
    );
  }
}


