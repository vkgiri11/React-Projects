import { Fragment } from "react";

import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartIcon from "./HeaderCartIcon";

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>Flamin Pan</h1>
				<HeaderCartIcon onClick={props.onShowCart} />
			</header>
			<div className={classes["main-image"]}>
				<img
					src={mealsImage}
					aria-hidden
					alt="An Image of table full of delicious food! "
				/>
			</div>
		</Fragment>
	);
};

export default Header;
