import type { LoaderFunction } from "@remix-run/node";

import antdStyles from "antd/dist/antd.css";
import rapidService from "~/rapidService";

import entities from "~/_definitions/meta/entity-models";

import indexStyles from "~/styles/index.css";
import customizeStyles from "~/styles/customize.css";

export function links() {
  return [antdStyles, indexStyles, customizeStyles].map((styles) => {
    return { rel: "stylesheet", href: styles };
  });
}

export const loader: LoaderFunction = async () => {
  const findAppNavItemOption = {
    properties: ["id", "code", "name", "icon", "pageCode", "parent"],
    filters: [
      {
        field: "state",
        operator: "eq",
        value: "enabled",
      },
    ],
    orderBy: [
      {
        field: "order_num",
      },
    ],
  };
  const navItems = (await rapidService.post("app/app_nav_items/operations/find", findAppNavItemOption)).data.list;
  return {
    navItems,
  };
};

export default function Index() {
  return (
    <>
      <h2>数据表清单</h2>
      <table border={1}>
        <thead>
          <tr>
            <td>名称</td>
            <td>说明</td>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => {
            return (
              <tr key={entity.code}>
                <td>{entity.tableName}</td>
                <td>{entity.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>数据表详情</h2>
      {entities.map((entity) => {
        return (
          <>
            <h3>
              {entity.name}（{entity.tableName}）
            </h3>
            <table border={1} width="100%">
              <thead>
                <tr>
                  <td>列名</td>
                  <td>类型</td>
                  <td>默认值</td>
                  <td>Nullable</td>
                  <td>说明</td>
                </tr>
              </thead>
              <tbody>
                {entity.fields.map((field) => {
                  if (field.type === "relation[]") {
                    return null;
                  }

                  if (field.type === "relation") {
                    return (
                      <tr key={field.code}>
                        <td>{field.targetIdColumnName}</td>
                        <td>{field.type}</td>
                        <td>{field.defaultValue}</td>
                        <td>{field.required ? "否" : "是"}</td>
                        <td>{field.name}</td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={field.code}>
                      <td>{field.columnName || field.code}</td>
                      <td>{field.type}</td>
                      <td>{field.defaultValue}</td>
                      <td>{field.required ? "否" : "是"}</td>
                      <td>{field.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      })}
    </>
  );
}
