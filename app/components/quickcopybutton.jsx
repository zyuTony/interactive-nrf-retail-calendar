import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function CopyToClipboardButton({ textToCopy }) {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <button
      onClick={() => copyToClipboard(textToCopy)}
      title="Copy to clipboard"
    >
      <FontAwesomeIcon icon={faCopy} /> {/* This renders the copy icon */}
    </button>
  );
}

export default CopyToClipboardButton;
