import {Avatar, Box, Card, CardContent, CircularProgress, Grid, Typography} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import GroupIcon from "@mui/icons-material/Group";
import React from 'react'
import {createAPIEndpoint, ENDPOINTS} from "../../api";

export default function CustomersCard (props) {
	const [customers, setCustomers] = React.useState(0)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.customer.get.all)
			.fetch()
			.then(res => {
				setCustomers(res.data.total)
				setLoading(false)
			})
			.catch(console.log)
	}, [])

	return (
		<Card
			sx={{ height: '100%' }}
			{...props}
		>
			<CardContent>
				<Grid
					container
					spacing={3}
					sx={{ justifyContent: 'space-between' }}
				>
					<Grid item>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Number of Customers
						</Typography>
						{ loading ?
							<CircularProgress color="inherit"/>
							:
							<Typography
								color="textPrimary"
								variant="h4"
								>
								{ customers }
							</Typography>
						}
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: 'error.main',
								height: 56,
								width: 56
							}}
						>
							<GroupIcon />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}