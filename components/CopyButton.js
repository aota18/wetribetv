import React from "react";
import useCopyToClipboard from "../utils/useCopyToClipboard";

const CopyButton = ({ code }) => {
  const [isCopied, handleCopy] = useCopyToClipboard();

  return (
    <button onClick={() => handleCopy(code)}>
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
