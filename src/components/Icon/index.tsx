/* 用于菜单的自定义图标 */
import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1368456_qdqyww0ge.js",
});

interface Props {
  type: string;
}

export default function Icon(props: Props): JSX.Element {
  return <IconFont type={props.type} />;
}
