import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
	const [isEditing, setIsEditing] = useState(false);

	const saveExpenseDataHandler = (enteredExpenseData) => {
		const expenseData = {
			// copies the new expense data entered in expenseform.js
			...enteredExpenseData,
			id: Math.random().toString(),
		};

		//lifting the data from child to parent(app.js)
		props.onAddExpense(expenseData);
		//hide the form after submiting
		setIsEditing(false);
	};

	const startEditingHandler = () => {
		setIsEditing(true);
	};

	const stopEditingHandler = () => {
		setIsEditing(false);
	};

	return (
		<div className="new-expense">
			{!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
			{isEditing && (
				<ExpenseForm
					onSaveExpenseData={saveExpenseDataHandler}
					onClickCancel={stopEditingHandler}
				/>
			)}
		</div>
	);
};

export default NewExpense;

// condition && command -> In JS, if condition is true, the command after && is executed
