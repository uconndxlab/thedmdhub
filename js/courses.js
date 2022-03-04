var courses = []
var semestervalue = ""
var concentrationvalue = ""
var dayvalue = ""
var requiredvalue = ""
var concentration = document.getElementById('concentration')
var semester = document.getElementById('semester')
var day = document.getElementById('day')
var required = document.getElementById('required')


async function getAllCourses(){
  const response = await fetch('https://bdaley.npkn.net/dmd-hub-json/courses?'+semestervalue+concentrationvalue+dayvalue+requiredvalue);
  //const response = await fetch("internships.json");
  return await response.json();
}

function outputCourses() {
  document.querySelector('#course-list').innerHTML = ""
  for(course of courses){
    var resourcenumber = document.createElement("h3")
    resourcenumber.innerHTML = course.number + " - "+course.title
    var resourcesemester = document.createElement("img")
    var resourcedescription = document.createElement("p")
    resourcedescription.innerHTML = course.description
    resourcedescription.classList.add('course-description')
    var resourceday = document.createElement("h6")
    resourceday.innerHTML = course.day
    var resourcerequired = document.createElement("p")
    resourcerequired.innerHTML = course.required + " required"
    var resourceconcentration = document.createElement("h4")
    var listresource = document.createElement("li")
    listresource.appendChild(resourcenumber)
    /*update innerHTML to be the proper title based off the value*/
    if ((course.concentration) === "Foundation"){
      resourceconcentration.innerHTML = "Foundation"
      listresource.appendChild(resourceconcentration)
      listresource.classList.add("foundation")
    }
    else if ((course.concentration) === "Web"){
      resourceconcentration.innerHTML = "Web / Interactive Media Design"
      listresource.appendChild(resourceconcentration)
      listresource.classList.add("web")
    }
    /*give proper icon based off semester*/
    if ((course.semester)==="Fall"){
      resourcesemester.setAttribute('src','img/fall.png')
    }
    else if ((course.semester)==="Spring"){
      resourcesemester.setAttribute('src','img/spring.png')
    }
    else if ((course.semester)==="Both"){
      resourcesemester.setAttribute('src','img/both.jpg')
    }
    resourcesemester.classList.add('course-semester-icon')
    listresource.appendChild(resourcerequired)
    listresource.appendChild(resourcedescription)
    var divresource = document.createElement('div')
    divresource.classList.add('courses-semester-day')
    divresource.appendChild(resourcesemester)
    divresource.appendChild(resourceday)
    listresource.appendChild(divresource)
    document.querySelector('#course-list').appendChild(listresource)
  }
  numresults.innerHTML="Results: "+courses.length
}


// Stuff to run when the DOM is ready
window.addEventListener('DOMContentLoaded', async () =>{
  courses = await getAllCourses()
  outputCourses();

})

// Run a keyword search
document.querySelector('#searchBtn').addEventListener('click', async () =>{
  courses = [];
  const query = document.querySelector('#searchText').value;
  let allCourses = await this.getAllCourses();

  allCourses.forEach(listing => {
    if(listing.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      listing.description.toLowerCase().indexOf(query.toLowerCase()) !== -1){
      courses.push(listing)
    }
  });
  outputCourses();
})

// company filtering

async function allFiltering(){
  courses = [];
  courses = await getAllCourses()
  outputCourses();
}




//dropdown stuff

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
        semestervalue = '&semester='+semester.value
        if (semester.value==='all'){
          semestervalue = ""
        }
        concentrationvalue = '&concentration='+concentration.value
        if (concentration.value==='all'){
          concentrationvalue = ""
        }
        dayvalue = '&day='+day.value
        if (day.value==='all'){
          dayvalue = ""
        }
        requiredvalue = '&required='+required.value
        if (required.value==='all'){
          requiredvalue = ""
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