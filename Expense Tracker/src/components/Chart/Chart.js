import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
	const dataPointsValues = props.dataPoints.map((dataPoint) => dataPoint.value);
	const totalMaximum = Math.max(...dataPointsValues);

	return (
		<div className="chart">
			{props.dataPoints.map((dataPoint) => (
				<ChartBar
					key={dataPoint.label}
					value={dataPoint.value}
					maxValue={totalMaximum}
					label={dataPoint.label}
				/>
			))}
		</div>
	);
};

export default Chart;

/*
converting an array of objects to array of values
object can have many key-value pairs, but here we want only 
to have values to be stored in our dataPointsValues array
(values = total sum of amount for a given month)

const dataPointsValues = props.dataPoints.map(dataPoint => dataPoint.value);

storing max value(sum of amount) across all months
max() takes argument as max(1,2,3,4,.....) but we have an array
so spread operator converts array to stanadlone points

const totalMaximum = Math.max(...dataPointsValues)

maxValue for any chart is the maximum sum of amount spend across all months for a given year

inside chartbar.js for every month -> the barfillheight is a percent of this maxValue
*/
