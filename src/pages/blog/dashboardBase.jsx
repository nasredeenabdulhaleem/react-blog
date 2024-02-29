
import DashNavigation from "../../components/dashNav";
import { Outlet } from "react-router-dom";

function DashboardBase() {
	return (
		<>
			<DashNavigation />
			<Outlet/>
		</>
	);
}

export default DashboardBase;
