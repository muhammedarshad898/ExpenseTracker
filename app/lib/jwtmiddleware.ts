import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JwtMiddlewareResult =
  | { valid: true; payload: { userid: string } }
  | { valid: false; response: NextResponse };

export async function jwtmiddleware(req: Request): Promise<JwtMiddlewareResult> {
  try {
    const authheader = req.headers.get("authorization");
    if (!authheader) {
      return {
        valid: false,
        response: NextResponse.json({
          success: false,
          status: 401,
          message: "Unauthorized"
        }),
      };
    }

    const token = authheader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userid: string;
    };

    return {
      valid: true,
      payload: decoded,
    };
  } catch (error) {
    return {
      valid: false,
      response: NextResponse.json({
        success: false,
        status: 401,
        message: "Invalid token",
      }),
    };
  }
}
