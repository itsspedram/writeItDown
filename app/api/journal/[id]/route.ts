import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const entry = await prisma.journalEntry.findUnique({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!entry) {
      return new NextResponse('Not found', { status: 404 })
    }

    return NextResponse.json(entry)
  } catch (error) {
    console.error('[JOURNAL_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { title, content, mood, imageUrl } = body

    if (!title || !content) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const entry = await prisma.journalEntry.update({
      where: {
        id: params.id,
        userId,
      },
      data: {
        title,
        content,
        mood,
        imageUrl,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('[JOURNAL_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await prisma.journalEntry.delete({
      where: {
        id: params.id,
        userId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[JOURNAL_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 