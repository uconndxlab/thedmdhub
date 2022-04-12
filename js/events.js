//fetch stuff
var results = []
var eventArray = []

class Event {
    constructor(date, time, title, speaker, speakerTitle, description, link, where) {
        this.date = date
        this.time = time
        this.title = title
        this.speaker = speaker
        this.speakerTitle = speakerTitle
        this.description = description
        this.link = link
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
                new Event(data[i].date, data[i].time, data[i].title, data[i].speaker, data[i].speakerTitle, data[i].description, data[i].link, data[i].where)
            }

            results.forEach(function (element) {
                /*put each item on the page in a li*/
                var eventTitle = document.createElement("h2")
                eventTitle.innerHTML = element["title"]
                eventTitle.className = "event-title";
                var eventDate = document.createElement("h4")
                eventDate.innerHTML = element["date"]
                eventDate.className = "event-date";
                var eventDiv = document.createElement("div")
                eventDiv.className = "event-div";
                var eventTime = document.createElement("p")
                eventTime.innerHTML = element["time"]
                eventTime.className = "event-time";
                var eventSpeaker = document.createElement("p")
                eventSpeaker.innerHTML = element["speaker"];
                eventSpeaker.className = "event-speaker";
                var eventSpeakerName = document.createElement("p")
                eventSpeakerName.innerHTML = element["speakerTitle"]
                eventSpeakerName.className = "event-speaker-title";
                var speakerDiv = document.createElement("div")
                speakerDiv.className = "speaker-div";
                var eventDescription = document.createElement("p")
                eventDescription.innerHTML = element["description"]
                eventDescription.className = "event-description";
                var eventWhere = document.createElement("p")
                eventWhere.innerHTML = element["where"]
                eventWhere.className = "event-where";
                eventDiv.appendChild(eventTime)
                eventDiv.appendChild(eventWhere)
                speakerDiv.appendChild(eventSpeaker)
                speakerDiv.appendChild(eventSpeakerName)



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

                //events page list
                var eventList = document.createElement("li")
                var eventbtnDiv = document.createElement("div")
                eventList.appendChild(eventTitle)
                eventList.appendChild(eventDate)
                eventList.appendChild(eventDiv)
                //eventList.appendChild(eventTime)
                //eventList.appendChild(eventWhere)
                eventList.appendChild(speakerDiv)
                eventList.appendChild(eventDescription)
                eventbtnDiv.appendChild(eventLink)
                eventList.appendChild(eventbtnDiv)
                eventList.classList.add("card")
                eventList.classList.add("p-4")
                eventList.classList.add("col-md-3")
                document.querySelector('#events-list').appendChild(eventList)


                // if link says tbd then do not display a tag
                if (element["link"] == "TBD") {
                    eventLink.remove();
                    var tbd = document.createElement("h4")
                    tbd.innerHTML = "More information coming soon!"
                    tbd.className = "event-tbd";
                    eventList.appendChild(tbd)
                }

                //if time says tbd then do not display a tag
                //if (element["time"] == "TBD") {
                //    eventTime.remove();
                //    var timeEmpty = document.createElement("h4")
                //    timeEmply.innerHTML = "Time TBD"
                //    timeEmpty.className = "event-time-tbd";
                //   eventList.appendChild(timeEmpty)
                //}
            })
        })
}

function getUrl() {
    return 'https://bdaley.npkn.net/dmd-hub-json/events?'
}

getData('https://bdaley.npkn.net/dmd-hub-json/events')