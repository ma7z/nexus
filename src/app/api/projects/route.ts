import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { listProjectsService } from "@/services/project.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get("workspaceId")!;

    const authHeader = request.headers.get("authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const payload = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const projects = await listProjectsService(payload.userId, workspaceId);

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Unable to list projects" },
      { status: 400 }
    );
  }
}
