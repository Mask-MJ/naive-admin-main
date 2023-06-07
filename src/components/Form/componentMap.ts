import type { Component } from 'vue';
import type { ComponentType } from './component';

import {
  NInput,
  NSelect,
  NCheckbox,
  NCheckboxGroup,
  NCascader,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NTimePicker,
  NTreeSelect,
  NTree,
  NSlider,
  NRate,
  NDivider,
} from 'naive-ui';
import ApiTree from './components/ApiTree.vue';
import ApiTreeSelect from './components/ApiTreeSelect.vue';
import AutoComplete from './components/AutoComplete.vue';
import ApiSelect from './components/ApiSelect.vue';
import RadioGroup from './components/RadioGroup.vue';
import IconPicker from './components/IconPicker.vue';
import SelectPicker from './components/SelectPicker.vue';
import Upload from './components/Upload.vue';

export const componentMap = new Map<ComponentType, Component>();

componentMap.set('NInput', NInput);
componentMap.set('NInputNumber', NInputNumber);
componentMap.set('AutoComplete', AutoComplete);
componentMap.set('NSelect', NSelect);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('SelectPicker', SelectPicker);
componentMap.set('NTreeSelect', NTreeSelect);
componentMap.set('NTree', NTree);
componentMap.set('ApiTree', ApiTree);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('NSwitch', NSwitch);
componentMap.set('NRadioGroup', RadioGroup);
componentMap.set('NCheckbox', NCheckbox);
componentMap.set('NCheckboxGroup', NCheckboxGroup);
componentMap.set('NCascader', NCascader);
componentMap.set('NSlider', NSlider);
componentMap.set('NRate', NRate);
componentMap.set('NIconPicker', IconPicker);
componentMap.set('NDatePicker', NDatePicker);
componentMap.set('NTimePicker', NTimePicker);
componentMap.set('Upload', Upload);
componentMap.set('NDivider', NDivider);
