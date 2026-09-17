import { useState, useEffect } from "react";
import { formatDate, renderStatusBadge } from "../share/utils";
import DataTable from "../share/DataTable";
import { getContractByUsername } from "../services/contract.service";
import { getBookById } from "../services/book.service";

export default function Contract() {
	const contractColumns = [
		{
			key: "bookName",
			label: "Book Name",
			render: (row) => bookTitleMap[row.bookId] || "-"
		},
		{
			key: "status",
			label: "Status",
			render: (row) => renderStatusBadge(row.status)
		},
		{
			key: "createdDate",
			label: "Created Date",
			render: (row) => formatDate(row.createdDate)
		},
		{
			key: "completedDate",
			label: "Completed Date",
			render: (row) => formatDate(row.completedDate)
		},
		{
			key: "voidedDate",
			label: "Voided Date",
			render: (row) => formatDate(row.voidedDate)
		}
	];

	const [contracts, setContracts] = useState([]);
	const [bookTitleMap, setBookTitleMap] = useState({})

	const user = JSON.parse(localStorage.getItem("user") || "null");

	useEffect(() => {
		async function fetchData() {
			if (user !== "null") {
				const contractRes = await getContractByUsername(user.username);
				const contracts = contractRes.data;
				setContracts(contracts);

				const uniqueBookIds = [...new Set(contracts.map((c) => c.bookId))];

				const bookEntries = await Promise.all(
					uniqueBookIds.map(async (id) => {
						const bookRes = await getBookById(id);
						return [id, bookRes.data.name];
					})
				);

				setBookTitleMap(Object.fromEntries(bookEntries))
			}
		}
		fetchData();
	}, []);

	return (
		<div className="p-6">
			<DataTable
				columns={contractColumns}
				data={contracts}
				onDelete={() => {}}
				onUpdate={() => {}}
				entity="Contracts"
			/>
		</div>
	);
}
