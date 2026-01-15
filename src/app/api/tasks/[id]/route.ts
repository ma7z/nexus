import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { deleteTaskService, updateTaskService } from "@/services/task.service";
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get("authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const payload = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const body = await request.json();

    const task = await updateTaskService({
      taskId: params.id,
      title: body.title,
      completed: body.completed,
      userId: payload.userId,
    });

    return NextResponse.json(task);
  } catch {
    return NextResponse.json(
      { error: "Unable to update task" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get("authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const payload = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    await deleteTaskService({
      taskId: params.id,
      userId: payload.userId,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to delete task" },
      { status: 403 }
    );
  }
}
