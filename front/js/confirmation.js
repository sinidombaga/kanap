
const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

//Création d'une fonction pour recuperer l'ID de la commande
function getOrderId() { 
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const orderId = urlParams.get("orderId")
return orderId
}

//Création d'une fonction pour afficher le 'ID de la commande
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//Création d'une fonction pour effacer le contenu du localStorage
function removeAllCache() {
    localStorage.clear();
}

