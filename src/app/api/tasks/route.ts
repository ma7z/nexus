import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { createTaskService } from "@/services/task.service";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const payload = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const body = await request.json();

    const task = await createTaskService({
      title: body.title,
      projectId: body.projectId,
      workspaceId: body.workspaceId,
      userId: payload.userId,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create task" },
      { status: 400 }
    );
  }
}
