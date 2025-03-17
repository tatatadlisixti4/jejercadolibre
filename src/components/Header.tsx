import { useState } from "react";
import Cart from "./Cart";
import { useStore } from "../store";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
	const [cartState, setCartState] = useState(false);
	const location = useLocation();
	const navigation = useNavigate();
	const setPagina = useStore(state => state.setPagina);
	function handlerClick() {
		if (!cartState) {
			setCartState(true);
		} else {
			setCartState(false);
		}
	}
	function handlerRedirect() {
		if(location.pathname === "/") { 
			setPagina(1);
			return; 
		}
		navigation("/");
	}
	return (
		<div className="bg-amber-300 px-5 py-3 mb-10 sticky top-0 flex flex-col gap-4 md:flex-row justify-between items-center">
			<div
				className="flex flex-col items-center md:flex-row md:items-center gap-2 cursor-pointer"
				onClick={handlerRedirect}
			>
				<img src="/logo.svg" width={70} height={70} alt="logo" />
				<p className="font-bold text-2xl">JejercadoLibre</p>
			</div>
			<div
				className="cursor-pointer relative"
				onClick={handlerClick}
			>
				<img src="/cart.svg" width={50} height={50} alt="carro" />
				{cartState && (
					<Cart />
				)}
			</div>
		</div>
	)
}
