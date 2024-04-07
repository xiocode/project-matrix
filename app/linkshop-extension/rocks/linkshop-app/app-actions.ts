import { Rock } from '@ruiapp/move-style';

const appActionMap: Record<string, Rock['onReceiveMessage']> = {
  gotoNextStep: (message, state, props) => {
    state.switchStep('next');
  },
  gotoPreviousStep: (message, state, props) => {
    state.switchStep('prev');
  },
};

export default appActionMap;
