import { Route, Routes, Navigate } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";
import Welcome from "./components/Welcome";

function App() {
	return (
		<div>
			<header>
				<MainHeader />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Navigate replace to="/welcome" />} />
					<Route path="/welcome/*" element={<Welcome />}>
						<Route path="new-user" element={<p>Welcome New User </p>} />
					</Route>
					<Route path="/products" element={<Products />} />
					<Route path="/products/:productId" element={<ProductDetail />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;

//replace -> replaces the page
// witgout replace -> it just pushes the page on the navigation stack
