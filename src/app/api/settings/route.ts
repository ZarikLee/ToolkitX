import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_SETTINGS = {
  theme: "light",
  monitorInterval: 5000,
  terminalFontSize: 14,
  terminalFontFamily: 'Menlo, Monaco, "Courier New", monospace',
};

export async function GET() {
  let settings = await prisma.userSettings.findUnique({
    where: { userId: "default" },
  });

  if (!settings) {
    settings = await prisma.userSettings.create({
      data: {
        userId: "default",
        ...DEFAULT_SETTINGS,
      },
    });
  }

  return NextResponse.json({
    theme: settings.theme,
    monitorRefreshInterval: settings.monitorInterval,
    terminalFontSize: settings.terminalFontSize,
    terminalFontFamily: settings.terminalFontFamily,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { theme, monitorRefreshInterval, terminalFontSize, terminalFontFamily } = body;

  const settings = await prisma.userSettings.upsert({
    where: { userId: "default" },
    update: {
      ...(theme !== undefined && { theme }),
      ...(monitorRefreshInterval !== undefined && { monitorInterval: monitorRefreshInterval }),
      ...(terminalFontSize !== undefined && { terminalFontSize }),
      ...(terminalFontFamily !== undefined && { terminalFontFamily }),
    },
    create: {
      userId: "default",
      theme: theme || DEFAULT_SETTINGS.theme,
      monitorInterval: monitorRefreshInterval || DEFAULT_SETTINGS.monitorInterval,
      terminalFontSize: terminalFontSize || DEFAULT_SETTINGS.terminalFontSize,
      terminalFontFamily: terminalFontFamily || DEFAULT_SETTINGS.terminalFontFamily,
    },
  });

  return NextResponse.json({
    theme: settings.theme,
    monitorRefreshInterval: settings.monitorInterval,
    terminalFontSize: settings.terminalFontSize,
    terminalFontFamily: settings.terminalFontFamily,
  });
}
