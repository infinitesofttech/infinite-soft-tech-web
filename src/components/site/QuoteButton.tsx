"use client";

import type { ReactNode } from "react";

export const OPEN_QUOTE_EVENT = "ist:open-quote";

export function openQuote(service?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_QUOTE_EVENT, { detail: { service } }));
}

/** Any button that opens the "Get a Free Quote" popup. */
export function QuoteButton({
  children,
  className = "btn btn-primary",
  service,
}: {
  children: ReactNode;
  className?: string;
  service?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => openQuote(service)}>
      {children}
    </button>
  );
}
