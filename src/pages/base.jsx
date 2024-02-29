
import Navigation from "../components/nav";
import { Outlet } from "react-router-dom";

function Base() {
	return (
		<>
			<Navigation />
			<Outlet/>
		</>
	);
}

export default Base;
