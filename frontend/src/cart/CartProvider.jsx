import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const addToCart = (book) => {
		setCart((prev) => {
			const existBook = prev.find((item) => item.id === book.id);

			if (existBook) {
				return prev.map((item) =>
					item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}

			return [
				...prev,
				{
					id: book.id,
					name: book.name,
					price: book.price,
					coverImage: book.coverImage,
					quantity: 1
				}
			];
		});
		console.log("Added to Cart!");
	};

	const removeFromCart = (id) => {
		const ok = confirm("Are you sure you want to delete this book?");
		if (!ok) {
			return;
		}
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

	const totalAmount = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				totalAmount
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
