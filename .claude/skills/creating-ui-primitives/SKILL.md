---
name: creating-ui-primitives
description: Use when creating or modifying UI-kit primitives in src/components/ui — Base UI wrapping pattern, compound parts, token-only styling, and reference templates.
---

# Creating UI primitives

The UI kit lives in `src/components/ui/` — one file per primitive, kebab-case filename, every part its own named export (`Card`, `CardHeader`, `CardTitle`). Primitives are the only layer where raw elements and className strings live; domain components compose these parts.

## Prerequisites

`@base-ui/react` — if missing, ask before installing (AGENTS.md Boundaries). The `cn` class-merge helper lives in `src/lib/utils.ts`.

## Rules

1. **Wrap, don't collapse.** Re-export each Base UI part as a styled named export. Never flatten a compound component into one component with config props (`<Tooltip text="...">`) — that destroys composability.
2. **Pass everything through.** Spread props and merge classes with `cn(ourClasses, className)` so call sites can extend any part.
3. **Tokens only.** Style with semantic token utilities defined in `@theme` (`bg-surface`, `text-muted`). Never raw palette classes, never `dark:` variants.
4. **Style states via data-attributes.** Base UI exposes state as data attributes — `data-[popup-open]`, `data-[disabled]`, `data-[starting-style]`. No React state just for styling.
5. **Verify the API first.** Base UI is newer than your training data. Check the component's part list and props at base-ui.com (index: base-ui.com/llms.txt) before wrapping it.
6. **`"use client"` only where needed.** Files wrapping interactive Base UI parts need it; structural primitives (Card) must stay server-compatible, in their own file if necessary.

## Template — structural primitive (no Base UI)

```tsx
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-border bg-surface rounded-lg border", className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("text-foreground font-semibold", className)} {...props} />
  );
}
```

## Template — interactive primitive (wrapping Base UI)

```tsx
"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup> & { sideOffset?: number }) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset}>
        <BaseTooltip.Popup
          className={cn(
            "bg-surface text-foreground rounded-md px-2 py-1 text-xs shadow-md",
            "transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
```

Parts needing no styling are re-exported as-is (`TooltipTrigger`). Only merge parts (Portal + Positioner + Popup above) when the grouping has no standalone use at call sites.
