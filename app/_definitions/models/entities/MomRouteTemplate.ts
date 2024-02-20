import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'mom',
  code: 'MomRouteTemplate',
  name: '工艺流程模板',
  fields: [
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
    },
    {
      code: 'processes',
      name: '工序',
      type: 'relation[]',
      targetSingularCode: 'mom_route_template_process',
      selfIdColumnName: 'route_template_id',
    },
  ],
};

export default entity;
