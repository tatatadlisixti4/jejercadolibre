/** Schemas */
import { z } from "zod";
export const ProductSchema = z.object({
	id: z.number(),
	title: z.string(),
	price: z.number(),
	description: z.string(),
	category: z.string(),
	image: z.string(),
});
export const ResponseSchema = z.array(ProductSchema);
export const ItemsStorageResponseSchema = z.array(
	ProductSchema.pick({
		id: true,
		image: true,
		title: true,
		price: true,
	}).extend({
		quantity: z.number(),
	})
).min(0).max(8);

/** Types */
export type ProductType = z.infer<typeof ProductSchema>;
export type ItemType = Pick<ProductType, "id" | "image" | "title" | "price"> & {
	quantity: number;
};
