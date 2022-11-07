//  =========
//  Variables
//  =========

//  URLs
//  ----
const urlApi = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;

//  Cards
//  -----
const mainContainer = document.querySelector('.main-container');
const employeeCards = document.getElementById('employee-cards');
let employees = [];

//  Modal
//  ----- 
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalSwitch = document.querySelector('.modal-switch');
let cardIndex;

//  Searchbar
//  ---------
const search = document.getElementById('search');


// fetch data from api
fetch(urlApi)
  .then(response => response.json())
  .then(response => response.results)
  .then(displayEmployees)
  .catch(error => console.log(error));


//  =========
//  Functions
//  =========

//   adds and displays fetched employees html
function displayEmployees(employeeData) {
  employees = employeeData;

  // store the employee HTML
  let employeeHTML = '';

//  Loop through each employee  and create HTML markup
  employees.forEach(
    (employee, index) => {
      let name = employee.name;
      let email = employee.email;
      let city = employee.location.city;
      let picture = employee.picture;

      employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}"  alt="profile picture"/>
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
      `;
    });
  employeeCards.insertAdjacentHTML('afterbegin', employeeHTML);
}

//   Creates modal body
function displayModal(index) {
  let {
    name, dob, phone, email,
    location: {
      city, street, state, postcode,
    },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img class="avatar" src="${picture.large}"  alt="Profile image"/>
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p>Birthday: &#20 ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

  overlay.classList.remove("hidden");
  modalContent.innerHTML = modalHTML;
  cardIndex = index;
}

//  ===============
//  Event Listeners
//  ===============

// Modal event listeners
// ---------------------
employeeCards.addEventListener('click', (e) => {
  if (e.target !== employeeCards) {
    console.log(e.target);
    // const card = e.target;
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

modalClose.addEventListener('click',
                            () => overlay.classList.add('hidden'));

modalSwitch.addEventListener('click', (e) => {
  const button = e.target;

  if (button.textContent.toLowerCase() === 'next') {
    if (cardIndex >= 11) {
      cardIndex = 0;
      displayModal(cardIndex);
    }
    else {
      cardIndex++;
      displayModal(cardIndex);
    }

  }
  else {
    if (cardIndex === 0) {
      cardIndex = 11;
      displayModal(cardIndex);
    }
    else {
      cardIndex--;
      displayModal(cardIndex);
    }
  }
});

// Search bar event listener
// -------------------------
search.addEventListener('keyup', (e) => {
  let currentValue = e.target.value.toLowerCase();
  let employee = document.querySelectorAll('h2.name');

  employee.forEach(employee => {
    let card = employee.parentNode.parentNode;

    if (employee.textContent.toLowerCase().includes(currentValue)) {
      card.style.display = 'flex';
    }
    else {
      card.style.display = 'none';
    }
  });
});

