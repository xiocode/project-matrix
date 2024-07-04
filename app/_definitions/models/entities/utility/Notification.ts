import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "Notification",
  name: "通知",
  fields: [
    {
      code: "title",
      name: "标题",
      type: "text",
      required: true,
    },
    {
      code: "content",
      name: "内容",
      type: "text",
    },
    {
      code: "read",
      name: "已读",
      type: "boolean",
      defaultValue: "false",
    },
    {
      code: "details",
      name: "详细信息",
      description: '{"url": "", "actions": [{"text": "", "url": ""}]}',
      type: "json",
    },
    {
      code: "user",
      name: "用户",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "user_id",
    },
  ],
};

export default entity;
