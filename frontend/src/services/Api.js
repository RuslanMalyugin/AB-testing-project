export const baseUrl = 'http://localhost:8080/'
export const create = (data) => {
    fetch(baseUrl + 'create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

export const createUser = (data) => {
    return fetch(baseUrl + 'auth/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

export const authUser = (data) => {
    return fetch(baseUrl + 'auth/jwt/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(e => e.json())
}

export const downloadOrders = () => {
    return fetch(baseUrl + 'orders/get_all_orders/')
        .then(data => data.json())
}

export const createOrder = (data) => {
    fetch(baseUrl + 'orders/create_order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(e => {
            if (e.status === 400 || e.status === 401) {
                alert("Не удалось оформить заказ")
            } else {
                alert('Оформлено!')
                window.location.reload()
            }
        })
}


