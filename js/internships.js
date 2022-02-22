var app = new Vue({
  el: '#app',
  data: {
    internships: [],
    companies: [],
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


  }
})
