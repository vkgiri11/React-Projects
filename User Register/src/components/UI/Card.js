import classes from "./Card.module.css";

const Card = (props) => {
	return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default Card;

/*
Since card is our own component not like the default html so we
need to add any extra classes by our own.
The card wrapper has classes.card of its own, and also classes.input
from the addUser.js

props.className -> attaches all the css classes of the addUser component
*/
