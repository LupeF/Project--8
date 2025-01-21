const employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12';
const grid = document.querySelector('.grid-container');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

function generateCard(employee) { 
    employee.results.forEach( employee => {
        grid.innerHTML += `
        <div class="card">
            <img src=" ${employee.picture.large}" alt="employee">
            <div class= "box">
                <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
                <p class="email">${employee.email}</p>
                <p class="address">${employee.location.state}</p>
            </div>
        </div>
        `;
    })
    
}

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
function fetchData(url) {
    fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .then(generateCard)
    .catch(error => console.log('Looks like there was a problem!', error));
}
fetchData(urlAPI);
