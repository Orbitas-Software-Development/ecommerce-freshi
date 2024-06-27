import React from "react";

export default function Layout(props) {
  return (
    <div className="pc:min-h-[86vh] movil:min-h-[86vh]  flex" id="layout">
      {props.children}
    </div>
  );
}
