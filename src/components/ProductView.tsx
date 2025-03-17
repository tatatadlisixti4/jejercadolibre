import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"

export default function ProductView() {
	const navigate = useNavigate();
	const { product } = useParams();
	useEffect(() => {
		if (!product) {
			navigate("/");
			return;
		}
		const productId = Number(product);
		if (isNaN(productId) || productId < 1 || !Number.isInteger(productId)) navigate("/");
	}, [navigate, product]);

	const productId = product ? Number(product) : 0;
	if(isNaN(productId)) return; // ?

	return (
		<div className="container mx-auto w-full">

		</div>
	)
}
