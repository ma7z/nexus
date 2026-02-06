import { NextRequest, NextResponse } from "next/server"
import { deleteTaskService, updateTaskService } from "@/services/task.service"
import { getAuthSession } from "@/repositories/session.repository"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    const task = await updateTaskService({
      taskId: id,
      title: body.title,
      completed: body.completed,
      userId: body.userId,
      status: body.status,
    })

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update task" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getAuthSession()

    await deleteTaskService({
      taskId: id,
      userId: session?.user?.id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete task" },
      { status: 403 }
    )
  }
}
