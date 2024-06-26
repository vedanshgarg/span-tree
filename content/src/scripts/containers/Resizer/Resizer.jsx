import React, { useRef } from "react";
import { connect } from "react-redux";

import { setWidth } from "../../../../../event/src/actions/UI";
import { throttle } from "../../utils/throttle";

import "./styles.css";

const Resizer = ({ width, setWidth }) => {
  const transitionProps = useRef("");

  const mouseDownListener = () => {
    document.body.style.userSelect = "none";
    const sidebar =
      document.querySelector(".nav-sidebar") ||
      document.querySelector(".super-sidebar");
    transitionProps.current = sidebar.style.transition;
    sidebar.style.transition = "none";
    document.addEventListener("mousemove", throttledMouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);
  };

  const mouseUpListener = () => {
    document.body.style.userSelect = "auto";
    const sidebar =
      document.querySelector(".nav-sidebar") ||
      document.querySelector(".super-sidebar");
    sidebar.style.transition = transitionProps.current;
    document.removeEventListener("mousemove", throttledMouseMoveListener);
    document.removeEventListener("mouseup", mouseUpListener);
  };

  const mouseMoveListener = (event) => {
    setWidth(event.clientX);
  };

  const throttledMouseMoveListener = throttle(mouseMoveListener, 16);

  return (
    <div
      className="spantree-resizer"
      unselectable="on"
      style={{ left: width + "px" }}
      onMouseDown={mouseDownListener}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    width: state.width,
  };
};

const mapDispatchToProps = { setWidth };

export default connect(mapStateToProps, mapDispatchToProps)(Resizer);
