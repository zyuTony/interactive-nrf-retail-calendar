import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the check icon for success indication

export default function QuickCopyButton({ textToCopy }) {
  // State to track copy success
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true); // Set copied to true on success
        setTimeout(() => setCopied(false), 130); // Reset copied status after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopied(false); // Ensure copied is false on failure
      });
  };

  return (
    <button
      onClick={() => copyToClipboard(textToCopy)}
      title={copied ? "Copied!" : "Copy to clipboard"}
      className={copied ? "text-green-500" : "text-gray-500"} // Example: change color on success
    >
      {copied ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faCopy} />
      )}
      {/* Show check icon if copied, otherwise show copy icon */}
    </button>
  );
}
