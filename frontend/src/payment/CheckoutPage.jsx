import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../share/FormInput";
import { getUserByUsername, updateUser } from "../services/user.service";
import { createContract } from "../services/contract.service";
import { createTransaction } from "../services/cash.account.transaction.service";
import { useCart } from "../cart/CartProvider";
import { createChequePayment } from "../services/cheque.payment.service";
import { createShelf } from "../services/shelf.service";

export default function CheckoutPage() {
	const emptyForm = {
		chequeNumber: "",
		amount: 0
	};
	const navigate = useNavigate();
	const [paymentMethod, setPaymentMethod] = useState("CASH");
	const [form, setForm] = useState(emptyForm);
	const user = JSON.parse(localStorage.getItem("user") || "null");
	const username = user?.username;
	const { cart, totalAmount, clearCart } = useCart();

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handlePlaceOrder = async () => {
		const response = await getUserByUsername(username);
		const currentUser = response.data;
		const dateNow = new Date();
		if (currentUser.amount < totalAmount) {
			alert(
				"Insufficient balance. Please top up your account to complete this purchase."
			);
			return;
		}

		if (paymentMethod === "CASH") {
			await updateUser(currentUser.id, {
				...currentUser,
				amount: currentUser.amount - totalAmount
			});
			const contractDtos = cart.map((order) => {
				return {
					userId: currentUser.id,
					bookId: order.id,
					paymentMethod: "CASH",
					status: "APPROVED",
					createdDate: dateNow,
					completedDate: dateNow
				};
			});

			const responses = await Promise.all(
				contractDtos.map((contractDto) => createContract(contractDto))
			);

			const transactionDtos = responses.map((res) => {
				const contract = res.data;
				const bookPrice =
					cart.find((item) => item.id === contract.bookId)?.price || 0;
				return {
					userId: currentUser.id,
					transactionType: "BUY_BOOK",
					transactionFlow: "OUT",
					amount: bookPrice,
					createdDate: dateNow,
					referenceNo: contract.id
				};
			});

			await Promise.all(
				transactionDtos.map((transactionDto) =>
					createTransaction(transactionDto)
				)
			);

			const shelfDtos = responses.map((res) => {
				const contract = res.data;
				return {
					bookId: contract.bookId,
					userId: contract.userId,
				}
			})

			await Promise.all(
				shelfDtos.map(shelfDto => createShelf(shelfDto))
			)

			alert("Payment Completed!");

		} else if (paymentMethod === "CHEQUE") {
			const chequePaymentDto = {
				chequeNumber: form.chequeNumber,
				userId: currentUser.id,
				amount: form.amount,
				status: "PENDING",
				createdDate: dateNow
			};
			const chequePaymentRes = await createChequePayment(chequePaymentDto);
			const contractDtos = cart.map((order) => {
				return {
					userId: currentUser.id,
					bookId: order.id,
					paymentMethod: "CHEQUE",
					chequePaymentId: chequePaymentRes.data.id,
					status: "PENDING",
					createdDate: dateNow
				};
			});

			await Promise.all(
				contractDtos.map((contractDto) => createContract(contractDto))
			);
			alert("Cheque Payment Submitted!");
		}

		clearCart();
		setForm(emptyForm);
		navigate("/");
	};

	const isConfirmDisabled = Boolean(
		// Cart is empty
		(totalAmount || 0) <= 0 ||
		// Cheque validation: missing cheque number or amount doesn't match total
		(paymentMethod === "CHEQUE" &&
			(!form.chequeNumber?.trim() ||
				Math.abs(Number(form.amount || 0) - Number(totalAmount || 0)) > 0.001))
	);

	return (
		<>
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Side: Payment Method Selection */}
					<div className="lg:col-span-2 space-y-6">
						<div className="card bg-base-100 shadow-md border border-base-200 p-6">
							<h2 className="text-xl font-semibold mb-4">Payment Method</h2>

							{/* Option 1: Cash */}
							<label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-base-200 transition-colors mb-4">
								<input
									type="radio"
									name="payment"
									className="radio radio-primary mt-1"
									checked={paymentMethod === "CASH"}
									onChange={() => setPaymentMethod("CASH")}
								/>
								<div className="w-full">
									<span className="font-bold block">Cash</span>
									<span className="text-sm text-base-content/70">
										Pay instantly using your available cash balance.
									</span>
								</div>
							</label>

							{/* Option 2: Cheque */}
							<label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-base-200 transition-colors">
								<input
									type="radio"
									name="payment"
									className="radio radio-primary mt-1"
									checked={paymentMethod === "CHEQUE"}
									onChange={() => setPaymentMethod("CHEQUE")}
								/>
								<div className="w-full">
									<span className="font-bold block">Cheque Payment</span>
									<span className="text-sm text-base-content/70 block">
										Payment will be approved after admin verification. <br/>
										<span className="text-red-400 font-semibold">Cheque amount must match the total order amount exactly.</span>
									</span>

									{paymentMethod === "CHEQUE" && (
										<div className="mt-4 p-4 bg-base-200 rounded-lg space-y-3">
											<FormInput
												label="Cheque Number"
												name="chequeNumber"
												type="text"
												placeholder="e.g. CHQ-893247"
												value={form.chequeNumber}
												onChange={handleChange}
												required
											/>
											<FormInput
												label="Amount"
												name="amount"
												type="number"
												placeholder="Amount"
												value={form.amount}
												onChange={handleChange}
												min="0"
												step="0.01"
												required
											/>
										</div>
									)}
								</div>
							</label>
						</div>
					</div>

					{/* Right Side: Order Summary */}
					<div className="card bg-base-100 shadow-md border border-base-200 p-6 h-fit">
						<h2 className="text-xl font-semibold mb-4">Order Summary</h2>

						<div className="divide-y divide-base-200 mb-4">
							{cart &&
								cart.map((item) => (
									<div
										key={item.id}
										className="py-2 flex justify-between text-sm"
									>
										<span>
											{item.name}{" "}
											<span className="text-base-content/60">
												x{item.quantity}
											</span>
										</span>
										<span className="font-semibold">
											${(item.price * item.quantity).toFixed(2)}
										</span>
									</div>
								))}
						</div>

						<div className="border-t pt-4 flex justify-between text-lg font-bold">
							<span>Total</span>
							<span className="text-success">
								${(totalAmount || 0).toFixed(2)}
							</span>
						</div>

						<button
							type="button"
							className="btn btn-primary w-full mt-6"
							onClick={handlePlaceOrder}
							disabled={isConfirmDisabled}
						>
							Confirm
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
