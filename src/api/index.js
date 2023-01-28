import axios from 'axios'

const BASE_URL = "http://localhost:4000/"

axios.defaults.withCredentials = true

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    },
    withCredentials: true,
    credentials: 'include'
}

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

    return {
        fetch: () => axios.get(url, options),
        fetchById: id => axios.get(url + id, options),
        post: newRecord => axios.post(url, newRecord, options),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord, options),
        delete: id => axios.delete(url + id, options),
    }
}