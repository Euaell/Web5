import axios from 'axios'

const BASE_URL = "https://cwm.onrender.com/"
// const BASE_URL = "http://localhost:4000/"

axios.defaults.withCredentials = true
axios.defaults.credentials = "include"

export const ENDPOINTS = {
    customer: {
        get: {
            all: "customers",
            byId: "customers/"
        },
        post: {
            create: "customers",
            createCustomer: "customers/createUser"
        },
        put: {
            update: "customers/"
        },
        delete: {
            delete: "customers/"
        }
    },
    device: {
        get: {
            all: "devices",
            byId: "devices/",
            listbyadmin: "devices/listbyadmin",
            getcloseddevices: "devices/getcloseddevices",
            getAvailableDevices: "devices/getAvailableDevices",
            open: "devices/open/",
            close: "devices/close/"
        },
        post: {
            create: "devices",
            addchildren: "devices/addchildren"
        },
        put: {
            update: "devices/"
        },
        delete: {
            delete: "devices/"
        }
    },
    user: {
        get: {
            all: "users",
            byId: "users/",
            logout: "users/logout"
        },
        post: {
            create: "users/create",
            login: "users/login",
            verify: "users/verifyuser",
            changePassword: "users/changePassword"
        }
    },
    bill: {
        get: {
            all: "bills",
            byId: "bills/",
            getBillsByCustomerId: "bills/getBillsByCustomers/",
            getUnpaidBills: "bills/getUnpaidBills"
        }
    }
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + endpoint + "/"
    const token = localStorage.getItem("token") || null
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'token': token
        },
        withCredentials: true
    }
    console.log(options)
    return {
        fetch: () => axios.get(url, options),
        fetchById: id => axios.get(url + id, options),
        post: newRecord => axios.post(url, newRecord, options),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord, options),
        delete: id => axios.delete(url + id, options),
    }
}