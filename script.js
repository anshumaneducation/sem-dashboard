import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, onValue, set } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbhQ7q4xiwDlc4QN81-Xp8RvHKKHpDu20",
    authDomain: "fir-start-df66f.firebaseapp.com",
    databaseURL: "https://fir-start-df66f-default-rtdb.firebaseio.com",
    projectId: "fir-start-df66f",
    storageBucket: "fir-start-df66f.appspot.com",
    messagingSenderId: "367950942282",
    appId: "1:367950942282:web:f8b41912d6ad6d006896b3",
    measurementId: "G-SN652T91ER"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export function handleButtonClick(buttonText) {
    const username = document.getElementById('username').value; // Get username from input field
    const path = `/${username}/writeCommand`; // Change this path accordingly
    const data = buttonText;
    writeToFirebase(path, data);

    setTimeout(() => {
        writeToFirebase(path, null);
    }, 2000);
}

// Function to write data to Firebase
function writeToFirebase(path, data) {
    const dataRef = ref(database, path);
    return set(dataRef, data);
}

// Fetch and display data
const dataTable = document.getElementById('data-table');
const dataMap = new Map();

function fetchData(username) {
    const meters = ['meter1', 'meter2', 'meter3', 'meter4'];

    meters.forEach((meter) => {
        const dataRef = ref(database, `/${username}/${meter}_data`);

        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            dataMap.set(meter, data);
            populateTable();
        });
    });
}

// ... (Previous code)

// Update the populateTable() function in script.js

function populateTable() {
    const tbody = dataTable.querySelector('tbody');
    const headersRow = document.getElementById('table-headers');

    tbody.innerHTML = ''; // Clear existing rows
    headersRow.innerHTML = ''; // Reset headers

    const meters = ['Meter 1', 'Meter 2', 'Meter 3', 'Meter 4'];

    const parameters = Array.from(dataMap.values())
        .map(data => Object.keys(data))
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index);

    const paras = ["volts 01", "volts 02", "volts 03", "current 01", "current 02", "current 03", "watt 01", "watt 02",
        "watt 03", "VAR 01", "VAR 02", "VAR 03", "freq", "wh Import", "wh Export", "VL 1-2", "VL 2-3", "VL 3-1"];

    // Add "Device" header as the first column
    const deviceHeader = document.createElement('th');
    deviceHeader.textContent = 'Device';
    headersRow.appendChild(deviceHeader);

    // Add other headers
    for (const parameter of parameters) {
        const headerCell = document.createElement('th');
        headerCell.textContent = paras[parameter];
        headersRow.appendChild(headerCell);
    }

    // Add meter rows
    for (const meter of meters) {
        const row = document.createElement('tr');
        const meterCell = document.createElement('td');
        meterCell.textContent = meter;
        row.appendChild(meterCell);

        for (const parameter of parameters) {
            const valuesCell = document.createElement('td');
            const meterData = dataMap.get(meter.toLowerCase().replace(' ', ''));
            valuesCell.textContent = Array.isArray(meterData[parameter]) ? meterData[parameter].join(', ') : meterData[parameter];
            row.appendChild(valuesCell);
        }

        tbody.appendChild(row);
    }
}

// ... (Remaining code)

// Initial data fetch
const usernameInput = document.getElementById('username');
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');

export function authenticate() {
    const passwordInput = document.getElementById('password');
    const enteredPassword = passwordInput.value;
    const enteredUsername = usernameInput.value;

    // Fetch the correct password from Firebase
    const passwordRef = ref(database, `/${enteredUsername}/sem_password`);
    onValue(passwordRef, (snapshot) => {
        const correctPassword = snapshot.val();

        if (enteredPassword === correctPassword) {
            // Correct password, show the app
            loginContainer.style.display = 'none';
            appContainer.style.display = 'block';
            fetchData(enteredUsername); // Fetch data when authenticated
        } else {
            // Incorrect password, show an error
            alert('Incorrect password. Please try again.');
        }
    });
}
export function handlePasswordKeyPress(event) {
    if (event.key === 'Enter') {
        authenticate();
    }
}