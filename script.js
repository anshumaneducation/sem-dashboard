import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, onValue, set } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyC2Hl06bYHKn5GJH5w4Z9rQUlreVn4cBfk",
    authDomain: "sem-gui-web.firebaseapp.com",
    databaseURL: "https://sem-gui-web-default-rtdb.firebaseio.com",
    projectId: "sem-gui-web",
    storageBucket: "sem-gui-web.appspot.com",
    messagingSenderId: "499640990084",
    appId: "1:499640990084:web:6a34ad31ba8de737c945d1",
    measurementId: "G-7Q5WVY3N6K"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);


  function messageToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';

    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;

    toast.appendChild(messageParagraph);

    document.body.appendChild(toast);

    // Display the toast for a few seconds
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2000);
}

  export function handleButtonClick(buttonText) {
    let message;
    // Your existing logic for button click
    switch (buttonText) {
        case 'm1':
            message = 'Meter 1 button pressed!';
            // Add additional logic if needed
            break;
        case 'm2':
            message = 'Meter 2 button pressed!';
            // Add additional logic if needed
            break;
        case 'm3':
            message = 'Meter 3 button pressed!';
            // Add additional logic if needed
            break;
        case 'm4':
            message = 'Meter 4 button pressed!';
            // Add additional logic if needed
            break;
        case 'w1':
            message = 'Toggle switch 1 pressed!';
            // Add additional logic if needed
            break;
        case 'w2':
            message = 'Toggle switch 2 pressed!';
            // Add additional logic if needed
            break;
        case 'w3':
            message = 'Toggle switch 3 pressed!';
            // Add additional logic if needed
            break;
        case 'w4':
            message = 'Toggle switch 4 pressed!';
            // Add additional logic if needed
            break;
        default:
            message = 'Unknown button pressed!';
            break;
    }
    console.log(message)

      const username = document.getElementById('username').value; // Get username from input field
      const path = `/${username}/writeCommand`; // Change this path accordingly
      const data = buttonText;
      writeToFirebase(path, data);
  
      setTimeout(() => {
          writeToFirebase(path, null);
      }, 1000);
  }
  
  function writeToFirebase(path, data) {
      const dataRef = ref(database, path);
      return set(dataRef, data);
  }

  function handleBalanceData(balanceData) {
    // Assuming balanceData is an array with 4 elements representing balances for each meter
    const [balanceM1, balanceM2, balanceM3, balanceM4] = balanceData;

    // Select the <span> elements using their IDs
    const balanceM1Element = document.getElementById('balance-m1');
    const balanceM2Element = document.getElementById('balance-m2');
    const balanceM3Element = document.getElementById('balance-m3');
    const balanceM4Element = document.getElementById('balance-m4');

    // Set the textContent of each <span> element
    balanceM1Element.textContent = balanceM1;
    balanceM2Element.textContent = balanceM2;
    balanceM3Element.textContent = balanceM3;
    balanceM4Element.textContent = balanceM4;
}
function handleRefreshData(refreshrate_data) {
    // Assuming balanceData is an array with 4 elements representing balances for each meter
    const [balanceM1, balanceM2, balanceM3, balanceM4] = refreshrate_data;

    // Select the <span> elements using their IDs
    const balanceM1Element = document.getElementById('refresh-m1');
    const balanceM2Element = document.getElementById('refresh-m2');
    const balanceM3Element = document.getElementById('refresh-m3');
    const balanceM4Element = document.getElementById('refresh-m4');

    // Set the textContent of each <span> element
    balanceM1Element.textContent = balanceM1;
    balanceM2Element.textContent = balanceM2;
    balanceM3Element.textContent = balanceM3;
    balanceM4Element.textContent = balanceM4;
}
function handlemessageforUser1(messageforUser_data) {
    // Assuming balanceData is an array with 4 elements representing balances for each meter
    const message_user = messageforUser_data;

    // Select the <span> elements using their IDs
    const balanceM1Element = document.getElementById('messages-user-1');

    // Set the textContent of each <span> element
    balanceM1Element.textContent = message_user;

}
function handlemessageforUser2(messageforUser_data) {
    // Assuming balanceData is an array with 4 elements representing balances for each meter
    const message_user = messageforUser_data;

    // Select the <span> elements using their IDs
    const balanceM1Element = document.getElementById('messages-user-2');

    // Set the textContent of each <span> element
    balanceM1Element.textContent = message_user;

}
function handlemessageforUser3(messageforUser_data) {
    // Assuming balanceData is an array with 4 elements representing balances for each meter
    const message_user = messageforUser_data;

    // Select the <span> elements using their IDs
    const balanceM1Element = document.getElementById('messages-user-3');

    // Set the textContent of each <span> element
    balanceM1Element.textContent = message_user;

}

