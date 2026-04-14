"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { getSession } from "@/lib/auth-client";

interface ImportResult {
  totalRows: number;
  imported: number;
  failed: number;
  errors: string[];
}

interface DealsCsvImportProps {
  onImportComplete?: () => void;
}

type CsvDealRow = {
  company: string;
  state: string;
  stages: string;
  amount: string;
  created: string;
};

const STATE_CODE_TO_NAME: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const HEADER_ALIASES: Record<keyof CsvDealRow, string[]> = {
  company: ["company", "name", "deal name", "account", "organization"],
  state: ["state", "region", "us state"],
  stages: ["stages", "stage", "deal stage", "pipeline stage"],
  amount: ["amount", "deal amount", "value", "deal value"],
  created: ["created", "created at", "date", "created date"],
};

function normalizeHeader(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let currentField = "";
  let currentRow: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
      continue;
    }

    currentField += char;
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function mapHeaders(headers: string[]): Record<keyof CsvDealRow, number> {
  const normalizedHeaders = headers.map((header) => normalizeHeader(header));

  const findIndex = (aliases: string[]) =>
    normalizedHeaders.findIndex((header) => aliases.includes(header));

  return {
    company: findIndex(HEADER_ALIASES.company),
    state: findIndex(HEADER_ALIASES.state),
    stages: findIndex(HEADER_ALIASES.stages),
    amount: findIndex(HEADER_ALIASES.amount),
    created: findIndex(HEADER_ALIASES.created),
  };
}

function parseAmount(value: string): string {
  if (!value) return "";
  const cleaned = value.replace(/[^0-9.-]/g, "");
  return cleaned || "";
}

function normalizeStateValue(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const upper = trimmed.toUpperCase();
  if (STATE_CODE_TO_NAME[upper]) {
    return STATE_CODE_TO_NAME[upper];
  }
  return trimmed;
}

function extractReadableErrorMessage(rawErrorText: string): string {
  if (!rawErrorText) {
    return "Failed to import this row.";
  }

  try {
    const parsed = JSON.parse(rawErrorText);
    const serverMessage = parsed?.error?.message;
    const firstFieldError = parsed?.error?.details?.errors?.[0];

    if (firstFieldError?.path?.[0] === "State") {
      return "Invalid state value. Use full state name (or 2-letter code like CA/TX).";
    }

    if (typeof firstFieldError?.message === "string" && firstFieldError.message.trim()) {
      return firstFieldError.message;
    }

    if (typeof serverMessage === "string" && serverMessage.trim()) {
      return serverMessage;
    }
  } catch {
    // Fall through to generic cleanup below.
  }

  return rawErrorText.length > 160 ? `${rawErrorText.slice(0, 160)}...` : rawErrorText;
}

export function DealsCsvImport({ onImportComplete }: DealsCsvImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progressText, setProgressText] = useState<string>("");
  const [result, setResult] = useState<ImportResult | null>(null);

  const session = getSession();
  const canImportDeals = session?.isInternal === true;

  if (!canImportDeals) {
    return null;
  }

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadTemplate = () => {
    const templateRows = [
      ["company", "state", "stages", "amount", "created"],
      ["Acme Credit Union", "CA", "Qualified to Buy", "250000", "2026-04-01"],
      ["Northstar Financial", "TX", "Demo Completed", "180000", "2026-04-03"],
    ];

    const csvContent = templateRows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "deals-import-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setResult(null);
    setProgressText("Reading CSV...");
    setIsImporting(true);

    try {
      const csvText = await file.text();
      const rows = parseCsv(csvText);

      if (rows.length < 2) {
        throw new Error("CSV must include a header row and at least one data row.");
      }

      const [headerRow, ...dataRows] = rows;
      const mapped = mapHeaders(headerRow);

      if (mapped.state === -1 || mapped.stages === -1) {
        throw new Error("CSV must include at least 'state' and 'stages' columns.");
      }

      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

      let imported = 0;
      let failed = 0;
      const errors: string[] = [];

      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        const rowNumber = i + 2;

        const company = mapped.company >= 0 ? row[mapped.company] || "" : "";
        const state = mapped.state >= 0 ? normalizeStateValue(row[mapped.state] || "") : "";
        const stages = mapped.stages >= 0 ? row[mapped.stages] || "" : "";
        const amount = mapped.amount >= 0 ? parseAmount(row[mapped.amount] || "") : "";
        const created = mapped.created >= 0 ? row[mapped.created] || "" : "";

        if (!state || !stages) {
          failed++;
          errors.push(`Row ${rowNumber}: Missing required state or stages value.`);
          continue;
        }

        const payload = {
          Company: company || `Deal ${rowNumber - 1}`,
          State: state,
          Stages: stages,
          Amount: amount,
          Created: created || new Date().toISOString(),
        };

        setProgressText(`Importing row ${i + 1} of ${dataRows.length}...`);

        try {
          const response = await fetch(`${strapiUrl}/api/deals`, {
            method: "POST",
            headers: {
              Authorization: strapiToken ? `Bearer ${strapiToken}` : "",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: payload }),
          });

          if (!response.ok) {
            const responseText = await response.text();
            throw new Error(extractReadableErrorMessage(responseText || `HTTP ${response.status}`));
          }

          imported++;
        } catch (error) {
          failed++;
          errors.push(`Row ${rowNumber}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }

      setResult({
        totalRows: dataRows.length,
        imported,
        failed,
        errors: errors.slice(0, 8),
      });

      if (imported > 0) {
        onImportComplete?.();
      }
    } catch (error) {
      setResult({
        totalRows: 0,
        imported: 0,
        failed: 1,
        errors: [error instanceof Error ? error.message : "Failed to import CSV."],
      });
    } finally {
      setProgressText("");
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">Import Deals from CSV</p>
          <p className="text-xs text-gray-600">
            Expected headers: company, state, stages, amount, created
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            disabled={isImporting}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Download Template
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handlePickFile}
            disabled={isImporting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {isImporting ? "Importing..." : "Upload CSV"}
          </button>
        </div>
      </div>

      {progressText && (
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-gray-700">
          <FileSpreadsheet className="h-4 w-4" />
          <span>{progressText}</span>
        </div>
      )}

      {result && (
        <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-gray-700">
              <FileSpreadsheet className="h-4 w-4" />
              {result.totalRows} rows processed
            </span>
            <span className="inline-flex items-center gap-1 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              {result.imported} imported
            </span>
            <span className="inline-flex items-center gap-1 text-red-700">
              <AlertCircle className="h-4 w-4" />
              {result.failed} failed
            </span>
          </div>
          {result.errors.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-red-700">
              {result.errors.map((error, idx) => (
                <li key={`${error}-${idx}`}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

