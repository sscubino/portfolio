"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md border px-3 py-1.5 text-sm"
      suppressHydrationWarning
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
