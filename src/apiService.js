import constant from "./constant";

const url = `https://api-${constant.sendbirdAppId}.sendbird.com/v3/`
const headers = {
    'Api-Token': constant.sendbirdAppKey,
};

export async function createUser(params) {
    return fetch(url + 'users', {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
}

export async function fetchUsers() {
    return fetch(url + 'users', {
        method: 'GET',
        headers: headers,
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
}

export async function fetchUserById(userId) {
    return fetch(url + 'users/' + userId, {
        method: 'GET',
        headers: headers,
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
}