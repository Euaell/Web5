import React, { useEffect } from 'react';
import {
    Button,
    TextField,
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput, InputAdornment, IconButton, FormHelperText
} from '@mui/material';
import Center from './Helpers/Center';
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const getFreshModel = () => ({
    email: "",
    password: ""
})

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { user, setUser, resetUser } = useStateContext();
    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetUser();
    }, [])


    const login = e => {
        e.preventDefault()
        if (validate())
            createAPIEndpoint(ENDPOINTS.user.post.login)
                .post(values)
                .then(res => {
                    setUser(res.data);
                    console.log(res.data);
                    navigate("/home");
                })
                .catch(err => console.log("Bad Login: ", err))
    }

    const validate = () => {
        let temp = {}
        temp.email = (/^[a-zA-Z\d]+@(?:[a-zA-Z\d]+\.)+[A-Za-z]+$/).test(values.email) ? "" : "Email is not valid.";
        temp.password = values.password !== "" ? "" : "Please Enter Password";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    return (
    <Center>
        <Card sx={{width: 400}}>
            <CardContent>
                <Typography variant="h3"
                        sx ={{my: 3}}>
                            BALDI
                        </Typography>
                <Box sx={{
                    m: 3,
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%'
                    }
                    }}>
                    <form noValidate autoComplete='on' onSubmit={login}>
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            variant="outlined"
                            onChange={handleInputChange}
                            {...(errors.email && {error: true, helperText: errors.email})}
                            />

                        {/*<TextField*/}
                        {/*    label="Password"*/}
                        {/*    name="password"*/}
                        {/*    value={values.password}*/}
                        {/*    type="password"*/}
                        {/*    variant="outlined"*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*    {...(errors.password && {error: true, helperText: errors.password})}*/}
                        {/*/>*/}
                        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            value={values.password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleInputChange}
                            {...(errors.password && {error: true, helperText: errors.password})}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          {!!errors.password && (
                            <FormHelperText error id="accountId-error">
                              {errors.password}
                            </FormHelperText>
                          )}
                        </FormControl>

                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{width: '90%'}}
                            >Submit</Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    </Center>

  )
}

