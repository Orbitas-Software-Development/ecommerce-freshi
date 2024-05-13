import React from "react";

export default function Layout(props) {
  return (
    <div
      className="desktop:min-h-[86vh] laptop:min-h-[86vh] tablet:min-h-[86vh] phone:min-h-[86vh] flex"
      id="layout"
    >
      {props.children}
    </div>
  );
}
