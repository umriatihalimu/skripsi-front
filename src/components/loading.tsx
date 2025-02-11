import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        top: "50%",
        width: "100%",
        zIndex: "1050",
      }}
    >
      <div
        style={{
          width: "200px",
          background: "#000",
          color: "#FFF",
          margin: "auto",
          textAlign: "center",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <span className="loading loading-spinner loading-lg"></span> <br />
        Loading
      </div>
    </div>
  );
};

export default Loading;
