import { useContext } from "react";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = cartCtx.totalAmount;
	const hasItems = cartCtx.items.length > 0;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
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

	return (
		<Modal onCloseCart={props.onCloseCart}>
			<ul className={classes["cart-items"]}>{cartItems}</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>Rs. {totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onCloseCart}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
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
