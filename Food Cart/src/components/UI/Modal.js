import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onCloseCart}></div>;
};
const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const Modal = (props) => {
	const portalElements = document.getElementById("overlays");

	return (
		<Fragment>
			{ReactDOM.createPortal(<BackDrop onCloseCart={props.onCloseCart} />, portalElements)}
			{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElements)}
		</Fragment>
	);
};

export default Modal;
