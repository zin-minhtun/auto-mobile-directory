import "./App.css";
import { Outlet } from "react-router-dom";
import './index.css';

function App() {
	return (
		<div className="App">
			<main>
				<Outlet />
				{/* This will render the child routes defined in your router */}
			</main>
		</div>
	);
}

export default App;
