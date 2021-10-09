import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import InputForm from "../UI/InputForm/InputForm";

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
	const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});

	//object destructuring -> JS syntax
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsvalid } = emailState;

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsvalid);
		}, 500);

		//clean up function
		return () => {
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsvalid]); // This effect will re-run only if the validity changes not the value

	const emailChangeHandler = (event) => {
		dispatchEmailState({ type: "USER_INPUT", val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmailState({ type: "INPUT_BLUR" });
	};

	const passwordChangeHandler = (event) => {
		dispatchPasswordState({ type: "INPUT_PASSWORD", val: event.target.value });
	};

	const validatePasswordHandler = () => {
		dispatchPasswordState({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<InputForm
					ref={emailInputRef}
					id="email"
					label="E-mail"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<InputForm
					ref={passwordInputRef}
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsvalid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;

// useEffect() also runs when the component mounts

/*
if invalid input -> button disables.
after the component is rendered, useEffect is invoked, it sees if email and password has changed
if it has been changed state setting function is called and button changes accordingly
*/

/*
Why do we need a timer ?
Example -> when sending request to server, we dont want to send request with every keystroke
So we have a timer that sents a request at every specified interval.
*/

/*
Since with every keyStroke email and password changes, useeffect will be triggered,
hence there will be lot of timers, so how to avoid that.

Using clean up function -> 
return () => {
	clearTimeout(identifier);
};

When for the first time component is rendered setState function will execute and
cleanup function will not execute. Then after every keystroke on input fields clean up function
will run first and clear the old or previously generated timer and again sets a new timer.

The cleanup function insures only one

setTimeout() is active (at a time).
*/

/*
Why does the cleanup function deletes the prev timer not the current one ->

useEffect()'s (return) cleanup function
is placed in a closure that runs immediately
when the next useEffect() runs,  or
just before "that" component unmounts.
*/

/*
Why object destructuring is needed

In the previous lecture, we used object destructuring to add object properties as dependencies to useEffect().

const { someProperty } = someObject;
useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty]);

key thing is NOT that we use destructuring but that we pass specific properties 
instead of the entire object as a dependency.

We could also write this code and it would work in the same way.

useEffect(() => {
  // code that only uses someProperty ...
}, [someObject.someProperty]);
This works just fine as well!

But you should avoid this code:

useEffect(() => {
  // code that only uses someProperty ...
}, [someObject]);
Why?

Because now the effect function would re-run whenever ANY property of someObject changes
- not just the one property (someProperty in the above example) our effect might depend on.

*/
