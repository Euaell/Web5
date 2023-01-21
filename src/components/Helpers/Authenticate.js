import React from 'react';
import useStateContext from "../../hooks/useStateContext";
import {Navigate, Outlet} from "react-router";
import {createAPIEndpoint, ENDPOINTS} from "../../api";

export default function Authenticate(props) {
    const [verified, setVerified] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const {user, setUser} = useStateContext();

    React.useEffect(() => {
        createAPIEndpoint(ENDPOINTS.user.post.verify)
            .post({})
            .then(data => {
                console.log(data)
                setVerified(true);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setVerified(false);
                setLoading(false);
            });
    })

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    if (verified) {
        return <Outlet />
    }

    return <Navigate to={"/login"} />
}