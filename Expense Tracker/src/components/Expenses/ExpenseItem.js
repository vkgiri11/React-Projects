import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "../UI/Card";

// React Component
function ExpenseItem(props) {
	return (
		<li>
			{/* The component is wrapped around a shell called "card" */}
			<Card className="expense-item">
				<ExpenseDate date={props.date} />
				<div className="expense-item__description">
					<h2>{props.title}</h2>
					<div className="expense-item__price">{props.amount}</div>
				</div>
			</Card>
		</li>
	);
}

export default ExpenseItem;
