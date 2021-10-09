import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserLists from "./components/Users/UserLists";

function App() {
	const [userLists, setUserLists] = useState([]);

	const onAddUserHandler = (uName, uAge) => {
		// We take the old list and copy the new user, hence using prevState
		setUserLists((prevUserLists) => {
			return [...prevUserLists, { name: uName, age: uAge, id: Math.random().toString() }];
		});
	};

	return (
		<div>
			<AddUser onAddUser={onAddUserHandler} />
			{/* Userlists have keys -> name, age, id */}
			<UserLists users={userLists} />
		</div>
	);
}

export default App;
