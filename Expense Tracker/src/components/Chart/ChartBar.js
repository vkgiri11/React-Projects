import "./ChartBar.css";

const ChartBar = (props) => {
	let barFillHeight = "0%";

	if (props.maxValue > 0) {
		barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
	}

	return (
		<div className="chart-bar">
			<div className="chart-bar__inner">
				<div className="chart-bar__fill" style={{ height: barFillHeight }}></div>
			</div>
			<div className="chart-bar__label">{props.label}</div>
		</div>
	);
};

export default ChartBar;

/*
Adding CSS class dynamically ->
div className="chart-bar__fill" style={{height: barFillHeight, backgroundColor: 'red'}}></div>

inside style property, outer curly braces is to notify a JS expression
inner curly braces is for object being passed, the object contains
key-value pairs in which keys are CSS properties to be added with their values

*/
