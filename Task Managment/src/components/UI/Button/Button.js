import styles from "./Button.module.css";
// import styled from "styled-components";

// const Button = styled.button`
// 	font: inherit;
// 	padding: 0.5rem 1.5rem;
// 	border: 1px solid #8b005d;
// 	color: white;
// 	background: #8b005d;
// 	box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
// 	cursor: pointer;
//     width: 100%;

// 	&:focus {
// 		outline: none;
// 	}

// 	&:hover,
// 	&:active {
// 		background: #ac0e77;
// 		border-color: #ac0e77;
// 		box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
// 	}

//     @media (min-width : 768px) {
//         width: auto;
//     }
// `;

const Button = (props) => {
	return (
		<button type={props.type} className={styles.button} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default Button;

/* 
Styled Components -->
All the css we use are by default global, so we can acess any css class from any component
this can lead to errors in larger projects.
To avoid this, we use an external package called styled components, it makes css properties
unique to one individual component thus avoiding any clashes between two components 
though the css will still be global, but internally it specifies very unique names to css classes, 
thus avoiding clashes between two/more css classes in various components.


How it works ->
Styled components can be applied to any HTML element button, p, div, h2...etc

styled.button``(called - attacked templelate lietral) is somewhat similar to styled.button() --> It's a JS syntax
inside `` we can write multiple line argument as string

in this case -> `` inside we write the normal css code with modifications
we dont need to define any class, simply write the css syntax
for psudeoSelectors -> instead of button:hover, button:active 
use '&:_' like &:hover, &:active

all the css properties will be applied to the button element returned by the styled component
This will work the same as any normal button made by JSX
*/

/*
CSS Modules ->
Start by naming the css file as {fileName}.module.css

<button type={props.type} className={styles.button} onClick={props.onClick}>
Here we add our css classes by calling styles.{cssClassName}
our css has a class named .button, so we use this as -> styles.button to import
all the properties into the HTML button element.

All the psudeoselectors, media queries nested classes, associated with .button class will also be imported

Makes the css scoped to one component by making unique classNames as styled components
*/
