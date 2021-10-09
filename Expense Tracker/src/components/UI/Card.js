import "./Card.css";

// Wrapper component
function Card(props) {
    const classes = "card " + props.className;
	return <div className={classes}>{props.children}</div>;
}

export default Card;


/*
for a custom wrapper component like "Card", doesnt works in the same way as
normal HTML components, anythinh between the opening and cosing tag of
wrapper component wont function until we have {props.children} in the wrapper
funcyion. "children" is a reserved name in built in react.

The value of props.children is everything between 
opening and closing tags of custom wrapper class 
*/

/*
classes append the wrapper component class and also all the other classes that 
are assigned to the component around which wrapper component is used

For Example ->
In ExpenseItem.js the card component has a class called expense-item
so const classes = "card expense-item"
&
In Expenses.js the card component has a class called expenses
so const classes = "card expenses"


and so the styles of all the classes are applied
*/