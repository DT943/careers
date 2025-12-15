"use client";

import { useEffect } from "react";

type UseDisableDevtoolOptions = {
  enabled?: boolean;
};

export default function useDisableDevtool({
  enabled = true,
}: UseDisableDevtoolOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    let cleanupLib: (() => void) | null = null;
    let exited = false;

    const exitOnce = () => {
      if (exited) return;
      exited = true;
      try {
        window.location.replace("about:blank");
      } catch {
        window.location.href = "about:blank";
      }
    };

    // 1) Library hook: fires when DevTools actually opens
    (async () => {
      try {
        const { default: disableDevtool } = await import("disable-devtool");
        // Library does not ship types; treat as any
        (disableDevtool as any)({
          disableMenu: true,
          disableSelect: true,
          disableCopy: true,
          ondevtoolopen: exitOnce,
        });
        cleanupLib = () => {
          try {
            (disableDevtool as any)(false);
          } catch {
            /* ignore cleanup errors */
          }
        };
      } catch {
        // library unavailable — rely on manual guards below
      }
    })();

    // 2) Keyboard shortcuts commonly used to open DevTools / source
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || "").toLowerCase();
      const meta = e.ctrlKey || e.metaKey;
      const blocked =
        e.keyCode === 123 || // F12
        (meta && e.shiftKey && ["i", "j", "c"].includes(k)) || // DevTools/Console/Inspect
        (meta && k === "u"); // View source
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        exitOnce();
      }
    };

    // 3) Optional: block context menu (does NOT exit)
    const onCtx = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("keydown", onKey, { capture: true });
    document.addEventListener("contextmenu", onCtx, {
      capture: true,
      passive: false,
    });

    return () => {
      document.removeEventListener("keydown", onKey, { capture: true });
      document.removeEventListener("contextmenu", onCtx, { capture: true });
      if (cleanupLib) cleanupLib();
    };
  }, [enabled]);
}

