import { Toaster } from "sonner";
import UserSearch from "./components/UserSearch";
function App() {
	return (
		<div className="container">
			<h1>Github Fonder</h1>
			<UserSearch />
			<Toaster />
		</div>
	);
}

export default App;
