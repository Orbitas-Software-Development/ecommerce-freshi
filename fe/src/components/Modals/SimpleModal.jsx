import React from "react";
import MicroModal from "react-micro-modal";
export default function SimpleModal({ data }) {
  const icons = {
    warning: <i class="fa-solid fa-triangle-exclamation  fa-lg"></i>,
    info: <i class="fa-solid fa-circle-info  fa-lg"></i>,
    loading: <i class="fa-solid fa-circle-notch fa-spin fa-lg"></i>,
    check: <i class="fa-solid fa-check fa-lg" style={{ color: "#63E6BE" }}></i>,
  };

  const { loading, text, icon } = data;
  return (
    <MicroModal
      openInitially={false}
      open={loading}
      trigger={(open) => <div onClick={open}></div>}
    >
      {(close) => (
        <p className="text-xl">
          {text} {icons[icon]}
        </p>
      )}
    </MicroModal>
  );
}
