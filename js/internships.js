var app = new Vue({
  el: '#app',
  data: {
    internships: [],

  },
  async created() {
    const response = await fetch("https://bdaley.npkn.net/dmd-hub-json/internships");
    this.internships = await response.json();
  }
})
