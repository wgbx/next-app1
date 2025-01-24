"use server";

import { NextResponse } from "next/server";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const GET = async () => {
  return NextResponse.json({ code: 200 });
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    return NextResponse.json({ code: 200 });
  } catch (error) {
    return NextResponse.json({ code: 200, error });
  }
};
