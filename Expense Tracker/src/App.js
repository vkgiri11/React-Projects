import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		title: "Phone",
		amount: 15000,
		date: new Date(2020, 7, 14),
	},
	{ id: "e2", title: "New TV", amount: 8000, date: new Date(2021, 2, 12) },
	{
		id: "e3",
		title: "Books",
		amount: 700,
		date: new Date(2021, 2, 28),
	},
	{
		id: "e4",
		title: "New Desk",
		amount: 4500,
		date: new Date(2021, 5, 12),
	},
];

function App() {
	const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

	// The new expense data added in form is recieved in new_expense
	const addExpenseHandler = (new_expense) => {
		setExpenses((prevExpenses) => {
			return [new_expense, ...prevExpenses];
		});
	};

	return (
		<div>
			<NewExpense onAddExpense={addExpenseHandler} />
			<Expenses items={expenses} />
		</div>
	);
}

export default App;
