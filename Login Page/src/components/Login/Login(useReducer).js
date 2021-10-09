import React, { useState, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//We are creating this outside, since it wont need any data gennerated inside
//the component function, Any data req, will be passed by react automatically

//State -> stores just the immediate prev state
const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		//returns a new state
		return { value: action.val, isValid: action.val.includes("@") };
	}

	//After the user has finished typing, we want the input fields to retain the value
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}

	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "INPUT_PASSWORD") {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}

	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}

	return { value: "", isValid: false };
};

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: "", isValid: null });
	//emailState initial value - > { value: "", isValid: null }

	const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: "", isValid: null });

	const emailChangeHandler = (event) => {
		//dispatchEmailState calls emailReducer.
		dispatchEmailState({ type: "USER_INPUT", val: event.target.value });

		setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const validateEmailHandler = () => {
		dispatchEmailState({ type: "INPUT_BLUR" });
	};

	const passwordChangeHandler = (event) => {
		dispatchPasswordState({ type: "INPUT_PASSWORD", val: event.target.value });

		setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const validatePasswordHandler = () => {
		dispatchPasswordState({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ""}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;

/*
setEmailIsValid(enteredEmail.includes("@"));

we are using one state value(enteredEmail) to update another state value(SetEmailIsvalid)
so we can use reducers, when we need to combine states
*/
