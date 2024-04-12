// json-data
fetch("../json/destination.json")
.then((res)=> res.json())
.then((data)=> localStorage.setItem("data",JSON.stringify(data)))

// search functionality
const searchInputs = document.querySelectorAll(".dest-search");
const searchSuggest = document.querySelectorAll(".search-suggst"); 
let destinationData = JSON.parse(localStorage.getItem("data"));

searchInputs.forEach((searchInput,index)=>{
  searchInput.addEventListener("keyup" , (e)=>{
    searchSuggest[index].innerHTML = "";
    let searchInputValue = e.target.value;
    // console.log(destinationData , searchInputValue);
    // searchSuggest.style.display = "block";
    
    
    if(searchInputValue.length){
        let searched =  destinationData.filter((destination)=>{
            return destination.city.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1
              
        })
        console.log(searched);
        searched.map((one)=>{
            // console.log(one)
            searchSuggest.forEach((search)=>{
                search.style.display = "none";
            })
            // console.log(searchSuggest[index])
            searchSuggest[index].style.display = "block";
            
            searchSuggest[index].innerHTML +=`
                <div class="search-suggst-container flex-merely" >
                        <i class="fas fa-plane"></i>
                        <div class="dest">
                            <div class="top">
                                <span class="city" onclick="addValue(${index},this)"> ${one.city} </span>
                                <span> (${one.code}) </span>
                            </div>
                            <div class="bottom">
                                <p> ${one.country} </p>
                            </div> 
                        </div>
                </div> 
            `
        })
        
    }else{
        searchSuggest[index].style.display = "none";
    }

    
  })
})

const addValue = (index , same)=>{
    searchInputs[index].value = same.innerHTML
    // console.log(same.innerHTML)
    searchSuggest[index].style.display = "none";
}

// calender-functionality
const currentMonth = document.querySelector(".current-month");
const nextMonth = document.querySelector(".next-month");
const currentMonthDays = document.querySelector(".current-month-days");
const nextMonthDays = document.querySelector(".next-month-days");
const nextPrevIcons = document.querySelectorAll(".arrows i"); 

let date = new Date();
let currMonth = date.getMonth();
let neMonth = date.getMonth() + 1;
let currYear = date.getFullYear();

const months = [ "January" , "February" , "March" , "April" , "May" , "June" ,
 "July" , "August" , "September" , "October" , "November" , "December"
]

const renderCalender = ()=>{
    currentMonth.innerHTML = months[currMonth];
    nextMonth.innerHTML = months[neMonth];

    // days
    let firstDaysOfMonth = new Date(currYear , currMonth , 1).getDay(); // get first day of month
    let lastDateOfMonth = new Date(currYear , currMonth + 1, 0).getDate(); // get last date of month
    let lastDaysOfMonth = new Date(currYear , currMonth , lastDateOfMonth).getDay(); //get last day of month
    let lastDateOfLastMonth = new Date(currYear,currMonth, 0).getDate(); //get last Day of prev month
    currentMonthDays.innerHTML = "";

    
    // previous month last days
    for(let x = firstDaysOfMonth ; x > 0 ; x--){
        currentMonthDays.innerHTML += `<li class="inactive"> ${lastDateOfLastMonth - x + 1} </li>`
    }

    // all days of current month
    for(let x = 1 ; x <= lastDateOfMonth ; x++){
        currentMonthDays.innerHTML += `<li> ${x} </li>`
    }

    // next month first days
    for(let x = lastDaysOfMonth ; x <  6 ; x++){
        currentMonthDays.innerHTML += `<li class="inactive"> ${x - lastDaysOfMonth + 1} </li>`
    }


    let firstDaysOfMonthNext = new Date(currYear , currMonth , 1).getDay(); // get first day of month
    let lastDayOfNextMonth = new Date(currYear , currMonth + 2,0).getDate(); //get last date of month
    let lastDaysOfMonthNext = new Date(currYear , currMonth  , lastDayOfNextMonth).getDay(); //get last day of month
    let lastDateOfLastMonthNext = new Date(currYear, currMonth + 1, 0).getDate(); //get last Days of prev month

     console.log(lastDaysOfMonthNext)
    nextMonthDays.innerHTML = "";

    // next month all days
    for(let y = 1 ; y <= lastDayOfNextMonth ; y++){
        nextMonthDays.innerHTML += `<li> ${y} </li>`
    }

    // previous month last days
    for(let x = firstDaysOfMonthNext ; x > 0 ; x--){
        nextMonthDays.innerHTML += `<li class="inactive"> ${lastDateOfLastMonthNext - x + 1} </li>`
    }

    // next month first days
    for(let x = lastDaysOfMonthNext ; x <  6 ; x++){
        nextMonthDays.innerHTML += `<li class="inactive"> ${x - lastDaysOfMonthNext + 1} </li>`
    }
}

renderCalender();

// next-prev-arrows
let minmumMonth = currMonth;
let maximumMonth = 11

nextPrevIcons.forEach((icon)=>{
    icon.addEventListener("click",()=>{
        if(icon.id === "prev" && currMonth > minmumMonth){
            currMonth = currMonth - 1;
            neMonth = neMonth - 1
            icon.classList.add("stoped");
        }else if(icon.id === "next" && currMonth <= maximumMonth){
            currMonth = currMonth + 1;
            neMonth = neMonth + 1;
            console.log("go")
        }else if(icon.id === "next" && currMonth === 12){
            // 
            console.log("stop")
        }
        renderCalender();
    })
})