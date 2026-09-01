import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage(){

    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [chequeNumber, setChequeNumber] = useState("");
    const [amount, setAmount] = useState("");
    
    // Example cart data (replace with your Context / State)
    const cart = [
        { id: 1, name: "Design Patterns", price: 45.0, quantity: 1 },
        { id: 2, name: "Spring Boot Guide", price: 35.0, quantity: 2 },
    ];

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        const payload = {
        items: cart,
        totalAmount: total,
        paymentMethod,
        chequeNumber: paymentMethod === "CHEQUE" ? chequeNumber : null,
        status: paymentMethod === "CHEQUE" ? "AWAITING_CHEQUE" : "PENDING_DELIVERY",
        };

        console.log("Order placed:", payload);
        // await createOrder(payload);
        // navigate("/order-success");
    };

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
                            <span className="text-sm text-base-content/70">
                            Mail or drop off a physical cheque to our account.
                            </span>

                            {/* Conditional Cheque Fields */}
                            {paymentMethod === "CHEQUE" && (
                            <div className="mt-4 p-4 bg-base-200 rounded-lg space-y-3">

                                <div className="fieldset">
                                    <label className="fieldset-legend font-semibold text-xs">
                                        Cheque Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. CHQ-893247"
                                        value={chequeNumber}
                                        onChange={(e) => setChequeNumber(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="fieldset">
                                    <label className="fieldset-legend font-semibold text-xs">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder=""
                                        value={amount}
                                        onChange={(e) => setChequeNumber(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
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
                        {cart.map((item) => (
                        <div key={item.id} className="py-2 flex justify-between text-sm">
                            <span>{item.name} <span className="text-base-content/60">x{item.quantity}</span></span>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-success">${total.toFixed(2)}</span>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary w-full mt-6"
                        onClick={handlePlaceOrder}
                        disabled={paymentMethod === "CHEQUE" && !chequeNumber.trim()}
                    >
                        Confirm Order
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}