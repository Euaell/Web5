import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout"
import Login from "./components/Login"
import Authenticate from "./components/Helpers/Authenticate";
import Home from "./components/Home";
import Customers from "./components/Customers";
import Devices from "./components/Devices";
import Bills from "./components/Bills";
import AddDevice from "./components/AddDevice";
import AddCustomer from "./components/AddCustomer";

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route element={<Authenticate />}>
				<Route path="/" element={<Layout />}>
					<Route path="home/" element={<Home />} >
						<Route path="customers" element={<Customers />} />
						<Route path="devices" element={<Devices />} />
						<Route path="bills" element={<Bills />} />
						<Route path="addDevice" element={<AddDevice />} />
						<Route path="addCustomer" element={<AddCustomer />} />
					</Route>
					<Route path="*" element={<h1>Landing</h1>} />
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
