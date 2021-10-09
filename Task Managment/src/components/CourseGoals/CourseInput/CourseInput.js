import React, { useState } from "react";
// import styled from "styled-components";
import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

// // Have two components in one file
// const FormControl = styled.div`
// 	margin: 0.5rem 0;

// 	& label {
// 		font-weight: bold;
// 		display: block;
// 		margin-bottom: 0.5rem;
// 		color: ${(props) => (props.invalid ? "red" : "black")};
// 	}

// 	& input {
// 		display: block;
// 		width: 100%;
// 		border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
// 		background: ${(props) => (props.invalid ? "rgb(252, 210, 210)" : "transparent")};
// 		font: inherit;
// 		line-height: 1.5rem;
// 		padding: 0 0.25rem;
// 	}

// 	& input:focus {
// 		outline: none;
// 		background: #fad0ec;
// 		border-color: #8b005d;
// 	}
// `;

const CourseInput = (props) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isValid, setIsValid] = useState(true);

	const goalInputChangeHandler = (event) => {
		//resets the style after user starts entering after an enter invalid input
		if (event.target.value.trim().length > 0) setIsValid(true);
		setEnteredValue(event.target.value);
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();

		//If the user enters only blanks, dont do anything
		if (enteredValue.trim().length === 0) {
			setIsValid(false);
			return;
		}

		props.onAddGoal(enteredValue);
	};

	return (
		<form onSubmit={formSubmitHandler}>
			<div className={`${styles["form-control"]} ${!isValid && styles.invalid}`}>
				<label>Course Goal</label>
				<input type="text" onChange={goalInputChangeHandler} />
			</div>
			<Button type="submit">Add Goal</Button>
		</form>
	);
};

export default CourseInput;

/*
Dynamically adding CSS properties using CSS modules 

<div className={`${styles["form-control"]} ${!isValid && styles.invalid}`}>
if condition is true add invalid class to form-control class

styles.form-control is not a valid method, so we use styles["front-control"]
All the psudeoselectors, nested classes, associated with .button class will also be imported
For example -> .form-control input:focus, .form-control label

*/

/*
Dynamically adding CSS properties using styled components

<FormControl invalidInput={!isValid}>    <-- one way 
	<label>Course Goal</label>
	<input type="text" onChange={goalInputChangeHandler} />
</FormControl>

Another way -->
<FormControl invalidInput={!isValid}>
color: ${(props) => (props.invalidInput ? "red" : "black")};

props recieves all values passed as in normal component
and since inside `` we can write JS expressions inside ${}, this works

(.form-control input -> & label
.form-control.invalid -> &.invalid)

*/

/*
Dynamically added CSS class

<div className={`form-control ${!isValid ? "invalid" : ""}`}>
    <label>Course Goal</label>
    input type="text" onChange={goalInputChangeHandler} />
</div>

`` ->template lietral, can hold strings
inside template lietral ${..} <- here we can write JS code 

in this case -> if true, add invalid class alongside form-control
else form-control and empty string string
*/
