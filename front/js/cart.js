
var cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))


function retrieveItemsFromCache() {

  const products = JSON.parse(localStorage.getItem('products'));
  cart = products;

}

function displayItem(item) {
  const  article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCardItemContent(item)
  article.appendChild(cardItemContent)

  document.getElementById("cart__items").appendChild(article)

  displayTotalQuantity(item)
  displayTotalPrice()
}


function makeCardItemContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)


  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}

function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = "Nom du produit : " + item.name

  const p = document.createElement("p")
  p.textContent = "Color : " + item.color

  const p2 = document.createElement("p")
  p2.textContent = "Price : " + item.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description


}
function displayArticle(article) {
  document.querySelector("#cart__items").body.appendChild(article)
}

function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  article.id = item.id
  return article
}

function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}


function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
totalQuantity.textContent = total
} 

function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}


function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")
  
  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))
  const p = document.createElement("p")
  p.textContent = "supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}

function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(cart)
  deleteArticleFromPage(item)
}

function deleteDataFromCache(cart) {
  localStorage.setItem('products', JSON.stringify(cart))
}


function deleteArticleFromPage(item) {
  const articleToDelete = document.getElementById(item.id)

  articleToDelete.remove()
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent ="Qté :"
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuatity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(item.id, dataToSave)
}

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", () => submitForm())


function submitForm() {
  if(cart.length === 0)  {
    alert("veuillez selectionner vos articles")
    return
  }

  if (isFormInvalid()) return
  if (isEmailInvalid()) return
  if (isFirstNameInvalid()) return
  if (islastNameInvalid())  return
  if (isAddressInvalid()) return
  if (isCityInvalid()) return

  const body = makeRequestBody();
  console.log(body)
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    }
  })

  .then((res) => res.json())
  .then((data) => {
    const orderId = data.orderId
    window.location.href = "confirmation.html" + "?orderId=" + orderId
  })
  .catch((err) => console.error(err))
  
}

function isEmailInvalid() {
  const email = document.getElementById("email").value
  if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) == false) {
    alert("Veuillez entrer un email valide")
    return true
  }
  return false
}


function isFirstNameInvalid() {
  const firstName = document.getElementById("firstName").value
  if(/^[A-Za-z]{3,20}$/.test(firstName) == false) {
    alert("Veuillez entrer votre prenom")
    return true
  }
  return false
}

function islastNameInvalid() {
  const lastName = document.getElementById("lastName").value
  if(/^[A-Za-z]{3,20}$/.test(lastName) == false) {
    alert("Veuillez entrer votre nom")
    return true
  }
  return false
}

function isCityInvalid() {
  const city = document.getElementById("city").value
  if(/^[A-Za-z]{3,20}$/.test(city) == false) {
    alert("Veuillez entrer votre ville")
    return true
  }
  return false
}

function isAddressInvalid() {
  const address = document.getElementById("address").value
  if(/^[A-Za-z0-9\s]{5,50}$/.test(address) == false) {
    alert("Veuillez entrer votre adresse")
    return true
  }
  return false
}

function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("veuillez remplir les champs restants")
      return true
    }
  })
}

function makeRequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const address = form.elements.address.value
  const city = form.elements.city.value
  const email = form.elements.email.value
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdsFromCache()
  }
  return body
}

function getIdsFromCache() {
  const products = JSON.parse(localStorage.getItem('products'));

  const ids = []

  for (let i = 0; i < products.length; i++) {
    ids.push(products[i].id);
  }

  return ids;
}










