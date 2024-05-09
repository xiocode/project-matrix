export type DesignStageType = "step" | "layout";

export type DesignStage = StepDesignStage | LayoutDesignStage;

export type StepDesignStage = {
  type: "step";
  stepId: string;
};

export type LayoutDesignStage = {
  type: "layout";
  layoutId: string;
};
