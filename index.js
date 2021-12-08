const init = () => {
    fetch ("http://localhost:3000/breweries")
    .then(response => response.json())
    .then(json =>{
        json.filter(function (element){
            const li = document.createElement("li")
            li.textContent = element.name
            document.querySelector("#breweryList").append(li)
            li.addEventListener('click', (event) => {
                let removeElement = document.querySelector("#comments-container")
                while (removeElement.firstChild) {
                    removeElement.removeChild(removeElement.firstChild)
                }
                document.querySelector("#brewery-name").textContent = element.name;
                document.querySelector("#brewery-address").textContent = element.address;
                document.querySelector("#brewery-info").textContent = element.info;
                document.querySelector("#brewery-image").src = element.image;
                element.comments.filter(function (element){
                    const p = document.createElement("p")
                    p.textContent = element
                    document.querySelector("#comments-container").append(p)
                })
            document.querySelector("#addComment").addEventListener("submit", (event) => {
                event.preventDefault()
                const p = document.createElement("p")
                p.textContent = event.target.newComment.value
                console.log(event.target.newComment.value)
                document.querySelector("#comments-container").append(p)
            })      
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


}
document.addEventListener('DOMContentLoaded', init);