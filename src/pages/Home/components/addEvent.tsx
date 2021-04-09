import React, { useEffect, useState } from "react";
import { Row, Modal, Select, Form, DatePicker, TimePicker } from "antd";
import moment from "moment";
import { calendarState, createEvent } from "@/store/fullCalendar.slice";
import { reportNetworkError } from "@/pages/Home/components/utils";
import { useDispatch } from "react-redux";
const FormItem = Form.Item;
const format = "HH:mm";

interface addEventProps {
  onCancel: () => void;
}

const addEvent = (props: addEventProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { onCancel } = props;
  const dispatch: (
    ...args: unknown[]
  ) => Promise<calendarState> = useDispatch();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
      md: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
      md: { span: 18 },
    },
  };

  // 下一步保存数据
  const saveData = () => {
    form.validateFields().then((values) => {
      console.log(values);
      const startDateText = `${values.startDate.format(
        "YYYY-MM-DD"
      )} ${values.startTime.format("HH:mm")}`;
      const endDateText = `${values.endDate.format(
        "YYYY-MM-DD"
      )} ${values.endTime.format("HH:mm")}`;
      const data: { end: string; start: string; title: string } = {
        end: moment(endDateText).format(),
        start: moment(startDateText).format(),
        title: "预约",
      };
      dispatch(createEvent(data))
        .then(() => onCancel())
        .catch(() => {
          reportNetworkError();
        });
    });
  };

  return (
    <Modal
      width={700}
      visible
      maskClosable={false}
      okText="保存"
      cancelText="取消"
      title="新增设备预约"
      onCancel={() => {
        form.resetFields();
        onCancel();
        setConfirmLoading(false);
      }}
      onOk={saveData}
      // title={title}
      destroyOnClose
      confirmLoading={confirmLoading}
    >
      <Form form={form}>
        <Form.Item label="预约开始时间" {...formItemLayout}>
          <Form.Item
            name="startDate"
            noStyle
            rules={[{ required: true, message: "请选择预约开始时间" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="startTime"
            noStyle
            rules={[{ required: true, message: "请选择预约开始时间" }]}
          >
            <TimePicker
              defaultValue={moment("00:00", format)}
              format={format}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label="预约结束时间" {...formItemLayout}>
          <Form.Item
            name="endDate"
            noStyle
            rules={[{ required: true, message: "请选择预约结束时间" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="endTime"
            noStyle
            rules={[{ required: true, message: "请选择预约结束时间" }]}
          >
            <TimePicker
              defaultValue={moment("00:00", format)}
              format={format}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default addEvent;
