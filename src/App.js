import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout"
import Login from "./components/Login"
import Authenticate from "./components/Helpers/Authenticate";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route element={<Authenticate />}>
				<Route path="/" element={<Layout />}>
					<Route path="home" element={<Home />} />
				</Route>
			</Route>
			<Route path="*" element={<h1>404: Not Found</h1>} />
		</Routes>
    </BrowserRouter>
    // <div className="App">
		// <Login />
    // </div>
  );
}

export default App;
