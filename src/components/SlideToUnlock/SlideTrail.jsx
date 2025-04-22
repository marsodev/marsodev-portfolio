import React, { forwardRef } from "react";

const SlideTrail = forwardRef((props, ref) => {
  return <div className="slide-trail" ref={ref}></div>;
});

export default SlideTrail;
