import { Link } from "react-router-dom";

const Products = () => {
	return (
		<section>
			<h1>The Products Page</h1>
			<ul>
				<li>
					<Link to="/products/p1">Book</Link>
				</li>
				<li>
					<Link to="/products/p2">Carpet</Link>
				</li>
				<li>
					<Link to="/products/p3">Football</Link>
				</li>
			</ul>
		</section>
	);
};

export default Products;

//useHistory is replaced by useNavigate
