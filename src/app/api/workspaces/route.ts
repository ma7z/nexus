import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { createWorkspace } from "@/services/workspace.service";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const payload = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const body = await request.json();

    const workspace = await createWorkspace({
      name: body.name,
      userId: payload.userId,
    });

    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create workspace" },
      { status: 400 }
    );
  }
}
