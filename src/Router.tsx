import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import ProductView from "./components/ProductView";

export default function Router() {
	return (
		<BrowserRouter> 
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/:product" element={<ProductView />} />
			</Routes>
		</BrowserRouter>
	)
}
