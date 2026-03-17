import { CompetitorReport } from "./types";

const reports = new Map<string, CompetitorReport>();

export function saveReport(report: CompetitorReport): void {
  reports.set(report.id, report);
}

export function getReport(id: string): CompetitorReport | undefined {
  return reports.get(id);
}
