/*display all the elements in dashboard*/
import React from 'react';
import {Box} from "@mui/material";
import CustomersCard from "./CustomersCard";

export default function Dashboard() {
  return (
	<Box sx={{ display: 'flex', background: "#f5f5f5", minHeight: "100vh", padding: 2 }}>
		<CustomersCard />
	</Box>
  );
}