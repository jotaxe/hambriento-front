const testSellers = [
    {
        lat: -33.451576,
        long: -70.660812,
        name: "Almuerzos Vegetarianos"
    },
    {
        lat: -33.452919,
        long : -70.661542,
        name: "Handrolls"
    },
    {
        lat: -33.451388,
        long: -70.661757,
        name: "Hamburguesas de Soya"
    }
];

const apiUrl = 'http://192.168.43.108:3030';

export function getSellers(){
    return fetch(apiUrl + '/sellers', {
        method: 'GET',
    }).then((response) => {
        return response.json()
    }).then((json) => {
        return json;
    });

}

export function authenticate(user){
    console.log(user)
    return fetch(apiUrl + '/authentication', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "strategy": "local", 
        "email": user.username,
        "password": user.password
    }),
    }).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}

export function singup(user){
    return fetch(apiUrl + '/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "email": user.username,
        "password": user.password
    }),
    }).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}