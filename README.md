## 预约日期组件说明

使用 FullCalendar 组件，本次 demo 使用 react17+redux-toolkit 进行状态管理，迁移 saas 需改为 dva 写法

使用说明:

### 1. 安装依赖

> npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction

### 2. 核心代码结构

具体代码见/src/pages/Home

```
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
```

### 3. API 介绍

| 属性          |                                   说明 |                                            类型                                            |
| :------------ | -------------------------------------: | :----------------------------------------------------------------------------------------: |
| headerToolbar |                     设置组件顶部工作栏 | { left: "prev,next today",center: "title",right: "dayGridMonth,timeGridWeek,timeGridDay" } |
| businessHours |       设置工作时间，非工作时间格子置灰 |         { daysOfWeek: [0, 1, 2, 3, 4, 5, 6],startTime: "10:00",endTime: "18:00" }          |
| locale        |                                   语言 |                                           string                                           |
| editable      |                         格子是否可编辑 |                                          boolean                                           |
| selectable    |                         格子是否可选择 |                                          boolean                                           |
| selectMirror  | 拖动时绘制一个“占位符”事件，默认 false |                                          boolean                                           |
| dayMaxEvents  |               事件数量是否影响格子高度 |                                          boolean                                           |
| events        |                             事件数据源 |                                           array                                            |
| eventContent  |                           渲染事件样式 |                                         ReactNode                                          |
| eventAdd      |                         事件添加后回调 |                                      (event) => void                                       |
| eventChange   |                         事件改变后回调 |                                      (event) => void                                       |
| eventRemove   |                         事件移除后回调 |                                      (event) => void                                       |

更多 API 可参考 [文档](https://fullcalendar.io/docs#toc)

---
