import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { title, content, mood } = body

    if (!title || !content) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // First, ensure the user exists in our database
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: '', // We'll update this later if needed
      },
    })

    const entry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        mood,
        userId: user.id,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('[JOURNAL_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Ensure the user exists in our database
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: '', // We'll update this later if needed
      },
    })

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('[JOURNAL_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 