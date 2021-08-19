/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/ 



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/**
 * Creates and inserts elements needed to display a "page" of nine students
 * 
 * @param {array} list - an array containing student data to be accessed and displayed
 * @param {number} page - the page number corresponding to the pagination button that was clicked (1 on page load)
 */
const showPage = (list, page) => {
   // set variables to create  a range of nine indexes to be shown on the page based on the page number clicked
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');

   //Clear any students from student-list
   studentList.innerHTML = '';

   // loop through the list element
   for (let i = 0; i < list.length; i++) {

      // generate HTML for the list items to be shown on the page 
      if (i >= startIndex && i < endIndex) {
         const li = `
         <li class="student-item cf">
           <div class="student-details">
             <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
             <h3>${data[i].name.first + ' ' + data[i].name.last}</h3>
             <span class="email">${data[i].email}</span>
           </div>
           <div class="joined-details">
             <span class="date">Joined ${data[i].registered.date}</span>
           </div>
         </li>`;

         // insert the HTML into the student-list ul element
         studentList.insertAdjacentHTML('beforeend', li);
      }
   }
}

/**
 * Creates and inserts elements needed to display the pagination buttons
 * 
 * @param (array) list - an array containing student data
 */
const addPagination = list => {
   // get number of needed pages
   const pages = list.length / 9;
   const linkList = document.querySelector('.link-list');

   // clear any previous data from link-list
   linkList.innerHTML = '';

   //loop over pages to generate HTML for the number of needed buttons
   for (let i = 0; i < pages; i++) {
      const li = `
      <li>
         <button type="button">${i + 1}</button>
      </li>`;

      // insert HTML into the link-list ul element
      linkList.insertAdjacentHTML('beforeend', li);
   }

   // give the first pagination button the class 'active'
   const paginationButtons = document.querySelectorAll('.link-list li > button');
   paginationButtons[0].className = 'active';

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



// Call functions
showPage(data, 1);
addPagination(data);
