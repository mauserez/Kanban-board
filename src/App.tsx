import "./App.css";
import { Kanban } from "./features/Kanban/Kanban";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Kanban />
		</BrowserRouter>
	);
}

export default App;
