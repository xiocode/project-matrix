import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
    namespace: 'shopfloor',
    code: 'ShopFloorAppStep',
    name: '车间配置系统-应用-步骤',
    fields: [
        {
            code: 'app',
            name: '应用',
            type: 'relation',
            targetSingularCode: "shop_floor_app",
            targetIdColumnName: "app_id",
            required: true,
        },
        {
            code: 'code',
            name: '编码',
            type: 'text',
        },
        {
            code: 'orderNum',
            name: '排序号',
            type: 'integer',
            required: true,
            defaultValue: '0',
        },
        {
            code: 'triggers',
            name: '触发器',
            type: 'json',
        },
        {
            code: 'schema',
            name: '结构',
            type: 'json',
        },
    ],
};

export default entity;
