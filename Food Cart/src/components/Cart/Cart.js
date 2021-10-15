import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	const totalAmount = cartCtx.totalAmount;
	const hasItems = cartCtx.items.length > 0;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const orderhandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://react-food-cart-cebf5-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItem: cartCtx.items,
				}),
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
        cartCtx.clearCart();
	};

	const cartItems = cartCtx.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			amount={item.amount}
			price={item.price}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onCloseCart}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderhandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			<ul className={classes["cart-items"]}>{cartItems}</ul>

			<div className={classes.total}>
				<span>Total Amount</span>
				<span>Rs. {totalAmount}</span>
			</div>

			{isCheckout && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Ordering Food....</p>;
	const didSubmitModalContent = (
		<React.Fragment>
			<p>Order Placed !!!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onCloseCart}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;

/*

We can't just write ...

onRemove={cartItemRemoveHandler(item.id)}
... since this would call the function immediately (and not when the cart item is clicked).

So, if we want to pass params, we can either use bind (the first param is not used here, 
so we can write anything in this place) ...


onRemove={cartItemRemoveHandler.bind(null, item.id)}

..., or we can create an anonymous function:

onRemove={() => cartItemRemoveHandler(item.id)}


Both options are equivalent.

*/
