import {Avatar, Card, CardContent, CircularProgress, Grid, Typography} from '@mui/material';
import SensorsIcon from '@mui/icons-material/Sensors';
import React from 'react'
import {createAPIEndpoint, ENDPOINTS} from "../../api";

export default function CustomersCard (props) {
	const [devices, setDevices] = React.useState(0)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.device.get.all)
			.fetch()
			.then(res => {
				setDevices(res.data.total)
				setLoading(false)
			})
			.catch(console.log)
	}, [])

	return (
		<Card
			sx={{ height: '100%', mx: 2}}
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
							Number of Devices in the system
						</Typography>
						{ loading ?
							<CircularProgress color="inherit"/>
							:
							<Typography
								color="textPrimary"
								variant="h4"
								>
								{ devices }
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
							<SensorsIcon />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}