import connectMongoDB from "@/lib/mongodb";
import Organization from "@/models/Organization";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      name,
      domain,
      addrLine1,
      addrLine2,
      city,
      state,
      zip,
      phone,
      email,
      password,
    } = await request.json();

    await connectMongoDB();

    await Organization.create({
      name,
      domain,
      addrLine1,
      addrLine2,
      city,
      state,
      zip,
      phone,
      email,
      password,
    });
    return NextResponse.json({ status: 200, body: "Organization created" });
  } catch (error) {
    return NextResponse.json({ status: 500, body: "Server error", error });
  }
}

export async function GET(request) {
  try {
    await connectMongoDB();
    const organizations = await Organization.find().sort({ name: 1 });
    return NextResponse.json({
      status: 200,
      body: "Organizations retrieved",
      organizations,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, body: "Server error", error });
  }
}
