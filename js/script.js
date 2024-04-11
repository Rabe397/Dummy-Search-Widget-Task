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
    console.log(same.innerHTML)
    searchSuggest[index].style.display = "none";
}