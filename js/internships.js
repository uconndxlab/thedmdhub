var app = new Vue({
  el: '#app',
  data: {
    internships: [],

    companies: [],
    companyFilter: null,

    concentrations: [],
    concentrationFilter: null,

    jobTypes: [],
    jobTypesFilter: null,

    dateRanges: [
      'within last 7 days',
      'within last 14 days',
      'within last 21 days',
      'within last month',
    ],
    datePostedFilter: null,

    searchText: ''

  },
  methods: {
    searchByKeyword: async function() {

      this.reset();
      let internships = await this.getData();

      internships.forEach(row => {
        if(row.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 ||
          row.description.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1){
          this.internships.push(row)
        }
      });

    },
    filterByCompany: function(){
      console.log(`User wants to filter by company: ${this.companyFilter}`)
    },
    filterByConcentration: function(){
      console.log(`User wants to filter by concentration: ${this.concentrationFilter}`)
    },
    filterByJobType: function(){
      console.log(`User wants to filter by job type: ${this.jobTypesFilter}`)
    },
    filterByDatePosted: function(){
      console.log(`User wants to filter by date posted: ${this.datePostedFilter}`)
    },
    getData: async function(){
      const response = await fetch("internships.json");
      return await response.json();
    },
    reset: function() {
      this.internships = [];
    }
  },
  async created() {
    // const response = await fetch("https://bdaley.npkn.net/dmd-hub-json/internships");
    this.internships = await this.getData();

    // Get lists for <select> boxes
    this.internships.forEach(row =>{
      console.log(row)

      // Populate list of companies
      if(!this.companies.includes(row.company)){
        this.companies.push(row.company)
      }

      // Populate list of concentrations
      if(!this.concentrations.includes(row.concentration)){
        this.concentrations.push(row.concentration)
      }

      // Populate list of job types
      if(!this.jobTypes.includes(row.job_type)){
        this.jobTypes.push(row.job_type)
      }


    })

  }
})
