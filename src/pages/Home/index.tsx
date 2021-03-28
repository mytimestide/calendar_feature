/* 主页 */

import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  renderEventContent,
  renderSidebarEvent,
} from "./components/renderEvent";
import { reportNetworkError } from "./components/utils";
import {
  calendarState,
  toggleWeekends,
  requestEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  storeState,
} from "@/store/fullCalendar.slice";
import { useDispatch, useSelector } from "react-redux";

export default function HomePageContainer(props: any): JSX.Element {
  const storeData = useSelector(storeState);
  console.log(storeData);
  const { weekendsVisible, events } = storeData;
  const dispatch: (
    ...args: unknown[]
  ) => Promise<calendarState> = useDispatch();
  //渲染侧边
  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={toggleWeekends}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({events?.length || 0})</h2>
          <ul>{(events || []).map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  // handlers for user actions
  // ------------------------------------------------------------------------------------------

  const handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    const title = prompt("Please enter a new title for your event");

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent(
        {
          // will render immediately. will call handleEventAdd
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        },
        true
      ); // temporary=true, will get overwritten when reducer gives new events
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove(); // will render immediately. will call handleEventRemove
    }
  };

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  const handleDates = (rangeInfo: any) => {
    dispatch(requestEvents(rangeInfo.startStr, rangeInfo.endStr)).catch(
      reportNetworkError
    );
  };

  const handleEventAdd = (addInfo: any) => {
    dispatch(createEvent(addInfo.event.toPlainObject())).catch(() => {
      reportNetworkError();
      addInfo.revert();
    });
  };

  const handleEventChange = (changeInfo: any) => {
    dispatch(updateEvent(changeInfo.event.toPlainObject())).catch(() => {
      reportNetworkError();
      changeInfo.revert();
    });
  };

  const handleEventRemove = (removeInfo: any) => {
    dispatch(deleteEvent(removeInfo.event.id)).catch(() => {
      reportNetworkError();
      removeInfo.revert();
    });
  };

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          datesSet={handleDates}
          select={handleDateSelect}
          events={events}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange} // called for drag-n-drop/resize
          eventRemove={handleEventRemove}
        />
      </div>
    </div>
  );
}
