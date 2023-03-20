// Array of internships
let internships = [];

// Options for select boxes
let companies = [];
let concentrations = [];
let jobTypes = [];
/*
let dateRanges = [
  'within last 7 days',
  'within last 14 days',
  'within last 21 days',
  'within last month',
];*/

var companyvalue = ""
var company = document.getElementById('companyFilter')
var numresults = document.getElementById('numresults')

var concentrationvalue = ""
var concentration = document.getElementById('concentrationFilter')

var job_typevalue = ""
var job_type= document.getElementById('jobTypeFilter')

var datePostedValue = ""
var datePostedFilter= document.getElementById('datePostedFilter')

var dateExpirationValue = ""
var dateExpirationFilter= document.getElementById('dateExpirationFilter')

var locationvalue = ""
var locationFilter = document.getElementById('locationFilter') 




async function getAllInternships(){
  displayLoading()
  const response = await fetch("https://bdaley.npkn.net/dmd-hub-json/internships?"+companyvalue+concentrationvalue+job_typevalue+datePostedValue+dateExpirationValue+locationvalue);
  console.log("https://bdaley.npkn.net/dmd-hub-json/internships?"+companyvalue+concentrationvalue+job_typevalue+datePostedValue+dateExpirationValue+locationvalue)
  //const response = await fetch("internships.json");
  return await response.json();
}

function outputInternships() {
  let output = '';
  for(internship of internships){
    output += `
      <li class="foundation">
        <h2>${ internship.title }</h2>
        <h4>${ internship.company }</h4>
        <p>Locations: ${ internship.location }</p>
        <p>Concentration: ${ internship.concentration }</p>
        <p>Date Posted: ${ internship.dateposted }</p>
        <p>Date Expiration: ${ internship.dateexpiration }</p>
        <p class="course-description">${ internship.description }</p>
        <br>
        <a href="${internship.apply}" class="btn btn-primary" target="_blank">Apply</a>
      </li>
    `
  }
  document.querySelector('#course-list').innerHTML = output;
  numresults.innerHTML="Results: "+internships.length
  hideLoading()
}


// Stuff to run when the DOM is ready
window.addEventListener('DOMContentLoaded', async () =>{

  internships = await getAllInternships()

  // Get lists for <select> boxes
  internships.forEach(row =>{

    // Populate list of companies
    if(!companies.includes(row.company)){
      companies.push(row.company)
      document.querySelector('#companyFilter').innerHTML += `<option value="${row.company.toLowerCase()}">${row.company}</option>`
    }

    // Populate list of concentrations
    if(!concentrations.includes(row.concentration)){
      concentrations.push(row.concentration)
      document.querySelector('#concentrationFilter').innerHTML += `<option>${row.concentration}</option>`
    }

    // Populate list of job types
    if(!jobTypes.includes(row.jobtype)){
      jobTypes.push(row.jobtype)
      document.querySelector('#jobTypeFilter').innerHTML += `<option>${row.jobtype}</option>`
    }
  })

    /*Populate list of date ranges
    for(range of dateRanges){
      document.querySelector('#datePostedFilter').innerHTML += `<option>${range}</option>`
    }*/

  outputInternships();
  displayDropdown()

})

// Run a keyword search
document.querySelector('#search-listener').addEventListener('submit', async (event)=>{
  event.preventDefault()
  internships = [];
  const query = document.querySelector('#searchText').value;
  let allInternships = await this.getAllInternships();

  allInternships.forEach(listing => {
    console.log(listing)
    if((listing.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      listing.description.toLowerCase().indexOf(query.toLowerCase()) !== -1) ){
      internships.push(listing)
    }
  });
  outputInternships();
})

// company filtering

async function allFiltering(){
  internships = [];
  internships = await getAllInternships()
  outputInternships();
}

// dropdown design
function displayDropdown(){
  var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;

        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();

        /*change value for fetch url based off dropdown*/
        companyvalue = '&company='+company.value
        if (company.value==='all'){
          companyvalue = ""
        }

        concentrationvalue = '&concentration='+concentration.value.toLowerCase()
        if (concentration.value==='all'){
          concentrationvalue = ""
        }

        job_typevalue = '&jobtype='+job_type.value.toLowerCase()
        if (job_type.value==='all'){
          job_typevalue = ""
        }

        datePostedValue = '&days='+datePostedFilter.value
        if(datePostedFilter.value === ''){
          datePostedValue = ''
        }
      
        dateExpirationValue = '&days='+dateExpirationFilter.value
        if(dateExpirationFilter.value === ''){
          dateExpirationValue = ''
        }

        
        locationvalue = '&location='+locationFilter.value
        if(locationFilter.value === ''){
          locationvalue = ''
        }

        allFiltering()


    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
}

// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}


// var app = new Vue({
//   el: '#app',
//   data: {
//     internships: [],

//     companies: [],
//     companyFilter: null,

//     concentrations: [],
//     concentrationFilter: null,

//     jobTypes: [],
//     jobTypesFilter: null,

//     dateRanges: [
//       'within last 7 days',
//       'within last 14 days',
//       'within last 21 days',
//       'within last month',
//     ],
//     datePostedFilter: null,

//     searchText: ''

//   },
//   methods: {
//     searchByKeyword: async function() {

//       this.reset();
//       let internships = await this.getData();

//       internships.forEach(listing => {
//         if(listing.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 ||
//           listing.description.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1){
//           this.internships.push(listing)
//         }
//       });

//     },
//     filterByCompany: async function(){

//       this.reset();
//       let internships = await this.getData();

//       internships.forEach(listing => {
//         if(listing.company == this.companyFilter){
//           this.internships.push(listing)
//         }
//       });


//     },
//     filterByConcentration: async function(){

//       this.reset();
//       let internships = await this.getData();

//       internships.forEach(listing => {
//         if(listing.concentration == this.concentrationFilter){
//           console.log(this.internships)
//         }
//       });

//     },
//     filterByJobType: function(){
//       console.log(`User wants to filter by job type: ${this.jobTypesFilter}`)
//     },
//     filterByDatePosted: function(){
//       console.log(`User wants to filter by date posted: ${this.datePostedFilter}`)
//     },
//     getData: async function(){
//       const response = await fetch("internships.json");
//       return await response.json();
//     },
//     reset: function() {
//       this.internships = [];
//       //this.companies = [];
//     }
//   },
//   async created() {
//      //const response = await fetch("https://bdaley.npkn.net/dmd-hub-json/internships");
//     this.internships = await this.getData();

//     // Get lists for <select> boxes
//     this.internships.forEach(row =>{
//       console.log(row)

//       // Populate list of companies
//       if(!this.companies.includes(row.company)){
//         this.companies.push(row.company)
//       }

//       // Populate list of concentrations
//       if(!this.concentrations.includes(row.concentration)){
//         this.concentrations.push(row.concentration)
//       }

//       // Populate list of job types
//       if(!this.jobTypes.includes(row.job_type)){
//         this.jobTypes.push(row.job_type)
//       }


//     })

//   }
// })
