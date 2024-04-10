// json-data
fetch("../json/destination.json")
.then((res)=> res.json())
.then((data)=> localStorage.setItem("data",JSON.stringify(data)))