function handlecolorsShow(colorsfortable_data) {
   
  // Assuming colorsfortable_data is an array with the color values
const [colorRowM1, colorRowM2, colorRowM3, colorRowM4] = colorsfortable_data;

// Select the elements using their IDs
const colorM1Element = document.getElementById('dc-a:m1');
const colorM2Element = document.getElementById('dc-a:m2');
const colorM3Element = document.getElementById('dc-b:m1');
const colorM4Element = document.getElementById('dc-b:m2');

// Set the background color for each element
if (colorM1Element) {
  colorM1Element.style.backgroundColor = colorRowM1;
}

if (colorM2Element) {
  colorM2Element.style.backgroundColor = colorRowM2;
}

if (colorM3Element) {
  colorM3Element.style.backgroundColor = colorRowM3;
}

if (colorM4Element) {
  colorM4Element.style.backgroundColor = colorRowM4;
}


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

          // Fetch meter_toggle array
        const toggleRef = ref(database, `/${username}/toggle_meter`);
        onValue(toggleRef, (snapshot) => {
            const toggleData = snapshot.val();
            handleToggleData(toggleData);
        });
          // Fetch balance array
          const balanceRef = ref(database, `/${username}/balace_remain`);
          onValue(balanceRef, (snapshot) => {
              const Balance_data = snapshot.val();
              handleBalanceData(Balance_data);
          });
    
          // Fetch refresh array
          const refreshrateRef = ref(database, `/${username}/Monitoring_time`);
          onValue(refreshrateRef, (snapshot) => {
              const refreshrate_data = snapshot.val();
              handleRefreshData(refreshrate_data);
          });
          // Fetch message of user
          const messageforUserRef1 = ref(database, `/${username}/window_message_1`);
          onValue(messageforUserRef1, (snapshot) => {
              const messageforUser_data = snapshot.val();
              handlemessageforUser1(messageforUser_data);
          });
           // Fetch message of user
           const messageforUserRef2 = ref(database, `/${username}/window_message_2`);
           onValue(messageforUserRef2, (snapshot) => {
               const messageforUser_data = snapshot.val();
               handlemessageforUser2(messageforUser_data);
           });
            // Fetch message of user
          const messageforUserRef3 = ref(database, `/${username}/window_message_3`);
          onValue(messageforUserRef3, (snapshot) => {
              const messageforUser_data = snapshot.val();
              handlemessageforUser3(messageforUser_data);
          });

           // Fetch message of user
           const colorsfortableRef = ref(database, `/${username}/set_colors_table`);
           onValue(colorsfortableRef, (snapshot) => {
               const colorsfortable_data = snapshot.val();
               handlecolorsShow(colorsfortable_data);
           });
      });
  }


  function handleToggleData(toggleData) {
    const switches = ['switch1', 'switch2', 'switch3', 'switch4'];

    toggleData.forEach((value, index) => {
        const switchId = switches[index];
        const switchElement = document.getElementById(switchId);
        // Set the switch state based on the value in toggleData
        switchElement.checked = (value === 1);
    });
}
  
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
  
      const paras = ["Volts 01", "Volts 02", "Volts 03", "Current 01", "Current 02", "Current 03", "Watt 01", "Watt 02",
          "Watt 03", "VAR 01", "VAR 02", "VAR 03", "Freq", "Wh Import", "Wh Export", "VL 1-2", "VL 2-3", "VL 3-1"];
      const SIunits=["Volts","Volts","Volts","Amps","Amps","Amps","Watts","Watts","Watts","VAr","VAr",
      "VAr","Hz","Watt-hr","Watt-hr","Volts","Volts","Volts"]
  
      // Add "Device" header as the first column
      const deviceHeader = document.createElement('th');
      deviceHeader.textContent = 'Meter';
      headersRow.appendChild(deviceHeader);
  
      // Add other headers
      for (const parameter of parameters) {
          const headerCell = document.createElement('th');
          headerCell.textContent = paras[parameter];
          headersRow.appendChild(headerCell);
      }

      //add si units on the meters rows at top 
      const siUnitsRow = document.createElement('tr');
      const oneCell = document.createElement('td');
      oneCell.textContent = "SI Units";
      siUnitsRow.appendChild(oneCell);

      for (let i = 0; i < SIunits.length; i++) {
        const valuesCell = document.createElement('td');
        valuesCell.textContent = Array.isArray(SIunits[i]) ? SIunits[i].join(', ') : SIunits[i];
        siUnitsRow.appendChild(valuesCell);
    }
    tbody.appendChild(siUnitsRow);
      // Add meter rows
      
      for (const meter of meters) {
          const row = document.createElement('tr');
          const meterCell = document.createElement('td');

          let text=""
          if(meter=="Meter 1"){
            text="DC-A:M1"
          }
          else if(meter=="Meter 2"){
            text="DC-A:M2"
          }
          else if(meter=="Meter 3"){
            text="DC-B:M1"
          }
          else if(meter=="Meter 4"){
            text="DC-B:M2"
          }
          meterCell.textContent = text;
          row.id = text.replace(/\s+/g, '-').toLowerCase(); // Set the ID of the row
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
  
  
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginContainer = document.getElementById('login-container');
  const headerTextForIt = document.getElementById('header');
  const appContainer = document.getElementById('app-container');
  const appContainer1 = document.getElementById('app-container1');
  
  // Check if the user is already authenticated on window load
  window.onload = function () {
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');
      if (savedUsername) {
          // Auto-authenticate with saved username
          usernameInput.value = savedUsername;
          passwordInput.value = savedPassword;
          authenticate();
      }
  };
  
  export function authenticate() {
      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const enteredPassword = passwordInput.value;
      const user_id_get = usernameInput.value.split('@')[0];
      const enteredUsername = user_id_get;
      
  
      // Fetch the correct password from Firebase
      const passwordRef = ref(database, `/${enteredUsername}/sem_password`);
      onValue(passwordRef, (snapshot) => {
          const correctPassword = snapshot.val();
  
          if (enteredPassword === correctPassword) {
              // Correct password, save username in local storage
              localStorage.setItem('username', enteredUsername);
              localStorage.setItem('password', enteredPassword);
  
              // Hide login container and show app container
              loginContainer.style.display = 'none';
              appContainer.style.display = 'block';
              appContainer1.style.display = 'block';
              headerTextForIt.style.display='block'
              fetchData(enteredUsername); // Fetch data when authenticated
          } else {
              // Incorrect password, show an error
              alert('Incorrect password. Please try again.');
          }
      });

      handleUsernameInLogout(enteredUsername)
  }
 function handleUsernameInLogout(enteredUsername){
    const elementUserId = document.getElementById('userIdInHTML');

    // Set the textContent of each <span> element
    elementUserId.textContent = enteredUsername;
  }
  
  // ... (Your existing code)
  
  export function handlePasswordKeyPress(event) {
      if (event.key === 'Enter') {
          authenticate();
      }
  }
  
  export function logout(){
       // Clear username and password from local storage
       localStorage.removeItem('username');
       localStorage.removeItem('password');
   
       // Redirect to the login page (index.html)
       window.location.href = 'index.html';
  }