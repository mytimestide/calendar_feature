/** 基础页面结构 - 有头部、底部、侧边导航 **/

// ==================
// 第三方库
// ==================
import React, { useState, useCallback, useEffect } from "react";
import { Layout, message } from "antd";
import Routes from "@/routes";
import { flattenRoute } from "@/routes/config";

// ==================
// 自定义的东西
// ==================
import tools from "@/utils/tools";
import "./BasicLayout.less";

// ==================
// 组件
// ==================
import Header from "@/components/Header";
import MenuCom from "@/components/Menu";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

import Bread from "@/components/Bread";
//import BreadTab from "@/components/BreadTab"; // Tab方式的导航
import { useAppDispatch } from "@/store";
import { fetchUserInfo } from "@/store/auth.slice";
const { Content } = Layout;

// ==================
// 类型声明
// ==================
import { Menu } from "@/models/index.type";
import { History } from "history";

type Props = {
  history: History;
  location: Location;
};

// ==================
// 本组件
// ==================
function BasicLayoutCom(props: any): JSX.Element {
  const [collapsed, setCollapsed] = useState(false); // 菜单栏是否收起
  const [auth] = useState({ auth: { permissions: null } }); // 当前用户权限
  const dispatch = useAppDispatch();

  // 退出登录
  const onLogout = useCallback(() => {
    // props.onLogout().then(() => {
    //   message.success("退出成功");
    //   props.history.push("/user/login");
    // });
  }, [props]);

  /**
   * 工具 - 判断当前用户是否有该路由权限，如果没有就跳转至401页
   * @param pathname 路由路径
   * **/
  const checkRouterPower = useCallback(
    (pathname: string) => {
      let menus: Menu[] = [];
      if (flattenRoute && flattenRoute.length) {
        menus = flattenRoute;
      } else if (sessionStorage.getItem("userinfo")) {
        menus = JSON.parse(
          tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
        ).menus;
      }
      const m: string[] = menus.map((item) => item.url); // 当前用户拥有的所有菜单

      if (m.includes(pathname)) {
        return true;
      }
      return false;
    },
    [props.userinfo]
  );

  // // 切换路由时触发
  // const onEnter = useCallback(
  //   (Component, props) => {
  //     /**
  //      * 检查当前用户是否有该路由页面的权限
  //      * 没有则跳转至401页
  //      * **/
  //     if (checkRouterPower(props.location.pathname)) {
  //       return <Component {...props} />;
  //     }
  //     return <Redirect to="/nopower" />;
  //   },
  //   [checkRouterPower]
  // );

  useEffect(() => {
    dispatch(fetchUserInfo());
    console.log(3333);
  }, []);

  return (
    <Layout className="page-basic" hasSider>
      <MenuCom
        data={flattenRoute}
        collapsed={collapsed}
        location={props.location}
        history={props.history}
      />

      <Layout>
        <Header
          collapsed={collapsed}
          userinfo={{
            menus: [],
            roles: [],
            powers: [],
            userBasicInfo: null,
          }}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={onLogout}
        />
        {/* 普通面包屑导航 */}
        <Bread menus={flattenRoute} location={props.location} />
        {/* Tab方式的导航 */}
        {/* <BreadTab
          menus={props.userinfo.menus}
          location={props.location}
          history={props.history}
        /> */}
        <Content className="content">
          <ErrorBoundary location={props.location}>
            <Routes auth={auth} />
          </ErrorBoundary>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default BasicLayoutCom;
