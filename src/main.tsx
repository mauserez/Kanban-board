import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "reset-css/reset.css";
import "normalize-css/normalize.css";
import "@fontsource/roboto/400.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
