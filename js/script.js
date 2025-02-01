const employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12';
const grid = document.querySelector('.grid-container');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const input = document.getElementById('search');


//************************************************ */
//* functions that create the card for each employee
//********************************************** */
function generateCard(employee) {                   //function that creates the card
    employee.results.forEach((employee, index) => {
        grid.innerHTML += `
        <div class="card" data-index="${index}">
            <img src=" ${employee.picture.large}" alt="employee">
            <div class= "box">
                <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
                <p class="email">${employee.email}</p>
                <p class="address">${employee.location.state}</p>
            </div>
        </div>
        `;
        employees.push(employee);
    })
}

const generateModal = (person) => {              //function that creates the modal
    const birthdate = new Date(person.dob.date);
    overlay.innerHTML = `
        <div class="modal">
            <button class="prev modal-close">prev</button>
            <button class="next modal-close">next</button>
            <button class="modal-close">X</button>
            <div class="modal-content">
                <img class="avatar" src="${person.picture.large}" alt="avatar">
                <div class="box">
                    <h2 class="name">${person.name.first} ${person.name.last}</h2>
                    <p class="email">${person.email}</p>
                    <p class="adress">${person.location.city}</p>
                    <hr />
                    <p>${person.phone}</p>
                    <p class="address"> ${person.location.street.number} ${person.location.street.name}, ${person.location.state} ${person.location.postcode}</p>
                    <p>Birthday: ${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}</p>
                </div>
            </div>
        </div>
        `;
    overlay.classList.remove('hidden');
    const closeBtn = document.querySelector('.modal-close');  //adds event listener to close the modal
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });
       
   nextBtn.addEventListener('click', ()=>{
        const index = employees.indexOf(person);
        if(index < employees.length - 1){
            overlay.innerHTML = '';
            generateModal(employees[index + 1]);
        }
   })
   prevBtn.addEventListener('click', ()=>{
    const index = employees.indexOf(person);
    if(index > employees.length - 1){
        overlay.innerHTML = '';
        generateModal(employees[index - 1]);
    }
})
};

//************************************************ */
//* Checks the response and handles the response from the API
//********************************************** */
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

//************************************************ */
//* Event listener for the modal
//********************************************** */
grid.addEventListener('click', (e) => {         //event listener for the modal
    const card = e.target.closest('.card')
    if(card){
        const index = card.getAttribute('data-index');
        const person = employees[index];
        generateModal(person);
    }
});

input.addEventListener('keyup', (e) => {        //search functionality
    const search = input.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        if(name.includes(search)){
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
})

