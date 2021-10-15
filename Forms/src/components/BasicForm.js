import useInput from "./hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameInputHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstNameInput,
	} = useInput(isNotEmpty);

	const {
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameInputHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastNameInput,
	} = useInput(isNotEmpty);

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInput(isEmail);

	let formIsValid = false;
	if (firstNameIsValid && lastNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log("Submitted !!");
		console.log(firstNameValue, lastNameValue, emailValue);

		resetFirstNameInput();
		resetLastNameInput();
		resetEmailInput();
	};

	const firstNameClasses = firstNameInputHasError ? "form-control invalid" : "form-control";
	const lastNameClasses = lastNameInputHasError ? "form-control invalid" : "form-control";
	const emailClasses = emailInputHasError ? "form-control invalid" : "form-control";

	return (
		<form onSubmit={formSubmitHandler}>
			<div className="control-group">
				<div className={firstNameClasses}>
					<label htmlFor="name">First Name</label>
					<input
						type="text"
						id="name"
						autoComplete="off"
						value={firstNameValue}
						onBlur={firstNameBlurHandler}
						onChange={firstNameChangeHandler}
					/>
					{firstNameInputHasError && (
						<p className="error-text">First Name must not be empty</p>
					)}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor="name">Last Name</label>
					<input
						type="text"
						id="name"
						autoComplete="off"
						value={lastNameValue}
						onBlur={lastNameBlurHandler}
						onChange={lastNameChangeHandler}
					/>
					{lastNameInputHasError && (
						<p className="error-text">Last Name must not be empty</p>
					)}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="name">E-Mail Address</label>
				<input
					type="text"
					id="name"
					autoComplete="off"
					value={emailValue}
					onBlur={emailBlurHandler}
					onChange={emailChangeHandler}
				/>
				{emailInputHasError && <p className="error-text">Enter valid email</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
