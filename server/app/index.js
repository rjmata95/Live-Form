const SERVER_PORT = 8080;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        document.getElementById('title').innerHTML = `Listening on Port: ${SERVER_PORT}`

    }, 5000)

    var table = document.getElementById('#display-content')
    
    
})

// exports.dataToHtml = function (data) {
//     var arrayOfKeys = data.keys()
//     var newElement = document.createElement('tr')
//     for (key in arrayOfKeys){
//         let valueToAppend = document.createElement('td')
//         valueToAppend.innerHTML = data.key
//         newElement.appendChild(valueToAppend)
//     }
//     console.log(newElement)
// } 