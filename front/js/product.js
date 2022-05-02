//===========================================

//=========================================
//recuperation de la chaine de requete dans l'URL
const queryStringUrlId =window.location.search;

//=======================================
//methode  pour reccuperer l'id
const urlSearchParams = new URLSearchParams(queryStringUrlId);

const id = urlSearchParams.get("id")
let itemPrice = 0
let imgUrl, altText, articleName

    //recuperation des données de l'id dans la base des données
      fetch(`http://localhost:3000/api/products/${id}`)
      .then((Response) => Response.json())
      .then((res) => handleData(res))

      function handleData(kanap) {
          const altTxt = kanap.altTxt
          const imageUrl = kanap.imageUrl
          const description = kanap.description
          const name = kanap.name
          const price = kanap.price
          const colors = kanap.colors
          imgUrl = imageUrl
          altText = altTxt
          itemPrice = price
          articleName = name

          makeImage(imageUrl, altTxt)
          makeTitle(name)
          makeDescription(description)
          makePrice(price)
          makeColors(colors)
         }
        
        function makeImage(imageUrl, altTxt) {
            const image = document.createElement('img')
            image.src = imageUrl
            image.alt = altTxt
            const parent = document.querySelector(".item__img")
            if(parent != null) parent.appendChild(image)
        }
        function makeTitle(name) {
            const h1 = document.querySelector("#title")
            if(h1 != null) h1. textContent = (name)
        }
        function makePrice(price) {
            const span = document.querySelector("#price")
            if(span != null) span. textContent = (price)
        }
        function makeDescription(description) {
            const p = document.querySelector("#description")
            if(description != null) p. textContent = (description)
        }
        function makeColors(colors) {
            const select = document.querySelector("#colors")
            if(select != null) { 
            colors.forEach((color) => {
                const option = document.createElement("option")
                option.value = color
                option.textContent = color
                select.appendChild(option)   
            });}  
        }
        
        const button  = document.querySelector("#addToCart")
        button.addEventListener("click", handleClick)

        function handleClick() {
            const color = document.querySelector("#colors").value
            const quantity = document.querySelector("#quantity").value
            if (isOrderInvalid(color, quantity)) return
            saveCart(color, quantity)
            redirectToCart()
        }

        function saveCart(color, quantity) {
            const key = `${id}- ${color}`
            const data = {
                id: id,
                color: color,
                quantity: Number(quantity),
                price: itemPrice,
                imageUrl: imgUrl,
                altTxt: altText,
                name: articleName
            }

            //stockage des objets et des valeurs sur le navigateur de l'utilisateur dans le localStorage
            let productArray = new Array(); 
            alreadyExist = false
            if(localStorage.getItem('products')) {
                productArray = JSON.parse(localStorage.getItem('products'));
                productArray.forEach (function(product, i){
                    if(product.id == id && product.color == color){
                        alreadyExist = true 
                        product.quantity += Number(quantity)
                        productArray[i] = product
                    }
                    
                } )
            } 
            if(alreadyExist == false){
            productArray.push(data);  
            }

            localStorage.setItem('products', JSON.stringify(productArray))
        }

        function isOrderInvalid(color, quantity) {
            if (color == null || color === "" || quantity == null || quantity == 0) {
                alert("veuillez selectionner la couleur et la quantité")
                return true
            }
            return false   
        }


        function redirectToCart() {
            window.location.href = "cart.html"
        }
        
        
        
        
        
        