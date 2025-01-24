"use server";

import { NextResponse } from "next/server";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const JSON_FILE_NAME = "subdomain.json";

const tempDir = os.tmpdir();
console.log("🚀 ~ tempDir:", tempDir);

export const GET = async () => {
  const jsonData = await getSubdomainJson();
  console.log("🚀 ~ GET ~ jsonData:", jsonData);
  return NextResponse.json({ code: 200, data: jsonData });
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    setSubDomainJson(data);
    return NextResponse.json({ code: 200 });
  } catch (error) {
    return NextResponse.json({ code: 200, error });
  }
};

function setSubDomainJson(data) {
  const filePath = path.join(tempDir, JSON_FILE_NAME);
  const dataDir = path.dirname(filePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function getSubdomainJson() {
  const tempFilePath = path.join(tempDir, JSON_FILE_NAME);
  const fileContent = fs.readFileSync(tempFilePath, "utf-8");
  return fileContent;
}
