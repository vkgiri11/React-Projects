import useInput from "./hooks/use-input";

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput((value) => value.trim() !== "");

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInput((value) => value.includes("@"));

	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const onFormSubmitHandler = (event) => {
		event.preventDefault();

		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
	const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

	return (
		<form onSubmit={onFormSubmitHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					autoComplete="off"
					value={enteredName}
					onBlur={nameChangeHandler}
					onChange={nameBlurHandler}
				/>
				{nameInputHasError && <p className="error-text">Name must not be empty.</p>}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					autoComplete="off"
					value={enteredEmail}
					onBlur={emailBlurHandler}
					onChange={emailChangeHandler}
				/>
				{emailInputHasError && <p className="error-text">Please enter a valid email.</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
