import { NextRequest, NextResponse } from "next/server"
import { createTaskService } from "@/services/task.service"
import { getAuthSession } from "@/repositories/session.repository"

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const task = await createTaskService({
      workspaceId: body.workspaceId,
      title: body.title,
      projectId: body.projectId,
      priority: body.priority,
      userId: session.userId,
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create task" },
      { status: 400 }
    )
  }
}
