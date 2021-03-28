import React from "react";
import Loadable from "react-loadable";
import Loading from "@/components/Loading";
import { Menu } from "@/models/index.type";
export interface IFMenu extends Menu {
  children?: IFMenu[];
  component?: any;
}

const loadPage = (loader: any) => {
  return Loadable({
    loader: loader,
    loading: Loading,
  });
};

/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 */
export function flattenRouteFunc(routeList: IFMenu[]): IFMenu[] {
  const result: IFMenu[] = [];
  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];
    const { children, component, ...restProps } = route;

    result.push({
      ...restProps,
    });
    if (route.children) {
      result.push(...flattenRouteFunc(route.children));
    }
  }

  return result;
}

const menus: {
  menus: IFMenu[];
  others: IFMenu[] | [];
  [index: string]: any;
} = {
  menus: [
    // 菜单相关路由
    {
      id: 1,
      url: "/dashboard", // 链接路径
      title: "首页", // 标题
      icon: "icon-home", //iconfont图标
      sorts: 1, // 排序编号
      parent: null,
      component: loadPage(() => import("@/pages/Home")),
    },
  ],
  others: [], // 非菜单相关路由
};

export const flattenRoute = flattenRouteFunc(menus.menus);

export default menus;
