import { NextRequest, NextResponse } from "next/server"
import {
  createProjectService,
  listProjectsService,
} from "@/services/project.service"
import { getAuthSession } from "@/repositories/session.repository"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const workspaceId = searchParams.get("workspaceId")

    if (!workspaceId) {
      return NextResponse.json(
        { error: "Missing workspaceId" },
        { status: 400 }
      )
    }

    const session = await getAuthSession()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const projects = await listProjectsService(userId, workspaceId)
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json(
      { error: "Unable to list projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { name, workspaceId } = await request.json()

    if (!name || !workspaceId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const project = await createProjectService({
      name,
      workspaceId,
      userId,
    })

    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Unable to create project" },
      { status: 500 }
    )
  }
}
