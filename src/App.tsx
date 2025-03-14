import Card from "./components/Card";
import Header from "./components/Header"
import useCart from "./hooks/useCart"

function App() {
	const { products, loading, error } = useCart();
	return (
		<>
			<Header />
			<main>
				<div className="container mx-auto border grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 rounded-sm gap-4">
					{loading ? <p>Cargando...</p> : products.map(product => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</main>
		</>
	)
}

export default App
