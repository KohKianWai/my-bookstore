import { useState } from "react";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
import DataTable from "../share/DataTable";

export default function Cart() {
	const navigate = useNavigate();
	const { cart, removeFromCart, totalAmount, clearCart } = useCart();

	const cartColumns = [
		{
			key: "coverImage",
			label: "Cover Image",
			render: (book) => (
				<img
					src={`http://localhost:8080/api/book/${book.id}/cover-image`}
					alt={book.name}
					className="w-30 h-45 object-cover rounded mx-auto"
				/>
			)
		},
		{
			key: "name",
			label: "Book Name"
		},
		{
			key: "price",
			label: "Price",
			render: (book) => (
				<span className="font-bold text-green-600">{`$${Number(book.price || 0).toFixed(2)}`}</span>
			)
		},
		{
			key: "quantity",
			label: "Quantity"
		},
		{
			key: "action",
			label: "Action"
		}
	];

	return (
		<div className="p-6">
			{cart.length > 0 && (
				<div className="flex justify-end mb-2 px-10">
					<button
						type="button"
						className="btn btn-error btn-sm"
						onClick={clearCart}
					>
						✕ Clear Cart
					</button>
				</div>
			)}
			<DataTable
				columns={cartColumns}
				data={cart}
				onDelete={(book) => removeFromCart(book.id)}
				entity="Book"
				title="Cart"
			/>
			{cart.length > 0 && (
				<div className="px-10 -mt-4 mb-10 flex justify-center">
					<div className="w-full max-w-2xl bg-base-100 border border-base-300 rounded-2xl shadow-lg overflow-hidden">
						<div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
							<div>
								<p className="text-sm text-base-content/60 mb-1">
									Order Summary
								</p>

								<h3 className="text-xl font-bold">
									{cart.length} {cart.length === 1 ? "Book" : "Books"} in your
									cart
								</h3>
							</div>

							<div className="sm:text-right">
								<p className="text-sm text-base-content/60 mb-1">
									Total Amount
								</p>

								<p className="text-4xl font-extrabold text-green-600">
									${Number(totalAmount || 0).toFixed(2)}
								</p>
							</div>
						</div>

						<div className="bg-base-200/70 border-t border-base-300 p-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
							<p className="text-sm text-base-content/60">
								Review your payment details before completing your order.
							</p>

							<button
								type="button"
								className="btn btn-primary px-8 whitespace-nowrap"
								onClick={() => navigate("/checkout")}
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
