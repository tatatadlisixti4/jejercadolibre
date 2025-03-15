import Card from "./components/Card";
import Header from "./components/Header"
import useProduct from "./hooks/useProduct"

function App() {
	const { products, loading, error , addToCart, items} = useProduct();
	return (
		<>
			<Header items={items} />
			<main>
				<div className="container mx-auto border grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 rounded-sm gap-4">
					{loading ? <p>Cargando...</p> : products.map(product => (
						<Card key={product.id} product={product} addToCart={addToCart} />
					))}
				</div>
			</main>
		</>
	)
}

export default App
