import { useContext, useState, useEffect } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartIcon.module.css";

const HeaderCartIcon = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

	const cartCtx = useContext(CartContext);
	const { items } = cartCtx; // items = cartCtx.items

	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

	//whenever item is added to car show animation
	useEffect(() => {
		//If cart is empty, no animation
		if (items.length === 0) return;

		setBtnIsHighlighted(true);

		//remove animation after 300ms
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		//clear prev timer if any on cleanup function
		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>My Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartIcon;
