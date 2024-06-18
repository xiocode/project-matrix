
export type CreateProcessInstanceInput = {
  title: string;
  process: number;
  initiator: number;
  formData: Record<string, any>;
  variables: Record<string, any>;
  state: string;
}

export type StartProcessInstanceInput = {
  instanceId: number;
  processId: number;
}

export type FlowConfig = {
  nodes?: FlowNode[];
}

export type FlowNodeTransfer = {
  operation: string;
  nextNodeId: string;
}

export type FlowNode = ActivityFlowNode;

export type ActivityFlowNode = ApprovalActivityFlowNode;

export type ActivityFlowNodeBase = {
  nodeType: "activity";
  nodeId: string;
  nodeTitle?: string;
  transfers: FlowNodeTransfer[];
}

export type ApprovalActivityFlowNode = ActivityFlowNodeBase & {
  activityType: "approval",
  activityConfig: ApprovalActivityConfig;
}

export type ApprovalActivityConfig = {
  /**
   * 审批类型。manual表示人工审批。
   */
  approvalType: "manual";

  /**
   * 审批人类型。specifiedUser表示指定用户。
   */
  approverType: "specifiedUser",
  approverRange: {
    users?: number[];
  },
  /**
   * 多人审批策略。everyone表示会签，anyone表示或签，sequence表示串签/依次审批。
   */
  groupDecisionPolicy: "everyone" | "anyone" | "sequence";
}