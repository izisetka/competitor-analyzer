import { NextRequest, NextResponse } from "next/server";
import { getReport } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) {
    return NextResponse.json({ error: "Отчёт не найден" }, { status: 404 });
  }

  return NextResponse.json(report);
}
