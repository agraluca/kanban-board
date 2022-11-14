import PropTypes from "prop-types";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type TCreatePortalWrapper = {
  children: ReactNode;
  selector: string;
};

export default function CreatePortalWrapper({
  children,
  selector = "portal-root",
}: TCreatePortalWrapper) {
  let container = document.getElementById(selector);

  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", selector);
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}

CreatePortalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  selector: PropTypes.string,
};
