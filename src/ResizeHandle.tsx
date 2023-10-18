import { PanelResizeHandle } from "react-resizable-panels";

import "./index.css"

export default function ResizeHandle({
  className = "",
  id
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle
      className={["ResizeHandleOuter", className].join(" ")}
      id={id}
    >
      <div className={"ResizeHandleInner"}>
      </div>
    </PanelResizeHandle>
  );
}
