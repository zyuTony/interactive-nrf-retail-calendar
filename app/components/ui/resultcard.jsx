import QuickCopyButton from "./quickcopybutton";

export default function ResultCard({ label, value, className = "" }) {
  return (
    <div
      className={`flex justify-between items-center group relative gap-1 ${className}`}
    >
      <p className=" text-gray-600">{label}</p>
      <div className="flex items-center space-x-2">
        <p className=" text-blue-600">{value}</p>
        <div className="opacity-0 group-hover:opacity-100">
          <QuickCopyButton textToCopy={value} />
        </div>
      </div>
    </div>
  );
}
