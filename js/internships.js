// Array of internships
let internships = [];

// Options for select boxes
let companies = [];
let concentrations = [];
let jobTypes = [];
let dateRanges = [
  'within last 7 days',
  'within last 14 days',
  'within last 21 days',
  'within last month',
];


async function getAllInternships(){
  // const response = await fetch("https://bdaley.npkn.net/dmd-hub-json/internships");
  const response = await fetch("internships.json");
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
        <p class="course-description">${ internship.description }</p>
        <br>
        <a href="${internship.apply}" class="btn btn-primary">Apply</a>
      </li>
    `
  }
  document.querySelector('#course-list').innerHTML = output;
}


// Stuff to run when the DOM is ready
window.addEventListener('DOMContentLoaded', async () =>{
  internships = await getAllInternships()

  // Get lists for <select> boxes
  internships.forEach(row =>{

    // Populate list of companies
    if(!companies.includes(row.company)){
      companies.push(row.company)
      document.querySelector('#companyFilter').innerHTML += `<option>${row.company}</option>`
    }

    // Populate list of concentrations
    if(!concentrations.includes(row.concentration)){
      concentrations.push(row.concentration)
      document.querySelector('#concentrationFilter').innerHTML += `<option>${row.concentration}</option>`

    }

    // Populate list of job types
    if(!jobTypes.includes(row.job_type)){
      jobTypes.push(row.job_type)
      document.querySelector('#jobTypeFilter').innerHTML += `<option>${row.job_type}</option>`
    }
  })

    // Populate list of date ranges
    for(range of dateRanges){
      document.querySelector('#datePostedFilter').innerHTML += `<option>${range}</option>`
    }

  outputInternships();

})

// Run a keyword search
document.querySelector('#searchBtn').addEventListener('click', async () =>{
  internships = [];
  const query = document.querySelector('#searchText').value;
  let allInternships = await this.getAllInternships();

  allInternships.forEach(listing => {
    console.log(listing)
    if(listing.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      listing.description.toLowerCase().indexOf(query.toLowerCase()) !== -1){
      internships.push(listing)
    }
  });
  outputInternships();
})



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
