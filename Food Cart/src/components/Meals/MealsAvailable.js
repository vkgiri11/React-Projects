import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./MealsAvailable.module.css";

const MealsAvailable = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://react-food-cart-cebf5-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something Went Wrong...!!!");
			}

			const responseData = await response.json();

			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<Card>
					<p>Loading...</p>
				</Card>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	if (httpError) {
		return (
			<section className={classes.mealsError}>
				<Card>
					<p>{httpError}</p>
				</Card>
			</section>
		);
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default MealsAvailable;

/*

with useEffect -> cant use async funcn directly, hence we create another func, and
provide the async in that nested funcn


why we didnt use try and catch -> fetchMeals().catch

fetchMeals is a async func, it always returns a promise,
Now, if we throw an error instead of a promise,
that error will cause that promise to reject.
So we can't use try-catch to wrap it.


*/
