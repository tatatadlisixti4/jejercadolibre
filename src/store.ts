import { create } from "zustand";
import { ItemsStorageResponseSchema, ItemType } from "./schemas";
/** Constantes */
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

/** Interface */
interface Store {
	items: ItemType[];
	addToCart: (item: ItemType, resta?: boolean) => void;
	removeToCart: (item: ItemType) => void;
	totalCompra: () => string;
	vaciarCarro: () => void;
}

/** Initial State Cart */
const initialItemsState = () => {
	if (localStorage.length) {
		const itemsStorage = localStorage.getItem("items");
		if (!itemsStorage) return [];
		try {
			const validateStorage = ItemsStorageResponseSchema.safeParse(
				JSON.parse(itemsStorage)
			);
			if (!validateStorage.success) return [];
			return validateStorage.data;
		} catch (error) {
			return [];
		}
	}
	return [];
};

/** Store */
export const useStore = create<Store>((set, get) => ({
	items: initialItemsState(),

	addToCart: (item, resta?) => {
		if (get().items.length >= 8) return;
		const itemExist = get().items.findIndex(
			(product) => product.id === item.id
		);
		if (itemExist >= 0) {
			let updatedCart: ItemType[] = [];
			if (resta) {
				if (get().items[itemExist].quantity <= MIN_ITEMS) {
					get().removeToCart(item);
					return;
				}
				updatedCart = get().items.map((product) =>
					product.id === item.id
						? { ...item, quantity: product.quantity - 1 }
						: product
				);
			} else {
				if (get().items[itemExist].quantity >= MAX_ITEMS) return;
				updatedCart = get().items.map((product) =>
					product.id === item.id
						? { ...item, quantity: product.quantity + 1 }
						: product
				);
			}
			set(() => ({
				items: updatedCart,
			}));
			return;
		}
		set(() => ({
			items: { ...get().items, item },
		}));
	},

	removeToCart: (item) => {
		const updatedCart = get().items.filter(
			(product) => product.id !== item.id
		);
		set(() => ({
			items: updatedCart,
		}));
	},

	totalCompra: () => {
		const resultado = get().items.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		});
		const total = formatter.format(resultado);
		return total;
	},
	vaciarCarro: () => {
		set(() => ({
			items: [],
		}));
	},
}));
