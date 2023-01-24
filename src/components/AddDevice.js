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

const getFreshModel = () => ({
    state: "",
    city: "",
	address: "",
	status: "inactive",
})
export default function AddDevice() {
	const navigate = useNavigate();

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
		  state: values.state,
		  city: values.city,
		  address: values.address,
		  status: values.status,
		};

		createAPIEndpoint(ENDPOINTS.device.post.create)
		  .post(data)
		  .then((res) => {
			navigate("/home/devices");
		  })
		  .catch((err) => {
			console.log(err);
		  })
	}};
  const handleInputChangeChecked = (event) => {
	  setValues({
	  ...values,
	  [event.target.name]: event.target.checked ? "active" : "inactive"
	});
  }

  const validate = () => {
	  let temp = {};
	  temp.state = values.state ? "" : "This field is required.";
	  temp.city = values.city ? "" : "This field is required.";
	  temp.address = values.address ? "" : "This field is required.";
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
            Add Device
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="state"
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  autoFocus
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
                <FormControlLabel
                  control={
					<Checkbox
					  value={values.status === "active"}
					  onChange={handleInputChangeChecked}
					  name="status"
					  color="primary"
				  />}
                  label="Set the device as active"
                />
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
