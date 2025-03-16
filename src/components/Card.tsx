import { ItemType, ProductType } from "../schemas"

type CardProps = {
	product: ProductType,
	addToCart: (item: ItemType) => void
}

export default function Card({ product, addToCart }: CardProps) {
	const handlerClick = () => {
		const { id, image, title, price, ...resto } = product;
		addToCart({
			id,
			image,
			title,
			price,
			quantity: 1
		})
	}
	return (
		<div className="flex flex-col justify-center items-center max-w-xs w-full mx-auto p-4 border-2 bg- rounded-sm ">
			<div className="w-[120px] h-[180px] ">
				<img
					src={`${product.image}`}
					alt="Imagen del producto"
					className="w-full h-full"
				/>
			</div>
			<div className="text-center w-full">
				<p className="truncate">{product.title}</p>
				<p>{product.price}</p>
			</div>
			<button
				className="px-2 py-1 bg-blue-300 border rounded-sm cursor-pointer "
				onClick={handlerClick}
			>Agregar</button>
		</div>
	)
}
