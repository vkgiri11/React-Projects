import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	const [enteredDate, setEnteredDate] = useState("");

	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
	};

	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const submitHandler = (event) => {
		// prevents the form from submiting to server and reloading
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: +enteredAmount,
			date: new Date(enteredDate),
		};

		// Method to lift data up from child(expressform.js) to parent(newexpense.js)
		props.onSaveExpenseData(expenseData);

		// after the form is submitted, clears the value in input fields
		setEnteredTitle("");
		setEnteredAmount("");
		setEnteredDate("");
	};

	return (
		<form onSubmit={submitHandler}>
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="text"
						value={enteredTitle} // -> Two way binding
						placeholder="Enter Expense title"
						onChange={titleChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						type="number"
						min="1"
						step="0.1"
						placeholder="Enter Expense Amount"
						value={enteredAmount}
						onChange={amountChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="date"
						min="2017-01-01"
						max="2024-12-31"
						value={enteredDate}
						onChange={dateChangeHandler}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button type="button" onClick={props.onClickCancel}>
					Cancel
				</button>
				<button type="submit">Add Expense</button>
			</div>
		</form>
	);
};

export default ExpenseForm;

/*
===================== Multiple changes in One State ====================

Multiple changes in one state, uses object to store Initial values
const [userInput, setUserInput] = useState({
	enteredTitle: "",
	enteredAmount: "",
	enteredDate: "",
});

const titleChangeHandler = (event) => {
	setUserInput({
        ...userInput,     
        enteredTitle : event.target.value 
    })
};
const AmountChangeHandler = (event) => {
    setUserInput({
        ...userInput,
        enteredAmount : event.target.value 
    })
};
const DateChangeHandler = (event) => {
    setUserInput({
        ...userInput,
        enteredDate : event.target.value 
    })
};

since we want to change only one value, in order to not loose the other two
with the spread operator we first copy all the intital values and then
override the individual ones


const AmountChangeHandler = (event) => {
    setUserInput((prevState) => {
        return {...prevState, enteredAmount : event.target.value}
    })
};

Why to use this method instead of the prev one...?
-> Since our values depend on the previous state, and react basically 
waits for the state change to happen, there can be multiple previous states,
hence using this prevState, we ensure only the immediate previous state values are used



When adding multiple values, those values are added as strings instead of numbers.
Fixing it is easy though, simply make sure you enforce a number conversion:

amount: enteredAmount, --> amount: +enteredAmount,
+ -> somewhat similar to parseINT()
*/
