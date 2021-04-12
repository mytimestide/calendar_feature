/* 主页 */

import React, { useRef, useState } from "react";
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
  requestEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteEventByIndex,
  storeState,
} from "@/store/fullCalendar.slice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message, Button, Table } from "antd";
const { confirm } = Modal;
import "./index.less";
import dayjs from "dayjs";
import AddEvent from "./components/addEvent";

export default function HomePageContainer(props: any): JSX.Element {
  const storeData = useSelector(storeState);
  const { weekendsVisible, events } = storeData;
  const [addVisible, setAddVisible] = useState(false);
  const dispatch: (
    ...args: unknown[]
  ) => Promise<calendarState> = useDispatch();
  //渲染侧边
  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <ul>{(events || []).map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  // handlers for user actions
  // ------------------------------------------------------------------------------------------

  const handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    if (selectInfo.start.getDate() != selectInfo.end.getDate()) {
      message.warning("中间有不可预约时间段，请重新选择");
      calendarApi.unselect();
      return;
    }
    if (selectInfo.start.getHours() < 9 || selectInfo.end.getHours() > 20) {
      message.warning("9点-20点为不可预约时间段，请重新选择");
      calendarApi.unselect();
      return;
    }
    // const title = prompt("Please enter a new title for your event");
    confirm({
      title: "确认预约",
      icon: null,
      content: `是否预约${dayjs(selectInfo.startStr).format(
        "YYYY-MM-DD HH:mm"
      )}~${dayjs(selectInfo.endStr).format("YYYY-MM-DD HH:mm")}时间段`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        calendarApi.unselect();
        calendarApi.addEvent(
          {
            // will render immediately. will call handleEventAdd
            title: "预约",
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          },
          true
        );
      },
      onCancel() {
        calendarApi.unselect();
      },
    });
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

  //处理表格中删除
  const handleTableEventRemove = (index: any) => {
    dispatch(deleteEventByIndex(index)).catch(() => {
      reportNetworkError();
    });
  };

  //表格渲染列
  const columns = [
    {
      title: "开始时间",
      dataIndex: "start",
      key: "start",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "结束时间",
      dataIndex: "end",
      key: "end",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text: string, row: any, index: number) => (
        <Button
          size="small"
          type="primary"
          danger
          onClick={() => handleTableEventRemove(index)}
        >
          删除
        </Button>
      ),
    },
  ];
  console.log(events);
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
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // 每周工作日
            startTime: "10:00", // 每日开始时间
            endTime: "18:00", // 每日结束时间
          }}
          initialView="dayGridMonth"
          locale={"zh"}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          datesSet={handleDates}
          select={handleDateSelect}
          events={events}
          eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange} // called for drag-n-drop/resize
          eventRemove={handleEventRemove}
        />
      </div>
      <div className="rowBtn">
        <span>预约记录</span>
        <Button
          type="primary"
          className="leaseBtn"
          onClick={() => setAddVisible(true)}
        >
          添加预约
        </Button>
      </div>
      <Table dataSource={events} columns={columns} rowKey="id" />
      {addVisible && <AddEvent onCancel={() => setAddVisible(false)} />}
    </div>
  );
}
