import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
	const [enteredUserName, setEnteredUserName] = useState("");
	const [enteredAge, setEnteredAge] = useState("");
	// We dont have any initial state of error, so error = null or undefined
	const [error, setError] = useState();

	const userNameChangeHandler = (event) => {
		setEnteredUserName(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value);
	};

	const addUserHandler = (event) => {
		event.preventDefault();

		if (enteredUserName.trim().length === 0 || +enteredAge.trim().length === 0) {
			setError({
				title: "Invalid Input",
				message: "Please enter a valid name and age (non-empty values).",
			});
			return;
		}

		if (+enteredAge < 1) {
			setError({
				title: "Invalid Age",
				message: "Please enter a valid age (> 0).",
			});
			return;
		}

		// lifting the state up
		props.onAddUser(enteredUserName, enteredAge);

		//clears the input area after form submits
		setEnteredUserName("");
		setEnteredAge("");
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<div>
			{/* if error exists(not null or notundefined) only then render ErrorModal */}
			{error && (
				<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
			)}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={enteredUserName}
						onChange={userNameChangeHandler}
						autoComplete="off"
					/>
					<label htmlFor="age">Age (in Years)</label>
					<input
						id="age"
						type="number"
						step="1"
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;

/*
Why does the backdrop works?

{error && ( <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />)}
<Card form />

when error is triggered in the first line, the flow of proram is directed towards
the ErrorModal component, which stops the flow from reaching the form component.

Inside the errormodal component when the user clicks on the backdrop or okay button, 
it triggers the onConfirm prop -> it calls the errorHandler function -> which sets the error to null/undef

now since error is null, flow resumes back to the form component and we can access it
*/
