import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	//Provide the client to your app
	<QueryClientProvider client={queryClient}>
		<StrictMode>
			<App />
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
		</StrictMode>
	</QueryClientProvider>,
);
