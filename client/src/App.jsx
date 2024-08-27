import "./App.css";
import { Outlet } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
	return (
		<div className="App">
			<main>
				<AuthProvider>
					<Outlet />
				</AuthProvider>
			</main>
		</div>
	);
}

export default App;
