"use client";

import { useEffect } from "react";
import { migrateLocalStorageToDB } from "@/lib/migrate";

export function MigrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    migrateLocalStorageToDB();
  }, []);

  return <>{children}</>;
}
