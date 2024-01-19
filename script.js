
function onClickAddUser() {
    const accName = document.getElementById('input_account_name');
    const issuer = document.getElementById('input_issuer');
    const secret = document.getElementById('input_secret');
    let accNameVal = accName.value.trim()
    let issuerVal = issuer.value.trim()
    let secretVal = secret.value.trim()
    addUser(accNameVal, issuerVal, secretVal)
    accName.value = '';
    issuer.value = '';
    secret.value = '';
}
function onClickUpdate() {
    updateUsers()
}
function onClickDelete() {
    const deleteId = document.getElementById('deleteId');
    let deleteIdVal = deleteId.value.trim()
    deleteUser(deleteIdVal)
    deleteId.value = '';
}
function addUser(accNameVal,issuerVal,secretVal) {
    const apiUrl = 'http://localhost:8080/user/add';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            account_name: accNameVal,
            issuer: issuerVal,
            secret: secretVal
        }),
    };
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Ответ от сервера:', data);
        })
        .catch(error => {
            console.error('Ошибка fetch:', error);
        });
}
function deleteUser(id) {
    let apiUrl = 'http://localhost:8080/user/delete/';
    apiUrl+=id;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Ответ от сервера:', data);
        })
        .catch(error => {
            console.error('Ошибка fetch:', error);
        });
    onClickUpdate()
}
function updateUsers() {
    let apiUrl = 'http://localhost:8080/user/list';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateProcess(data);
        })
        .catch(error => {
            console.error('Ошибка fetch:', error);
        });
}
function updateProcess(response) {
    listArray = response.list;

    createColumName()
    const timer = listArray[0]["timer"]
    let load = document.getElementById("load")
    load.style.display = "block";
    load.style.width = timer + "%"
    listArray.forEach(element => {
        const keyToRetrieve = "issuer";
        const issuer = element[keyToRetrieve];
        const keyToRetrieve2 = "totp_code";
        const code = element[keyToRetrieve2];
        const keyToRetrieve3 = "totp_time";
        const time = element[keyToRetrieve3];

        addStruct2(issuer, code, time )
    });
}


function createColumName() {
    let table = document.getElementById("tbl")
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    td1.innerHTML = "Key"
    let td2 = document.createElement("td")
    td2.innerHTML = "OTP"
    let td3 = document.createElement("td")
    td3.innerHTML = "Time"


    tr.append(td1)
    tr.append(td2)
    tr.append(td3)

    table.append(tr)
}
function addStruct2(accNameVal, issuerVal, secretVal) {
    let table = document.getElementById("tbl")

    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    td1.innerHTML = accNameVal
    let td2 = document.createElement("td")
    td2.innerHTML = issuerVal
    let td3 = document.createElement("td")
    td3.innerHTML = secretVal

    tr.append(td1)
    tr.append(td2)
    tr.append(td3)

    table.append(tr)
}

function init (){
    const apiUrl = 'https://rockwellcapitalgroup.bitrix24.com/rest/name_method';
    const accessToken = '63449e650069f1a9005416a5000000db100e077c0dee24201dab59bb068958aa488ca2';

    fetch(apiUrl, {
        method: 'GET', // или другой HTTP-метод
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // Указывайте тип контента, если требуется
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
        })
        .catch(error => console.error('Error making API request:', error));

}

function foo() {
    const accessToken = "63449e650069f1a9005416a5000000db100e077c0dee24201dab59bb068958aa488ca2";
    const bitrix24Domain = "rockwellcapitalgroup.bitrix24.com";

// Specify the API endpoint or resource you want to access
    const apiEndpoint = "user.current";

// Construct the URL with the access token
    const apiUrl = `https://${bitrix24Domain}/?access_token=${accessToken}/`;

// Create a link element dynamically
    const linkElement = document.createElement("a");
    linkElement.href = apiUrl;
    linkElement.textContent = "Click here to access Bitrix24 API";


// Construct the URL with the access token as a query parameter
    const linkUrl = `https://${bitrix24Domain}/?access_token=${accessToken}&current_fieldset=SOCSERV`;

// You can use this linkUrl to create a hyperlink or redirect the user to the Bitrix24 main page
    console.log('Bitrix24 Main Page Link:', linkUrl);

}


function foo2() {
    const express = require('express');
    const axios = require('axios');

    const app = express();
    const port = 3000;

    // const accessToken = "63449e650069f1a9005416a5000000db100e077c0dee24201dab59bb068958aa488ca2";
    const bitrix24Domain = "rockwellcapitalgroup.bitrix24.com";
    const clientId = 'local.659d3114885f41.94372448';
    const clientSecret = 'P4hVMyn0FEsUqfb9qahodE2fg7xXupwZYXIyR3JInpnxQnL5q1';
    const redirectUri = 'http://rockwellcapitalgroup.bitrix24.com';

// Эндпоинт для аутентификации пользователя
    app.get('/auth', (req, res) => {
        // Перенаправляем пользователя на страницу аутентификации Bitrix24
        const authUrl = `https://${bitrix24Domain}/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
        res.redirect(authUrl);
    });

// Эндпоинт, который будет использован в качестве Redirect URI после успешной аутентификации
    app.get('/redirect', async (req, res) => {
        const { code } = req.query;

        try {
            // Запрос на обмен кода авторизации на токен доступа
            const tokenResponse = await axios.post(`https://${bitrix24Domain}/oauth/token`, {
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code,
            });

            const accessToken = tokenResponse.data.access_token;

            // Сохраняем токен доступа в безопасном месте (например, на сервере)

            // Перенаправляем пользователя на главную страницу Bitrix24 с безопасной ссылкой
            res.redirect(`https://${bitrix24Domain}/?access_token=${accessToken}&current_fieldset=SOCSERV`);
        } catch (error) {
            console.error('Error exchanging authorization code for access token:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

}

function foo3() {
    // Replace these values with your Bitrix24 application details
    var appID = 'your-app-id';
    var appSecret = 'your-app-secret';
    var portalDomain = 'rockwellcapitalgroup.bitrix24.com';

    // Initialize the Bitrix24 SDK
    BX24.init({
        'appId': appID,
        'appSecret': appSecret,
        'portalDomain': portalDomain,
        'onInit': function () {
            // Authorize the user
            BX24.login(function (auth) {
                if (auth.status === 'success') {
                    alert('Authentication successful!');
                    console.log('Auth Data:', auth);
                } else {
                    alert('Authentication failed. Check console for details.');
                    console.error('Auth Error:', auth);
                }
            });
        }
    });
}