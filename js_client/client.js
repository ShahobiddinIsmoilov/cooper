const loginForm = document.getElementById('login-form')
const contentContainer = document.getElementById('content-container')
const baseEndpoint = "http://localhost:8000"

if (loginForm) {
    loginForm.addEventListener('submit', handleLogin)
}

function handleLogin(event) {
    event.preventDefault()
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(loginObjectData)
    const loginEndpoint = `${baseEndpoint}/user/token/`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyStr
    }
    fetch(loginEndpoint, options)
    .then(response => {
        return response.json()
    })
    .then(authData => {
        handleAuthData(authData, getPosts)
    })
    .catch(err => {
        console.log('err', err)
    })
}

function handleAuthData(authData, callback) {
    localStorage.setItem('access', authData.access)
    localStorage.setItem('refresh', authData.refresh)
    if (callback) {
        callback()
    }
}

function getFetchOptions(method, body) {
    return {
        method: method === null ? "GET" : method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access")}`
        },
        body: body ? body : null 
    }
}

function isTokenNotValid(jsonData) {
    if (jsonData.code && jsonData.code === "token_not_valid") {
        // run a refresh token fetch
        alert("Please log in again")
        return false
    }
    return true
}

function getPosts() {
    const endpoint = `${baseEndpoint}/post/list/`
    const options = getFetchOptions()
    fetch(endpoint, options)
    .then(response => {
        return response.json()
    })
    .then(data => {
        const validData = isTokenNotValid(data)
        if (validData) {
            writeToContainer(data)
        }
    })
}

function writeToContainer(data) {
    if (contentContainer) {
        contentContainer.innerHTML = "<pre>" + JSON.stringify(data, null, 4) + "</pre>"
    }
}