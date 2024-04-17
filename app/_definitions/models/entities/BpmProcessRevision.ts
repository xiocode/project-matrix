import type { TDictionaryCodes } from '../../meta/data-dictionary-codes';
import type { TEntitySingularCodes } from '../../meta/model-codes';
import type { RapidEntity } from '@ruiapp/rapid-extension';

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: 'app',
  code: 'BpmProcessRevision',
  name: '业务流程版本',
  fields: [
    {
      code: 'process',
      name: '业务流程',
      type: 'relation',
      required: true,
      targetSingularCode: 'bpm_process',
      targetIdColumnName: 'process_id',
    },
    {
      code: 'name',
      name: '名称',
      type: 'text',
      required: true,
    },
    {
      code: 'description',
      name: '描述',
      type: 'text',
      required: true,
    },
    {
      code: 'formConfig',
      name: '表单配置',
      type: 'json',
    },
    {
      code: 'flowConfig',
      name: '流程配置',
      type: 'json',
    },
    {
      code: 'advancedConfig',
      name: '高级设置',
      type: 'json',
    },
    {
      code: 'publishState',
      name: '状态',
      type: 'option',
      dataDictionary: 'PublishState',
      required: true,
    },
  ],
};

export default entity;
