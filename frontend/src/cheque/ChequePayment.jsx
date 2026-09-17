import { useState, useEffect } from "react";
import DataTable from "../share/DataTable";
import {
	getAllChequePayments,
	getChequePaymentById,
	getChequePaymentsByUsername,
	updateChequePayment
} from "../services/cheque.payment.service";
import { createTransaction } from "../services/cash.account.transaction.service";
import { approveContract, cancelContract } from "../services/contract.service";
import { getBookById } from "../services/book.service";
import { formatDate, renderStatusBadge } from "../share/utils";
import { createShelf } from "../services/shelf.service";

export default function ChequePayment() {
	const baseChequeColumns = [
		{
			key: "chequeNumber",
			label: "Cheque Number"
		},
		{
			key: "amount",
			label: "Amount",
			render: (row) => `$${Number(row.amount || 0).toFixed(2)}`
		},
		{
			key: "createdDate",
			label: "Created Date",
			render: (row) => formatDate(row.createdDate)
		},
		{
			key: "status",
			label: "Status",
			render: (row) => renderStatusBadge(row.status)
		}
	];

	const userChequePaymentColumns = [
		...baseChequeColumns,
		{
			key: "approvedDate",
			label: "Approved Date",
			render: (row) => formatDate(row.approvedDate)
		},
		{
			key: "voidedDate",
			label: "Voided Date",
			render: (row) => formatDate(row.voidedDate)
		},
		{
			key: "actions",
			label: "Action",
			render: (row) => {
				return (
					<div className="flex justify-center ">
						{row.status === "PENDING" ? (
							<>
								<button
									type="button"
									className="btn btn-sm btn-error"
									onClick={() => onRejectCheque(row.id)}
								>
									Reject
								</button>
							</>
						) : (
							<>-</>
						)}
					</div>
				);
			}
		}
	];

	const modChequePaymentColumns = [
		...baseChequeColumns,
		{
			key: "actions",
			label: "Action",
			render: (row) => {
				return (
					<div className="flex justify-center gap-2">
						{row.status === "PENDING" ? (
							<>
								<button
									type="button"
									className="btn btn-sm btn-success"
									onClick={() => onApproveCheque(row.id)}
								>
									Approve
								</button>

								<button
									type="button"
									className="btn btn-sm btn-error"
									onClick={() => onRejectCheque(row.id)}
								>
									Reject
								</button>
							</>
						) : (
							<>-</>
						)}
					</div>
				);
			}
		}
	];

	const [chequePayment, setChequePayment] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const user = JSON.parse(localStorage.getItem("user") || "null");
	const role = user?.role;
	const username = user?.username;

	const filteredChequePayment = chequePayment.filter(cheque => cheque.chequeNumber.toLowerCase().includes(searchValue.toLowerCase()))

	useEffect(() => {
		async function fetchData() {
			if (!role) return;
			let response;
			if (role === "USER" && username) {
				response = await getChequePaymentsByUsername(username);
			} else if (role === "MODERATOR") {
				response = await getAllChequePayments();
			}
			if (response?.data) {
				setChequePayment(response.data);
			}
		}
		fetchData();
	}, [role, username]);

	const onApproveCheque = async (chequeId) => {
		if (!confirm("Are you sure you want to approve this cheque?")) return;
		const dateNow = new Date();
		const resCheque = await getChequePaymentById(chequeId);
		const cheque = resCheque.data;
		const chequeDto = {
			...cheque,
			approvedDate: dateNow,
			approvedBy: username,
			status: "APPROVED"
		};
		await updateChequePayment(chequeId, chequeDto);
		const resContract = await approveContract(chequeId);
		const contracts = resContract.data;
		const inFlowTransaction = {
			userId: cheque.userId,
			transactionFlow: "IN",
			transactionType: "CASH_DEPOSIT",
			amount: cheque.amount,
			referenceNo: cheque.id,
			createdDate: dateNow
		};

		await createTransaction(inFlowTransaction);

		const outFlowTransactionPromises = contracts.map(async (contract) => {
			const resBook = await getBookById(contract.bookId);
			const book = resBook.data;
			const transactionDto = {
				userId: cheque.userId,
				transactionFlow: "OUT",
				transactionType: "BUY_BOOK",
				amount: book.price,
				referenceNo: contract.id,
				createdDate: dateNow
			};
			return createTransaction(transactionDto);
		});

		await Promise.all(outFlowTransactionPromises);

		const shelfDtos = contracts.map((contract) => {
			return { bookId: contract.bookId, userId: contract.userId };
		});

		await Promise.all(shelfDtos.map((shelfDto) => createShelf(shelfDto)));

		const resAllCheque = await getAllChequePayments();
		setChequePayment(resAllCheque.data);
	};

	const onRejectCheque = async (chequeId) => {
		if (!confirm("Are you sure you want to cancel this payment?")) return;
		const dateNow = new Date();
		const resCheque = await getChequePaymentById(chequeId);
		const cheque = resCheque.data;
		const chequeDto = {
			...cheque,
			status: "VOIDED",
			voidedDate: dateNow,
			voidedBy: username
		};
		await updateChequePayment(chequeId, chequeDto);
		await cancelContract(chequeId, username);

		const resAllCheque = await getAllChequePayments();
		setChequePayment(resAllCheque.data);
	};

	return (
		<div className="p-6">
			<DataTable
				columns={
					role === "USER" ? userChequePaymentColumns : modChequePaymentColumns
				}
				data={filteredChequePayment}
				onDelete={() => {}}
				onUpdate={() => {}}
				entity="Cheque Payments"
				searchValue={searchValue}
				onSearch={setSearchValue}
				searchPlaceholder="Search cheque number..."
			/>
		</div>
	);
}
