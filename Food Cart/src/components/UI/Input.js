import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;

/*
<input {...props.input} />

this line copies all the key value pair associated with props.input
Ex-> <input id: "amount" type: "number" min: "1" .............> 

now since input tag supports these attrs. it works
*/
