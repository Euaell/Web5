import React from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	FormHelperText,
	TextField
} from '@mui/material';
import useForm from "../../hooks/useForm";
import {createAPIEndpoint, ENDPOINTS} from "../../api";

const getFreshModel = () => ({
	currentPassword: "",
	password: "",
	confirmPassword: ""
})
export const SettingsPassword = (props) => {

	const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

	function handleSubmit(e) {
		e.preventDefault();
		if (validate()) {
			createAPIEndpoint(ENDPOINTS.user.post.changePassword)
				.post(values)
				.then(res => {
					console.log(res);
					setValues(getFreshModel());
					setErrors({});
				})
				.catch(err => {
					console.log(err)
					setErrors({
						...errors,
						currentPassword: "Incorrect password."
					})
				});
		}
	}

	function validate() {
		let temp = {};
		temp.currentPassword = values.currentPassword ? "" : "This field is required.";
		temp.password = values.password ? "" : "This field is required.";
		temp.confirmPassword = values.confirmPassword ? "" : "This field is required.";
		if (values.password !== values.confirmPassword) {
			temp.confirmPassword = "Passwords do not match.";
		}
		setErrors(temp);
		return Object.values(temp).every(x => x === "");
	}

	return (
		<form {...props} onSubmit={handleSubmit}>
			<Card>
				<CardHeader
					subheader="Update password"
					title="Password"
				/>
				<Divider />
				<CardContent>
					<TextField
						fullWidth
						label="Current password"
						margin="normal"
						name="currentPassword"
						onChange={handleInputChange}
						type="password"
						value={values.currentPassword}
						variant="outlined"
						{...(errors.currentPassword && { error: true, helperText: errors.currentPassword })}
					/>
					<Divider />
					<TextField
						fullWidth
						label="Password"
						margin="normal"
						name="password"
						onChange={handleInputChange}
						type="password"
						value={values.password}
						variant="outlined"
						{...(errors.password && { error: true, helperText: errors.password })}
					/>
					<TextField
						fullWidth
						label="Confirm password"
						margin="normal"
						name="confirmPassword"
						onChange={handleInputChange}
						type="password"
						value={values.confirmPassword}
						variant="outlined"
						{...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword })}
					/>
				</CardContent>
				<Divider />
				{/*<FormControl*/}
				{/*	fullWidth*/}
				{/*	margin="normal"*/}
				{/*	variant="outlined"*/}
				{/*	{...(errors.currentPassword && { error: true })}*/}
				{/*>*/}
				{/*	{errors.currentPassword && <FormHelperText>{errors.currentPassword}</FormHelperText>}*/}
				{/*</FormControl>*/}

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2
					}}
				>
					<Button
						type={"submit"}
						color="primary"
						variant="contained"
					>
						Update
					</Button>
				</Box>
			</Card>
		</form>
	);
};