import { ProductType } from "../schemas"

type CardProps = {
	product: ProductType
}
export default function Card({ product }: CardProps) {
	console.log(product);
	return (
		<div className="flex flex-col justify-center items-center max-w-xs w-full mx-auto p-4 border rounded-sm cursor-pointer">
			<div className="w-[120px] h-[180px] ">
				<img 
					src={`${product.image}`} 
					alt="Imagen del producto" 
					className="w-full h-full"
				/>
			</div>
			<div className="text-center">
				<p>{product.title}</p>
				<p>{product.price}</p>
			</div>
		</div>
	)
}
