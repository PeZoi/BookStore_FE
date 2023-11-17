import { ParameterDigital } from "./components/ParameterDigital";
import { Chart } from "./components/Chart";
import RequireAdmin from "./RequireAdmin";

const Dashboard = () => {
	return (
		<div>
			<ParameterDigital />
			<Chart />
		</div>
	);
};

const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;
