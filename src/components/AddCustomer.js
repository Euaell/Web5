import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useForm from "../hooks/useForm";
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {useNavigate} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const getFreshModel = () => ({
	name: "",
	email: "",
	phone: "",
    state: "",
    city: "",
	address: "",
	devices: "",
})
export default function AddCustomer() {
	const navigate = useNavigate();
	const [devicesSelection, setDevicesSelection] = React.useState([""]);

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.device.get.getAvailableDevices)
		  .fetch()
		  .then((res) => res.data)
		  .then((data) => {
			  console.log(data.devices)
			setDevicesSelection(data.devices);
		  })
		  .catch((err) => {
			console.log(err);
		  })
	}, [])

	const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

  const handleSubmit = (event) => {
    event.preventDefault();
	if (validate()) {
		const data = {
			name: values.name,
			email: values.email,
			phone: values.phone,
			state: values.state,
			city: values.city,
			address: values.address,
			Device: values.devices,
		};

		createAPIEndpoint(ENDPOINTS.customer.post.createCustomer)
		  .post(data)
		  .then((res) => {
			// navigate("/devices");
			  console.log(res);
		  })
		  .catch((err) => {
			console.log(err);
		  })
	}
	else {
		console.log("Validation failed");
	}
  };

  const validate = () => {
	  let temp = {};
	  temp.name = values.name ? "" : "Please Enter Customer Name.";
	  temp.email = values.email && /$^|.+@.+..+/.test(values.email) ? "" : "Email is not valid.";
	  temp.phone = values.phone && values.phone.length > 9 && /^[0-9]+$/.test(values.phone) ? "" : "Phone number is not valid. e.g.0911606162";
	  temp.state = values.state ? "" : "State is required.";
	  temp.city = values.city ? "" : "Please enter Customers City.";
	  temp.address = values.address ? "" : "Address is required.";
	  temp.devices = values.devices ? "" : "This field is required.";
	  setErrors(temp)
	  return Object.values(temp).every(x => x === "");
	}

  return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create a Customer
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
					autoComplete="name"
					name="name"
					required
					fullWidth
					id="name"
					label="Name"
					autoFocus
					value={values.name}
					onChange={handleInputChange}
					{...(errors.name && {error:true, helperText:errors.name})}
                />
              </Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="email"
						name="email"
						required
						fullWidth
						id="email"
						label="Email"
						value={values.email}
						onChange={handleInputChange}
						{...(errors.email && {error:true, helperText:errors.email})}
                />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="phone"
						name="phone"
						required
						fullWidth
						id="phone"
						label="Phone"
						value={values.phone}
						onChange={handleInputChange}
						{...(errors.phone && {error:true, helperText:errors.phone})}
                />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="state"
						label="State"
						name="state"
						autoComplete="state"
						value={values.state}
						onChange={handleInputChange}
						{...(errors.state && {error:true, helperText:errors.state})}
					/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
				  value={values.city}
				  onChange={handleInputChange}
				  {...(errors.city && {error:true, helperText:errors.city})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
				  value={values.address}
				  onChange={handleInputChange}
				  {...(errors.address && {error:true, helperText:errors.address})}
                />
              </Grid>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Device</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={values.devices}
							label="Device"
							onChange={handleInputChange}
							name="devices"
							{...(errors.devices && {error:true, helperText:errors.devices})}
						>
							{devicesSelection.map((device) => (
								<MenuItem value={device._id}>{device._id}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
			  color={"primary"}
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
  );
}
