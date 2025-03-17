import { useEffect, useState } from "react";
import Card from "./components/Card";
import { useStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { ProductType, ResponseSchema } from "./schemas";

/** Función para obtener productos */
async function getProducts() {
	try {
		const req = await fetch("https://fakestoreapi.com/products/", {
			headers: {
				"Content-Type": "application/json"
			}
		});
		const json = await req.json();
		if (!req.ok) throw new Error(`Error: ${req.status}`);
		const products = ResponseSchema.parse(json);
		return products;
	} catch (error) {
		throw error instanceof Error ? error.message : 'Error inesperado';
	}
}

/** Componente React */
function App() {
	/** States iniciales */
	const [products, setProducts] = useState<ProductType[]>([])
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	/** Query */
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryFn: getProducts,
		queryKey: ['products'],
	})

	/** Manejo resultados query */
	useEffect(() => {
		if (isLoading) return setLoading(true);
		if (isError) return setError("Ha ocurrido un problema con la consulta");
		if (isSuccess) {
			setProducts(data);
			setLoading(false);
		}
	}, [data, isLoading, isError, isSuccess]);

	/** Paginación */
	const pagina = useStore(state => state.pagina);
	const setPagina = useStore(state => state.setPagina);
	const [skip, setSkip] = useState(1);
	const TOTAL_PRODUCTOS = products.length;
	const PRODUCTOS_POR_PAGINA = 6;
	const PAGINAS = Math.ceil(TOTAL_PRODUCTOS / PRODUCTOS_POR_PAGINA);
	const productsSlice = products.slice(skip - 1, PRODUCTOS_POR_PAGINA + skip - 1);

	/** Update Skip */
	useEffect(() => {
		const updateSkip = (PRODUCTOS_POR_PAGINA * (pagina - 1)) + 1;
		setSkip(updateSkip);
	}, [pagina])

	/** Paginación dinámica */
	function paginacion(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): number {
		const button = e.target as HTMLButtonElement;
		const paginaActual = button.textContent;
		setPagina(+paginaActual!)
		return 0
	}
	/** Renderizado */
	if(error) return (<p className="container mx-auto mt-10 w-fit">Hubo un error en la consulta</p>);
	return (
		<>
			<main>
				<div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 gap-4">
					{loading ?
						(<p className="font-bold">Cargando...</p>)
						: productsSlice.map (
							product => (
								<Card
									key={product.id}
									product={product}
								/>
							)
						)
					}
				</div>
			</main>
			<div className="container mx-auto flex gap-4 mt-10 w-fit">
				{Array.from({ length: PAGINAS }, (_, index) => (
					<button
						key={index}
						className={index + 1 === pagina ? "px-2 py-1 border-2 bg-green-400 rounded-sm cursor-pointer" : "px-2 py-1 border-2 rounded-sm cursor-pointer"}
						onClick={e => paginacion(e)}
					>{index + 1}</button>
				))}
			</div>
		</>
	)
}

export default App
