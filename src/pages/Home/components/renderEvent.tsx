import { formatDate } from "@fullcalendar/react";
import React from "react";

interface plainEventObjectProps {
  id: number;
  start: string;
  title: string;
}

export function renderSidebarEvent(
  plainEventObject: plainEventObjectProps
): JSX.Element {
  return (
    <li key={plainEventObject.id}>
      <b>
        {formatDate(plainEventObject.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{plainEventObject.title}</i>
    </li>
  );
}

export function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <br />
      <br />
      <i>{eventInfo.event.title}</i>
    </>
  );
}
