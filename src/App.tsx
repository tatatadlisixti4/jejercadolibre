import { useEffect, useState } from "react";
import Card from "./components/Card";
import useProduct from "./hooks/useProduct"
import { useStore } from "./store";

function App() {
	const { products, loading, error } = useProduct();
	const pagina = useStore(state => state.pagina);
	const setPagina = useStore(state => state.setPagina);
	//const [pagina, setPagina] = useState(1);

	const [skip, setSkip] = useState(1);
	
	const TOTAL_PRODUCTOS = products.length;
	const PRODUCTOS_POR_PAGINA = 6;
	const PAGINAS = Math.ceil(TOTAL_PRODUCTOS / PRODUCTOS_POR_PAGINA);
	
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
			<main>
				<div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 gap-4">
					{loading ? <p>Cargando...</p> : productsSlice.map(product => (
						<Card 
							key={product.id} 
							product={product} 
						/>
					))}
				</div>
				
			</main>
			<div className="container mx-auto flex gap-4 mt-10 w-fit">
				{Array.from({length: PAGINAS}, (_, index) => (
					<button 
						key={index}	
						className={index + 1 === pagina ? "px-2 py-1 border-2 bg-green-400 rounded-sm cursor-pointer": "px-2 py-1 border-2 rounded-sm cursor-pointer"}
						onClick={e => renderizarProductos(e)}
					>{index+1}</button>
				))}
			</div>
		</>
	)
}

export default App
