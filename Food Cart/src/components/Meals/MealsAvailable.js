import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./MealsAvailable.module.css";

const DUMMY_MEALS = [
	{
		id: "m1",
		name: "Lasagna",
		description: "Chicken and Cheese",
		price: 250,
	},
	{
		id: "m2",
		name: "Swagat Briyani",
		description: "A Lost Specialty!",
		price: 150,
	},
	{
		id: "m3",
		name: "Toms Burger & Cheese Cake",
		description: "Heavenly, exquisite, soothing",
		price: 333,
	},
	{
		id: "m4",
		name: "Mexican Shawarma",
		description: "Healthy...and tempting...",
		price: 150,
	},
];

const MealsAvailable = () => {
	const mealsList = DUMMY_MEALS.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default MealsAvailable;
