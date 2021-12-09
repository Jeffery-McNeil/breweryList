const init = () => {
    fetch ("http://localhost:3000/breweries")
    .then(response => response.json())
    .then(json =>{
        json.filter(function (element){
            const li = document.createElement("li")
            li.textContent = element.name
            document.querySelector("#breweryList").append(li)
            li.addEventListener('click', (event) => {
                let removeComments = document.querySelector("#comments-container")
                let removeBeers = document.querySelector("#beer-list")
                while (removeComments.firstChild) {
                    removeComments.removeChild(removeComments.firstChild)
                }
                while (removeBeers.firstChild) {
                    removeBeers.removeChild(removeBeers.firstChild)
                }
                document.querySelector("#brewery-name").textContent = element.name;
                document.querySelector("#brewery-address").textContent = element.street;
                document.querySelector("#brewery-info").textContent = element.info;
                document.querySelector("#brewery-city").textContent = element.city;
                document.querySelector("#brewery-state").textContent = element.state;
                document.querySelector("#brewery-image").src = element.image;
                element.comments.filter(function (element){
                    const p = document.createElement("p")
                    p.textContent = element
                    document.querySelector("#comments-container").append(p)
                    p.addEventListener("click", event =>{
                        p.remove()
                    })
                }) 
                element.beers.filter(function (element){
                    const li = document.createElement("li")
                    li.textContent = element
                    document.querySelector("#beer-list").append(li)
                    li.addEventListener("click", event =>{
                        li.remove()
                    })
                })     
            })
        })
    })
    
    document.querySelector("#addComment").addEventListener("submit", (event) => {
        event.preventDefault()
        const p = document.createElement("p")
        p.textContent = event.target.newComment.value
        document.querySelector("#comments-container").append(p)
        document.querySelector("#addComment").reset()
        p.addEventListener("click", event =>{
            p.remove()
        })
    })

    fetch ("http://localhost:3000/breweries/1")
    .then(response => response.json())
    .then(json =>{
        document.querySelector("#brewery-name").textContent = json.name;
        document.querySelector("#brewery-address").textContent = json.street;
        document.querySelector("#brewery-city").textContent = json.city;
        document.querySelector("#brewery-state").textContent = json.state;
        document.querySelector("#brewery-info").textContent = json.info;
        document.querySelector("#brewery-image").src = json.image;
        json.comments.filter(function (element){
            const p = document.createElement("p")
            p.textContent = element
            document.querySelector("#comments-container").append(p)
            p.addEventListener("click", event =>{
                p.remove()
            })
        })
        json.beers.filter(function (element){
            const li = document.createElement("li")
            li.textContent = element
            document.querySelector("#beer-list").append(li)
            li.addEventListener("click", event =>{
                li.remove()
            })
        })
    })
    document.querySelector("#suggestion-button").addEventListener("click", event =>{
        fetch("https://api.openbrewerydb.org/breweries?by_state=texas")
        .then(response => response.json())
        .then(json =>{
            let suggestion = json[Math.floor(Math.random() * json.length)]
            document.querySelector("#suggestion-name").textContent = suggestion.name
            document.querySelector("#suggestion-address").textContent = suggestion.street
            document.querySelector("#suggestion-city").textContent = suggestion.city
            document.querySelector("#suggestion-state").textContent = suggestion.state
        })
    })
    document.querySelector('#newBrewery').addEventListener("submit", (event) => {
        event.preventDefault()
        const newBrewery = {
            name: event.target.newName.value,
            image: event.target.newImage.value,
            street: event.target.newAddress.value,
            city: event.target.newCity.value,
            state: event.target.newState.value,
            info: event.target.newInfo.value

        }
        fetch ("http://localhost:3000/breweries", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newBrewery)
        })

    })


}
document.addEventListener('DOMContentLoaded', init);