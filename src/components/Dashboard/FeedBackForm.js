import React, { useState } from "react";
import {TextField, Button, Typography, Rating, Card} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define a validation schema for the form fields
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  message: yup.string().required("Message is required"),
  rating: yup.number().min(1, "Rating is required").max(5),
});

// Define a custom component for the rating field
const RatingField = ({ control }) => {
  return (
    <Controller
      name="rating"
      control={control}
      render={({ field }) => (
        <Rating {...field} getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`} />
      )}
    />
  );
};

// Define the main component for the feedback form
const FeedbackForm = () => {
	// Use react-hook-form to handle form state and validation
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema),

	});

	// Use state to store the submission status
	const [submitted, setSubmitted] = useState(false);

	// Define a function to handle form submission
	const onSubmit = (data) => {
		console.log(data);
		setSubmitted(true);
		reset();
	};

	return (
		<Card
			sx={{p: 2, m: 2, maxWidth: 500, mx: 'auto', boxShadow: 3}}
		>
			<Typography variant="h4" align="center">
				Feedback Form
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="Name"
					variant="outlined"
					margin="normal"
					fullWidth
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="Email"
					variant="outlined"
					margin="normal"
					fullWidthfd
					{...register("email")}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					label="Message"
					variant="outlined"
					margin="normal"
					fullWidth
					multiline
					rows={4}
					{...register("message")}
					error={!!errors.message}
					helperText={errors.message?.message}
				/>
				<Typography variant="body1">Rating</Typography>
				<RatingField control={control}/>
				{errors.rating && (
					<Typography color='error' variant='body2'>{errors.rating.message}</Typography>
				)}

				<Button type="submit" variant="contained" color="primary">
					Submit
				</Button>
				{submitted && (
					<Typography color='success' variant='body2'>Thank you for your feedback!</Typography>
				)}
			</form>
		</Card>
	)
}

export default FeedbackForm;