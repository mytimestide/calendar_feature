/** 根路由 **/

// ==================
// 第三方库
// ==================
import React, { useEffect, useCallback } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import { createBrowserHistory as createHistory } from "history"; // URL模式的history
import { createBrowserHistory as createHistory } from "history"; // 锚点模式的history
import { message } from "antd";

// ==================
// 组件
// ==================
import BasicLayout from "@/layouts/BasicLayout";
import UserLayout from "@/layouts/UserLayout";

// 全局提示只显示2秒
message.config({
  duration: 2,
});

const history = createHistory();

// ==================
// 本组件
// ==================
function RouterCom(props: any): JSX.Element {
  useEffect(() => {
    const userinfo = sessionStorage.getItem("userinfo");
    // /**
    //  * sessionStorage中有user信息，但store中没有
    //  * 说明刷新了页面，需要重新同步user数据到store
    //  * **/
    // if (userinfo && !props.userinfo.userBasicInfo) {
    //   props.setUserInfo(JSON.parse(tools.uncompile(userinfo)));
    // }
  }, [props]);

  /** 跳转到某个路由之前触发 **/
  const onEnter = useCallback((Component, props) => {
    return <Component {...props} />;
  }, []);

  return (
    <Router history={history}>
      <Route
        render={(): JSX.Element => {
          return (
            <Switch>
              <Route path="/user" component={UserLayout} />
              <Route
                path="/"
                render={(props): JSX.Element => onEnter(BasicLayout, props)}
              />
            </Switch>
          );
        }}
      />
    </Router>
  );
}

export default RouterCom;
