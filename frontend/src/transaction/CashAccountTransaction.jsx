import { useState, useEffect } from "react";
import { getTransactionByUsername } from "../services/cash.account.transaction.service";
import DataTable from "../share/DataTable";
import { formatDate, formatSnakeCaseToTitle } from "../share/utils";

export default function CashAccountTransaction() {
	const transactionColumns = [
		{
			key: "amount",
			label: "Amount",
			render: (row) => `$${Number(row.amount || 0).toFixed(2)}`
		},
		{
			key: "transactionType",
			label: "Transaction Type",
			render: (row) => formatSnakeCaseToTitle(row.transactionType)
		},
		{
			key: "transactionFlow",
			label: "Transaction Flow",
			render: (row) => {
				const badgeClass =
					row.transactionFlow === "IN"
						? "badge-success text-white"
						: "badge-error text-white";
				return (
					<span
						className={`badge ${badgeClass} font-semibold text-xs py-2 px-3 tracking-wide`}
					>
						{row.transactionFlow}
					</span>
				);
			}
		},
		{
			key: "createdDate",
			label: "Created Date",
			render: (row) => formatDate(row.createdDate)
		}
	];

	const [transactions, setTransactions] = useState([]);
	const user = JSON.parse(localStorage.getItem("user") || "null");

	useEffect(() => {
		async function fetchData() {
			if (user !== "null") {
				const transactionRes = await getTransactionByUsername(user.username);
				setTransactions(transactionRes.data);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="p-6">
			<DataTable
				columns={transactionColumns}
				data={transactions}
				onDelete={() => {}}
				onUpdate={() => {}}
				entity="Transactions"
			/>
		</div>
	);
}
