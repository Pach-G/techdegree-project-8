//  =========
//  Variables
//  =========
const urlApi = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
let employees = [];
const gridContainer = document.querySelector('.main-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
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
  gridContainer.insertAdjacentHTML('beforeend', employeeHTML);
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
  modalContainer.innerHTML = modalHTML;
  console.log(street);
}

//  ===============
//  Event Listeners
//  ===============

// Modal event listener
gridContainer.addEventListener('click', (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

modalClose.addEventListener('click',
                            () => overlay.classList.add('hidden'));

search.addEventListener('keyup', (e) => {
  let currentValue = e.target.value.toLowerCase();
  let employee = document.querySelectorAll('h2.name');

  employee.forEach(employee => {
    let card = employee.parentNode.parentNode;

    if (employee.textContent.toLowerCase().includes(currentValue)) {
      card.style.display = 'block';
    }
    else {
      card.style.display = 'none';
    }
  });
});

