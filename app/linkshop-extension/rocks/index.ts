import LinkshopApp from './linkshop-app/LinkshopApp';
import LinkshopAppStep from './linkshop-app-step/LinkshopAppStep';
import LinkshopBuilderAssetsPanel from './linkshop-builder-assets-panel/LinkshopBuilderAssetsPanel';
import LinkshopBuilderComponentsPanel from './linkshop-builder-components-panel/LinkshopBuilderComponentsPanel';
import LinkshopBuilderStepsPanel from './linkshop-builder-steps-panel/LinkshopBuilderStepsPanel';
import LinkshopBuilderStoresPanel from './linkshop-builder-stores-panel/LinkshopBuilderStoresPanel';
import LinkshopBuilderTriggersPanel from './linkshop-builder-triggers-panel/LinkshopBuilderTriggersPanel';
import LinkshopBuilderToolbar from './linkshop-builder-toolbar/LinkshopBuilderToolbar';

// setters
import DynamicArraySetterInput from './prop-controls/DynamicArraySetterInput';
import DynamicArrayPropSetter from './prop-setters/DynamicArrayPropSetter';
import StoreEntitySetterSelect from './prop-controls/StoreEntitySetterSelect';
import StoreEntityPropSetter from './prop-setters/StoreEntityPropSetter';
import EntitySetterSelect from './prop-controls/EntitySetterSelect';
import EntityPropSetter from './prop-setters/EntityPropSetter';
import JsonPropsSetter from './prop-setters/JsonPropsSetter';

export default [
  LinkshopApp,
  LinkshopAppStep,
  LinkshopBuilderAssetsPanel,
  LinkshopBuilderComponentsPanel,
  LinkshopBuilderStepsPanel,
  LinkshopBuilderStoresPanel,
  LinkshopBuilderTriggersPanel,
  LinkshopBuilderToolbar,

  // setters
  DynamicArraySetterInput,
  DynamicArrayPropSetter,
  StoreEntitySetterSelect,
  StoreEntityPropSetter,
  EntitySetterSelect,
  EntityPropSetter,
  JsonPropsSetter,
];
