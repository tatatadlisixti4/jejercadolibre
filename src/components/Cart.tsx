import { ItemType } from "../schemas"

type CartProps = {
	items: ItemType[];
	addToCart: (item: ItemType) => void
}

export default function Cart({ items, addToCart }: CartProps) {

	function handlerClick(e : React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ItemType) {
		e.stopPropagation();
		const button = e.target as HTMLButtonElement;
		if(button.textContent === "+") addToCart(item);
	}
	return (
		<div className="absolute w-full max-w-[450px] min-w-[450px] right-4 border bg-amber-50 px-4 py-2 rounded-sm space-y-4">
			<div>
				<div className="flex space-x-15 font-bold ">
					<p>Imagen</p>
					<p>Nombre</p>
					<p>Precio</p>
					<p>Cantidad</p>

				</div>
			</div>
			<div className="flex flex-col gap-7">
				{items.map(item => (
					<div 
						key={item.id} 
						className="flex gap-6 items-center"
					>
						<img className="w-[50px] h-[50px]" src={`${item.image}`} alt="imagen item" />

						<p className="w-full max-w-[130px] min-w-[130px] truncate">{item.title}</p>

						<p className="w-[60px]">$ {item.price}</p>
					
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
					</div>
				))}
			</div>
		</div>
	)
}
