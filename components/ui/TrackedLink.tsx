"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { EventPayload, trackEvent, TrackingEvent } from "@/lib/tracking";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: TrackingEvent;
  eventPayload?: EventPayload;
  secondaryEvent?: TrackingEvent;
};

export default function TrackedLink({
  children,
  eventName,
  eventPayload,
  secondaryEvent,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        if (secondaryEvent) trackEvent(secondaryEvent, eventPayload);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
