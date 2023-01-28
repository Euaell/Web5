import axios from 'axios'

const BASE_URL = "https://cwm.onrender.com/"

axios.defaults.withCredentials = true

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
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
}