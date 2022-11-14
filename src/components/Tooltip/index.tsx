import Tippy from "@tippyjs/react";
import { ReactElement } from "react";

type TTooltip = {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any>;
  // Tippy type for their children. Since it uses any, I needed to disable this line
};

function Tooltip({ text, children }: TTooltip) {
  return <Tippy content={text}>{children}</Tippy>;
}

export default Tooltip;
