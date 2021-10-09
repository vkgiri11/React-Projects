import Card from "../UI/Card";
import classes from "./UserLists.module.css";

const UserLists = (props) => {
	return (
		<Card className={classes.users}>
			<ul>
				{props.users.map((user) => (
					// Every list created should have unique id
					<li key={user.id}>
						{user.name} ({user.age} years Old)
					</li>
				))}
			</ul>
		</Card>
	);
};

export default UserLists;
