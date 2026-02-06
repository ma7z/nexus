import { NextRequest, NextResponse } from "next/server"
import { deleteTaskService, updateTaskService } from "@/services/task.service"
import { getAuthSession } from "@/repositories/session.repository"

type Context = {
  params: {
    id: string
  }
}

export async function PUT(
  request: NextRequest,
  context: Context
) {
  try {
    const body = await request.json()

    const task = await updateTaskService({
      taskId: context.params.id,
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
  context: Context
) {
  try {
    const session = await getAuthSession()

    await deleteTaskService({
      taskId: context.params.id,
      userId: session.userId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete task" },
      { status: 403 }
    )
  }
}
