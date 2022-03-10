//fetch stuff
var results = []


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
        document.querySelector('#events-list-home').innerHTML = ""
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

            const newResults = results.slice(0, 3);
            console.log(newResults)
            console.log(results)

            newResults.forEach(function (element) {
                /*put each item on the page in a li*/
                var eventTitle = document.createElement("h3")
                eventTitle.innerHTML = element["title"]

                //date and calendar display next to eachother
                var dateDiv = document.createElement('div')
                var image = document.createElement('img')
                image.classList.add("cal-icon")
                image.src = 'img/calendar-icon.png'
                var eventDate = document.createElement("h4")
                eventDate.classList.add("eventdate")
                eventDate.innerHTML = element["date"]


                var eventDiv = document.createElement("div")
                eventDiv.className = "event-div-home";
                var eventTime = document.createElement("p")
                eventTime.innerHTML = element["time"]
                var eventSpeaker = document.createElement("p")
                eventSpeaker.innerHTML = element["speaker"]
                var eventSpeakerName = document.createElement("p")
                eventSpeakerName.innerHTML = element["speakerTitle"]
                var eventDescription = document.createElement("p")
                eventDescription.innerHTML = element["description"]
                var eventWhere = document.createElement("p")
                eventWhere.innerHTML = element["where"]
                eventWhere.className = "event-where-home"

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


                //events list on home page
                var eventListHome = document.createElement("li")
                eventListHome.appendChild(eventTitle)
                dateDiv.appendChild(image)
                dateDiv.appendChild(eventDate)
                eventDiv.appendChild(eventTime)
                eventDiv.appendChild(eventWhere)
                eventListHome.appendChild(dateDiv)
                eventListHome.appendChild(eventDiv)
                dateDiv.classList.add("d-flex")
                eventListHome.classList.add("card")
                eventListHome.classList.add("p-3")
                eventListHome.classList.add("col-lg-3")

                document.querySelector('#events-list-home').appendChild(eventListHome)


                // if link says tbd then do not display a tag
                if (element["link"] == "TBD") {
                    eventLink.remove();
                    var tbd = document.createElement("h4")
                    tbd.innerHTML = "More information coming soon"
                    eventListHome.appendChild(tbd)
                }
            })


        })
}

function getUrl() {
    return 'https://bdaley.npkn.net/dmd-hub-json/events?'
}
getData('https://bdaley.npkn.net/dmd-hub-json/events')

