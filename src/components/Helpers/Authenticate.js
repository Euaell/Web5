import React from 'react';
import useStateContext from "../../hooks/useStateContext";
import {Navigate, Outlet} from "react-router";
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Authenticate(props) {
    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    // const {user, setUser} = useStateContext();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        createAPIEndpoint(ENDPOINTS.user.post.verify)
            .post({})
            .then(data => {
                setVerified(true);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setVerified(false);
                setLoading(false);
            });
    })

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        )
    }

    if (verified) {
        return <Outlet />
    }

    return <Navigate to={"/login"} />
}