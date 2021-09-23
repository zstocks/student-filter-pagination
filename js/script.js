/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/ 

// create and insert search form onto page
const searchFormHTML = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
document.querySelector('.header').insertAdjacentHTML('beforeend', searchFormHTML);

// create and insert new div used to display a 'no search results' message
const noResults = document.createElement('div');
noResults.className = 'no-results';
document.querySelector('.page').append(noResults);

// select DOM elements that will be used throughout the app
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.student-search button');

/**
 * creates and inserts elements needed to display a "page" of nine students
 * 
 * @param {array} list - an array containing student data to be accessed and displayed
 * @param {number} page - the page number corresponding to the pagination button that was clicked (1 on page load)
 */
const showPage = (list, page) => {
   // set variables to create a range of nine indexes corresponding to the students to be shown on the page being generated
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   //clear out student-list ul element
   studentList.innerHTML = '';
   // generate HTML for the list items and insert them into the page
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const li = `
         <li class="student-item cf">
           <div class="student-details">
             <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
             <h3>${list[i].name.first + ' ' + list[i].name.last}</h3>
             <span class="email">${list[i].email}</span>
           </div>
           <div class="joined-details">
             <span class="date">Joined ${list[i].registered.date}</span>
           </div>
         </li>`;
         studentList.insertAdjacentHTML('beforeend', li);
      }
   }
}

/**
 * creates and inserts elements needed to display the pagination buttons
 * 
 * @param (array) list - an array containing student data
 */
const addPagination = list => {
   // get number of needed pages and clear out the link-list ul element
   const pages = list.length / 9;
   linkList.innerHTML = '';
   // generate HTML for the buttons and insert them into the page
   for (let i = 0; i < pages; i++) {
      const li = `
      <li>
         <button type="button">${i + 1}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', li);
   }
   // give the first pagination button the class 'active'
   const paginationButtons = document.querySelectorAll('.link-list li > button');
   paginationButtons[0].className = 'active';
   // when a button is clicked set 'active' class to clicked button and display students for that page
   linkList.addEventListener('click', (e) => {
      const btnClicked = e.target;
      if (btnClicked.tagName === 'BUTTON') {
         for (const button of paginationButtons) {
            button.className = '';
         }
         btnClicked.className = 'active';
         showPage(list, btnClicked.textContent);
      }
   });
}

/**
 * filters students by comparing student names to search input
 */
const filterResults = () => {
   let newList = [];
   const searchTerm = searchInput.value.toUpperCase();
   // add students from the data array with names matching search input to the newList array
   for (let i = 0; i < data.length; i++) {
      const name = (data[i].name.first + ' ' + data[i].name.last).toUpperCase();
      if (name.includes(searchTerm)) {
         newList.push(data[i]);
      }
   }
   // clear any text out of the no-results block that may exist from a previous search
   noResults.innerHTML = '';
   // if search returns no result, display only the 'no results' message - otherwise, display filtered results
   if (newList.length < 1) {
      noResults.textContent = 'Sorry, your search did not match any results.';
      studentList.innerHTML = '';
      linkList.innerHTML = '';
   } else {
      showPage(newList, 1);
      addPagination(newList);
   }
}

// display students and pagination on the page
showPage(data, 1);
addPagination(data);

// filter results when user performs a search
searchInput.addEventListener('keyup', filterResults);
searchBtn.addEventListener('click', filterResults);