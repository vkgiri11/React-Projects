import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {}, //just for IDE auto-completion
	onLogin: (email, password) => {}, // dummy functions
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedLoginInfo = localStorage.getItem("isLogged");
		if (storedLoginInfo === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = () => {
		// We should of course check email and password But it's just a dummy/ demo anyways
		localStorage.setItem("isLogged", "1"); // 1->loggedIn, 0->Logged out
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem("isLogged");
		setIsLoggedIn(false);
	};
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}} 
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

/*
AuthContext is a object that contains components

createcontext({..}) -> contains initial state
*/


/*
Anything wrapped between AuthContext.Provider will now have the access
to authcontext. In our case, mainHeader and Login, even the children(/children of childrens) of
these components can access AuthContext.

<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
			}}
		>

value -> passes the data that is used by any copmonent/children of comp.
In this case it passes a object(isLogged -> state,  logoutHandler -> func)

**This name 'value' is given by react, we cant use any other name for that
*/

/*
const storedLoginInfo = localStorage.getItem("isLogged");
if (storedLoginInfo === "1") {
	setIsLoggedIn(true);
}

if the user has logged in earlier, in the local Storage "1" is stored, so when user returns,
storedLoginInfo is 1 already, so setIsLoggedIn sets the value as true. 
BUT, whenever a state setting function is called, the component function is run again, so the
app() func re-runs and creates a infinte loop.

Thats why we use useEffect Hook.
*/

/*
Working of useEffect -> 

useEffect runs at the last the component has been rendered completely.
So first time it runs, sees that user had alrready logged in, calls the state
setting function, app runs again and after that useEffect is called again.

Use effect will be called only when dependency changes. Here we have empty array as
depen. so the first time when it was called it worked, but since our dependency is
still an empty array (in the second time), useEffect is not called. since our 
depen. didn't change.
*/
