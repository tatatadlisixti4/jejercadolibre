import { useState } from "react";
import Cart from "./Cart";
import { ItemType } from "../schemas";

export default function Header({items, addToCart} : {items: ItemType[], addToCart: (item: ItemType) => void}) {
	const [cartState, setCartState] = useState(false);
	const handlerClick = () => {
		if(!cartState) {
			setCartState(true);
		} else {
			setCartState(false);
		}
	}
	return (
		<div className="bg-amber-300 px-5 py-3 mb-10 sticky top-0 flex flex-col gap-4 md:flex-row justify-between items-center">
			<div className="flex flex-col items-center md:flex-row md:items-center gap-2">
				<img src="/logo.svg" width={70} height={70} alt="logo" />
				<p className="font-bold text-2xl">JejercadoLibre</p>
			</div>
			<div 
				className="cursor-pointer relative"
				onClick={handlerClick}
			> 
				<img src="/cart.svg" width={50} height={50} alt="carro" />
				{cartState && (<Cart items={items} addToCart={addToCart}/>)}
			</div>
		</div>
	)
}
