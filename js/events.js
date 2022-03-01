//fetch stuff
var results = []

class Event {
    constructor(date, title, speaker, speakerTitle, description, link, time, where) {
        this.date = date
        this.title = title
        this.speaker = speaker
        this.speakerTitle = speakerTitle
        this.description = description
        this.link = link
        this.time = time
        this.where = where
        results.push(this)
    }
}

async function getData(url) {
    /*clear the event list and page*/
    if (results != null) {
        results = []
        document.querySelector('#events-list').innerHTML = ""
    }

    //actual fetch
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            /*create new course*/
            for (i in data) {
                new Event(data[i].date, data[i].title, data[i].speaker, data[i].speakerTitle, data[i].description, data[i].link, data[i].time, data[i].where)
            }

            results.forEach(function (element) {
                /*put each item on the page in a li*/
                var eventTitle = document.createElement("h2")
                eventTitle.innerHTML = element["title"]
                var eventDate = document.createElement("h4")
                eventDate.innerHTML = element["date"]
                var eventSpeaker = document.createElement("p")
                eventSpeaker.innerHTML = element["speaker"]
                var eventSpeakerName = document.createElement("p")
                eventSpeakerName.innerHTML = element["speakerTitle"]
                var eventDescription = document.createElement("p")
                eventDescription.innerHTML = element["description"]
                var eventTime = document.createElement("p")
                eventTime.innerHTML = element["time"]
                var eventWhere = document.createElement("p")
                eventWhere.innerHTML = element["where"]

                //create a element
                var eventLink = document.createElement("a")
                //create string of URL
                var eventLinkUrl = document.createTextNode(element["link"])
                //append text node to anchor element
                eventLink.appendChild(eventLinkUrl)
                //set button text to  view more
                eventLink.innerHTML = "View More"
                //assign URL to  href of a tag
                eventLink.href = element["link"]
                //add classes for style
                eventLink.classList.add("btn")
                eventLink.classList.add("btn-secondary")

                var eventList = document.createElement("li")
                eventList.appendChild(eventTitle)
                eventList.appendChild(eventDate)
                eventList.appendChild(eventSpeaker)
                eventList.appendChild(eventSpeakerName)
                eventList.appendChild(eventTime)
                eventList.appendChild(eventWhere)
                eventList.appendChild(eventDescription)
                eventList.appendChild(eventLink)
                eventList.classList.add("card")
                eventList.classList.add("p-3")
                eventList.classList.add("col-md-4")
                document.querySelector('#events-list').appendChild(eventList)

                if (element["link"] == "TBD") {
                    console.log("yuh");
                    console.log(eventLink);
                    eventLink.remove();
                    var tbd = document.createElement("h4")
                    tbd.innerHTML = "More information coming soon"
                    eventList.appendChild(tbd)
                }

            })
            var numresults = document.getElementById('numresults')
            numresults.innerHTML = "Results: " + data.length

        })
}

function getUrl() {
    console.log('https://bdaley.npkn.net/dmd-hub-json/events?')
    return 'https://bdaley.npkn.net/dmd-hub-json/events?'
}

getData('https://bdaley.npkn.net/dmd-hub-json/events')