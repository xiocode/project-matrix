import type { Rock } from "@ruiapp/move-style";
import ShopfloorAppMeta from "./LinkshopAppMeta";
import { renderRock } from "@ruiapp/react-renderer";
import type { LinkshopAppRockConfig, LinkshopAppStepRockConfig } from "~/linkshop-extension/linkshop-types";

import appActionMap from "./app-actions";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export default {
  onResolveState(props, state) {
    const { steps } = props;

    const [currentStep, setCurrentStep] = useState<LinkshopAppStepRockConfig>(steps?.[0]);
    useEffect(() => {
      if (!currentStep && !isEmpty(steps)) {
        setCurrentStep(steps[0]);
      }
    }, [steps]);

    return {
      currentStep,
      switchStep: (key: "next" | "prev") => {
        const currentStepIndex = steps.findIndex((s: any) => s.$id === currentStep.$id);
        switch (key) {
          case "next":
            const nextStep = steps[currentStepIndex + 1];
            if (nextStep) {
              setCurrentStep(nextStep);
            }
            break;
          case "prev":
            const prevStep = steps[currentStepIndex - 1];
            if (prevStep) {
              setCurrentStep(prevStep);
            }
            break;
        }
      },
    };
  },

  onReceiveMessage(message, state, props) {
    const appAction = appActionMap[message.name];
    if (typeof appAction === "function") {
      appAction(message, state, props);
    }
  },

  Renderer(context, props: LinkshopAppRockConfig, state) {
    const { currentStep } = state;

    return renderRock({
      context,
      rockConfig: currentStep,
    });
  },

  ...ShopfloorAppMeta,
} as Rock;
