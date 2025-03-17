import { ItemType } from "../schemas"
import { useStore } from "../store";


export default function Cart() {
	const items = useStore(state => state.items);
	const addToCart = useStore(state => state.addToCart);
	const removeToCart = useStore(state => state.removeToCart);
	const totalCompra = useStore(state => state.totalCompra);
	const vaciarCarro = useStore(state => state.vaciarCarro);

	function handlerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ItemType) {
		e.stopPropagation();
		const button = e.target as HTMLButtonElement;
		if (button.textContent === "+") {
			addToCart(item);
			return;
		}
		addToCart(item, true);
	}

	function handlerRemoveButton(e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: ItemType) {
		e.stopPropagation();
		removeToCart(item);
	}

	function handlerVaciarCarro (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.stopPropagation();
		vaciarCarro()
	}

	return (
		<div className="absolute top-15 right-[-240px] md:right-4 w-full max-w-[510px] min-w-[510px] border bg-amber-50 px-4 py-2 rounded-sm space-y-4">
			{items.length ? (
				<>

					<div className="flex space-x-13 font-bold ">
						<p>Imagen</p>
						<p>Nombre</p>
						<p>Precio</p>
						<p>Cantidad</p>

					</div>

					<div className="flex flex-col gap-7">
						{items.map(item => (
							<div
								key={item.id}
								className="flex gap-6 items-center"
							>
								<img className="w-[50px] h-[50px]" src={`${item.image}`} alt="imagen item" />

								<p className="w-full max-w-[130px] min-w-[130px] truncate">{item.title}</p>

								<p className="w-[70px]">$ {item.price}</p>

								<div className="flex gap-2 items-center">
									<button
										className="cursor-pointer border px-3 rounded-sm"
										onClick={e => handlerClick(e, item)}
									>+</button>
									<p>{item.quantity}</p>
									<button
										className="cursor-pointer border px-3 rounded-sm"
										onClick={e => handlerClick(e, item)}
									>-</button>
								</div>

								<img
									src="/remove.svg" alt="remove icon"
									className="w-[50px] h-[50px]"
									onClick={e => handlerRemoveButton(e, item)}
								/>
							</div>
						))}
					</div>

					<div className="flex justify-between items-center">
						<p className="font-bold">Total: { totalCompra() }</p>
						<button 
							className="border-2 border-red-700 px-2 py-1 rounded-sm bg-red-400 text-white font-bold"
							onClick={(e) => handlerVaciarCarro(e)}
						>Vaciar</button>
					</div>
				</>
			) : (
				<p className="text-center text-sm font-bold p-6">Carro Vacío</p>
				
			)}
		</div>
	)
}
