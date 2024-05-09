import { memo } from "react";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import * as SvgComponents from "./components";

const CustomizeIcon = memo<Partial<CustomIconComponentProps & { name: string }>>((props) => {
  const svg = (SvgComponents as any)[props.name!];

  if (!svg) {
    console.error(`The custom icon name(${props.name}) component does not exist`);
    return <></>;
  }

  return <Icon component={svg} {...props} />;
});

export default CustomizeIcon;
