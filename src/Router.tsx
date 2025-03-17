import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import ProductView from "./components/ProductView";
import Layout from "./components/Layout";

export default function Router() {
	return (
		<BrowserRouter> 
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<App />} />
					<Route path="/:product" element={<ProductView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
