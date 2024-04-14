// json-data
fetch("../json/destination.json")
.then((res)=> res.json())
.then((data)=> localStorage.setItem("data",JSON.stringify(data)))

// rotate-arrows
const destArrowsParent =  document.querySelectorAll(".dest-arrows");
const destArrows =  document.querySelectorAll(".dest-arrows i");

destArrowsParent.forEach((parent)=>{
    parent.addEventListener("click",()=>{
        destArrows.forEach((arrow)=>{
            arrow.classList.toggle("rotate")
        })
        
    })
})

// open-one && close the rest
const clickableInputs = document.querySelectorAll(".clickable");
const clickSun = document.querySelectorAll(".clic-sun");
const searchInputs = document.querySelectorAll(".dest-search");
const searchSuggest = document.querySelectorAll(".search-suggst");

clickableInputs.forEach((input,index)=>{
    input.addEventListener("click",()=>{
        clickSun.forEach(sun => sun.style.display = "none");
        searchSuggest.forEach(suggest => suggest.style.display = "none");
        clickSun[index].style.display = "block";
    })  
})


// search functionality
let destinationData = JSON.parse(localStorage.getItem("data"));

searchInputs.forEach((searchInput,index)=>{
  searchInput.addEventListener("keyup" , (e)=>{
    clickSun.forEach(sun => sun.style.display = "none");
    searchSuggest[index].innerHTML = "";
    let searchInputValue = e.target.value;
    
    if(searchInputValue.length){
        let searched =  destinationData.filter((destination)=>{
            return destination.city.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1     
        })
        
        searched.map((one)=>{
            searchSuggest.forEach((search)=>{
                search.style.display = "none";
            })
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
    searchSuggest[index].style.display = "none";
}

// calender-functionality
const currentMonth = document.querySelectorAll(".current-month");
const nextMonth = document.querySelectorAll(".next-month");
const currentMonthDays = document.querySelectorAll(".current-month-days");
const nextMonthDays = document.querySelectorAll(".next-month-days");
const nextPrevIcons = document.querySelectorAll(".arrows i"); 
const calenderInput = document.querySelectorAll(".calender-input");
const calender = document.querySelectorAll(".date-parent");

// working with date
let date = new Date();
let currMonth = date.getMonth();
let neMonth = date.getMonth() + 1;
let currYear = date.getFullYear();

const months = [ "January" , "February" , "March" , "April" , "May" , "June" ,
 "July" , "August" , "September" , "October" , "November" , "December"
]

const renderCalender = ()=>{
    currentMonth.forEach((month)=>{
        month.innerHTML = months[currMonth];
    })
    nextMonth.forEach((month)=>{
        month.innerHTML = months[neMonth];
    })

    // days
    let firstDaysOfMonth = new Date(currYear , currMonth , 1).getDay(); // get first day of month
    let lastDateOfMonth = new Date(currYear , currMonth + 1, 0).getDate(); // get last date of month
    let lastDaysOfMonth = new Date(currYear , currMonth , lastDateOfMonth).getDay(); //get last day of month
    let lastDateOfLastMonth = new Date(currYear,currMonth, 0).getDate(); //get last Day of prev month
    currentMonthDays.innerHTML = "";

    // previous month last days
    for(let x = firstDaysOfMonth ; x > 0 ; x--){
        currentMonthDays.forEach((month)=>{
            month.innerHTML += `<li class="inactive"> ${lastDateOfLastMonth - x + 1} </li>`
        })
    }

    // all days of current month
    for(let x = 1 ; x <= lastDateOfMonth ; x++){
        // adding active class to current day
        let isToday = x === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
        currentMonthDays.forEach((month,index)=>{
           month.innerHTML += `<li class="${isToday}"  onClick="getDate(${x},${index})"> ${x} </li>` 
        })
    }

    // next month first days
    for(let x = lastDaysOfMonth ; x <  6 ; x++){
        currentMonthDays.forEach((month)=>{
            month.innerHTML += `<li class="inactive"> ${x - lastDaysOfMonth + 1} </li>`
        })
    }

    let firstDaysOfMonthNext = new Date(currYear , currMonth + 1, 1).getDay(); // get first day of month
    let lastDayOfNextMonth = new Date(currYear , currMonth + 2,0).getDate(); //get last date of month
    let lastDaysOfMonthNext = new Date(currYear , currMonth + 1 , lastDayOfNextMonth).getDay(); //get last day of month
    let lastDateOfLastMonthNext = new Date(currYear, currMonth + 1, 0).getDate(); //get last Days of prev month

    nextMonthDays.innerHTML = "";

    // previous month last days
    for(let x = firstDaysOfMonthNext ; x > 0 ; x--){
        nextMonthDays.forEach((month)=>{
            month.innerHTML += `<li class="inactive"> ${lastDateOfLastMonthNext - x + 1} </li>`
        })
    }

    // next month all days
    for(let y = 1 ; y <= lastDayOfNextMonth ; y++){
        nextMonthDays.forEach((month,index)=>{
            month.innerHTML += `<li onClick="getMonthNext(${y},${index})"> ${y} </li>`
        })
    }

    // next month first days
    for(let x = lastDaysOfMonthNext ; x <  6 ; x++){
        nextMonthDays.forEach((month)=>{
            month.innerHTML += `<li class="inactive"> ${x - lastDaysOfMonthNext + 1} </li>`
        })
    }
}

renderCalender();

// next-prev-arrows
let minmumMonth = currMonth;

nextPrevIcons.forEach((icon)=>{
    icon.addEventListener("click",()=>{
        if(icon.id === "prev" && currMonth > minmumMonth){
            currMonth = currMonth - 1;
            neMonth = neMonth - 1
            
        }else if(icon.id === "next" && currMonth <= 11){
            currMonth = currMonth + 1;
            neMonth = neMonth + 1;
            
        }
        if( currMonth < 0|| neMonth > 11){
            
            date = new Date(currYear,neMonth);
            currYear = date.getFullYear();
            neMonth = date.getMonth();
            
        }else if(currMonth > 11){
            date = new Date(currYear,currMonth);
            currMonth = date.getMonth() ;
        }else{
            date = new Date();
        }
        renderCalender();
    })
})

// get date function

const getDate = (x,index)=>{
    let today = date.getDate();
        
    if(x >= today){
       calenderInput[index].value = `${currMonth + 1}/${x}/${currYear}`
    }else{
       alert("Please choose from today to upcoming days");
    }                
}

const getMonthNext = (y,index)=>{
    calenderInput[index].value = `${neMonth + 1}/${y}/${currYear}`;
}

// travelers functionality
const travInput = document.querySelector(".trav-inp");
const trav = document.querySelector(".trav");
const addBtns = document.querySelectorAll(".add-btn");
const subtractBtns = document.querySelectorAll(".sub-btn");
let nums = document.querySelectorAll(".num");

travInput.addEventListener("click",()=>{
    trav.style.display = "block";
})

// add
addBtns.forEach((btn,index)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        let val = parseInt(nums[index].innerHTML);
        nums[index].textContent = val + 1
        let total = parseInt(nums[0].textContent) + parseInt(nums[1].textContent);
        if(total > 1){
            travInput.value = `${total} Travelers ,Economy`
        }else{
            travInput.value = `${total} Adult ,Economy`
        }
            
    })
})

// subtract
subtractBtns.forEach((btn,index)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        let val = parseInt(nums[index].innerHTML);
        if((index == 0 && val >= 2) || (index == 1 && val > 0)){
            nums[index].textContent = val - 1
            let total = parseInt(nums[0].textContent) + parseInt(nums[1].textContent);
            if(total > 1){
                travInput.value = `${total} Travelers ,Economy`
            }else{
            travInput.value = `${total} Adult ,Economy`
            }
        }    
    })
})


