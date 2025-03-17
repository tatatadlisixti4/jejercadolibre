import { create } from "zustand";
import { ItemsStorageResponseSchema, ItemType, ProductType, ResponseSchema } from "./schemas";
/** Constantes */
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

/** Interface */
interface Store {
	items: ItemType[];
	pagina: number;
	products: ProductType[];
	actualProduct: ProductType;
	addToCart: (item: ItemType, resta?: boolean) => void;
	removeToCart: (item: ItemType) => void;
	totalCompra: () => string;
	vaciarCarro: () => void;
	updateStorage: () => void;
	setPagina: (pagina: number) => void;
	setActualProduct: (product: ProductType) => void;
	setProducts: (products: ProductType[]) => void;
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

const initialProductsState = () => {
	if(localStorage.length) {
		const productStorage = localStorage.getItem("products");
		if(!productStorage) return [];
		try {
			const validateStorage = ResponseSchema.safeParse(JSON.parse(productStorage));
			if(!validateStorage.success) return [];
			return validateStorage.data; 
		} catch (error) {
			return [];
		}
	}
	return [];
}

/** Store */
export const useStore = create<Store>((set, get) => ({
	/** Paginador */
	pagina: 1,
	setPagina: (pagina) => {
		set(() => ({
			pagina,
		}));
	},
	/** Actual Product y Products*/
	actualProduct: {} as ProductType,
	setActualProduct: (product) => {
		set(() => ({
			actualProduct: product,
		}));
	},
	products: initialProductsState(),
	setProducts: (products) => {
		set(() => ({
			products
		}));
		localStorage.setItem("products", JSON.stringify(products));
	},
	/** Cart */
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
			get().updateStorage();
			return;
		}
		set(() => ({
			items: [...get().items, item],
		}));
		const aux = get().items;
		get().updateStorage();
	},

	removeToCart: (item) => {
		const updatedCart = get().items.filter(
			(product) => product.id !== item.id
		);
		set(() => ({
			items: updatedCart,
		}));
		get().updateStorage();
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
		get().updateStorage();
	},

	updateStorage: () => {
		const itemsStorage = JSON.stringify(get().items);
		localStorage.setItem("items", itemsStorage);
	},
}));
