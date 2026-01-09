export function Toast({ message, type = "success", onClose }) {

  const alertType = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
  }[type];

  return (
    <div className="toast toast-end toast-bottom z-50">
      <div className={`alert ${alertType}`}>
        <span className="text-lg">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
