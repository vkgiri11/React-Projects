import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postal: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const cityInputRef = useRef();
	const postalInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalIsValid = isSixChars(enteredPostal);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postal: enteredPostalIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enteredPostalIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postal: enteredPostal,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? "" : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputsValidity.street ? "" : classes.invalid
	}`;
	const postalControlClasses = `${classes.control} ${
		formInputsValidity.postal ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputsValidity.city ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" autoComplete="off" ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter a valid name.</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" autoComplete="off" ref={streetInputRef} />
				{!formInputsValidity.street && <p>Please enter a valid street name.</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" autoComplete="off" ref={cityInputRef} />
				{!formInputsValidity.city && <p>Please enter a valid city name.</p>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" autoComplete="off" ref={postalInputRef} />
				{!formInputsValidity.postal && <p>Postal code should be 6 digits long.</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;

/* 
Adding type=button so that this button doesnt submits the form
*/
