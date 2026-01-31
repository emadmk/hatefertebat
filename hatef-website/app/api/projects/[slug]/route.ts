import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project || project.status !== 'PUBLISHED') {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Get related projects
    const relatedProjects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
        id: { not: project.id },
      },
      select: { id: true, title: true, slug: true, image: true, client: true },
      orderBy: { completedAt: 'desc' },
      take: 3,
    })

    return NextResponse.json({
      success: true,
      data: { project, relatedProjects },
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
