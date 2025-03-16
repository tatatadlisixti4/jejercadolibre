import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header"
import useProduct from "./hooks/useProduct"

function App() {
	const { products, loading, error , addToCart, items, removeToCart, totalCompra, vaciarCarro} = useProduct();
	const [pagina, setPagina] = useState(1);
	const [skip, setSkip] = useState(1);
	
	const TOTAL_PRODUCTOS = products.length;
	const PRODUCTOS_POR_PAGINA = 6;
	const PAGINAS = Math.ceil(TOTAL_PRODUCTOS / PRODUCTOS_POR_PAGINA);
	console.log(PAGINAS);
	
	const productsSlice = products.slice(skip - 1, PRODUCTOS_POR_PAGINA + skip - 1);
	

	useEffect(() => {
		const updateSkip = ( PRODUCTOS_POR_PAGINA * (pagina - 1 ) ) + 1;
		setSkip(updateSkip);
	}, [pagina])
	

	function renderizarProductos (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) : number {
		const button = e.target as HTMLButtonElement;
		const paginaActual = button.textContent;
		setPagina(+paginaActual!)
		return 0
	}
	return (
		<>
			<Header 
				items={items} 	
				addToCart={addToCart} 
				removeToCart={removeToCart}
				totalCompra={totalCompra}
				vaciarCarro={vaciarCarro}
			/>
			<main>
				<div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 gap-4">
					{loading ? <p>Cargando...</p> : productsSlice.map(product => (
						<Card 
							key={product.id} 
							product={product} 
							addToCart={addToCart} 
						/>
					))}
				</div>
				
			</main>
			<div className="container mx-auto flex gap-4 mt-10 w-fit">
				{Array.from({length: PAGINAS}, (_, pagina) => (
					<button 
						key={pagina}	
						className="px-2 py-1 border-2 rounded-sm cursor-pointer"
						onClick={e => renderizarProductos(e)}
					>{pagina+1}</button>
				))}
			</div>
		</>
	)
}

export default App
