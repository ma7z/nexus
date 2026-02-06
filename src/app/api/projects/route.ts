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
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to list projects" },
      { status: 401 }
    )
  }
}
export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthSession()

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
      userId: userId?.user?.id,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create project" },
      { status: 401 }
    )
  }
}

