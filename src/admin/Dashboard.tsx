import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
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
