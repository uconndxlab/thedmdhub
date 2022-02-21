var app = new Vue({
    el: '#app',
    data: {
        events: [],

    },
    async created() {
        const response = await fetch("https://bdaley.npkn.net/dmd-hub-json/events");
        this.events = await response.json();
    }
})