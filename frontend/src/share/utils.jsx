export const formatDate = (dateStr) => {
	if (!dateStr) return "-";
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return "-";

	const pad = (num) => String(num).padStart(2, "0");
	const day = pad(d.getDate());
	const month = pad(d.getMonth() + 1);
	const year = d.getFullYear();
	const hours = pad(d.getHours());
	const minutes = pad(d.getMinutes());
	const seconds = pad(d.getSeconds());

	return (
		<span className="font-mono text-xs text-base-content/80 whitespace-nowrap">
			{`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}
		</span>
	);
};

export const renderStatusBadge = (status) => {
	const badgeStyles = {
		PENDING: "badge-warning",
		APPROVED: "badge-success text-white",
		VOIDED: "badge-error text-white"
	};

	const badgeClass = badgeStyles[status] || "badge-ghost";

	return (
		<span
			className={`badge ${badgeClass} font-semibold text-xs py-2 px-3 tracking-wide`}
		>
			{status || "UNKNOWN"}
		</span>
	);
};

export const formatSnakeCaseToTitle = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
