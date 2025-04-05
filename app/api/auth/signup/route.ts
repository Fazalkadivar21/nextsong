import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/dbConnect";
import { User } from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing username or email or password" },
        { status: 400 }
      );
    }
    
    const user = await User.create({ username, email , password });
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}