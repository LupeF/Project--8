const employees = [];
const urlAPI = 'https://randomuser.me/api/';
const grid = document.querySelector('.grid-container');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

function generateCard(employee) {
    card.innerHTML = `
        <img src=" ${employee.picture.large}" alt="employee">
        <div class= "box">
            <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
            <p class="email">${employee.email}</p>
            <p class="address">${employee.location.state}</p>
        </div>
    `;
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
    .then(data => generateCard(data.results[0]))
    .catch(error => console.log('Looks like there was a problem!', error));
}
fetchData(urlAPI);

