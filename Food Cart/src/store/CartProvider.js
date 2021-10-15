import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

		//if the new item being added already exists, get its index
		const exisitingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
		//get tha existing item
		const existingCartItem = state.items[exisitingCartItemIndex];

		let updatedItems;
		if (existingCartItem) {
			//Make a new object of existing item with updated amount
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};

			//add the updated item to the items list
			updatedItems = [...state.items];
			updatedItems[exisitingCartItemIndex] = updatedItem;
		} else {
			//concat creates and returns a new array, push modifies exisiting array
			//we dont want to update old state hence we dont use push
			updatedItems = state.items.concat(action.item);
		}

		return { items: updatedItems, totalAmount: updatedTotalAmount };
	}

	if (action.type === "REMOVE_ITEM") {
		const exisitingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
		const existingCartItem = state.items[exisitingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;

		let updatedItems;
		if (existingCartItem.amount === 1) {
			//remove the item from the aray that has amount = 1, and return new array
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[exisitingCartItemIndex] = updatedItem;
		}

		return { items: updatedItems, totalAmount: updatedTotalAmount };
	}

	if (action.type === "CLEAR") {
		return defaultCartState;
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD_ITEM", item: item });
	};

	const reomveItemFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE_ITEM", id: id });
	};

	const clearCartHandler = () => {
		dispatchCartAction({ type: "CLEAR" });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: reomveItemFromCartHandler,
		clearCart: clearCartHandler,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
