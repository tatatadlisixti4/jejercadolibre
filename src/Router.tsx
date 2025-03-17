import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import ProductView from "./components/ProductView";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Router() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter > 
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<App />} />
						<Route path="/:product" element={<ProductView />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
