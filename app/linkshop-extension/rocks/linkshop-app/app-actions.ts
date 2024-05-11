import { Rock } from "@ruiapp/move-style";

const appActionMap: Record<string, Rock["onReceiveMessage"]> = {
  gotoNextStep: (message, state, props) => {
    state.switchStep("next");
  },
  gotoPreviousStep: (message, state, props) => {
    state.switchStep("prev");
  },
  gotoStepById: (message, state, props) => {
    state.switchStepById(message.payload.$id);
  },
  gotoStepByName: (message, state, props) => {
    state.switchStepByName(message.payload.$name);
  },
};

export default appActionMap;
