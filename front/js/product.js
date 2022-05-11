//===========================================

//=========================================
//recuperation de la chaine de requête dans l'URL
const queryStringUrlId =window.location.search;

//=======================================
//methode  pour reccuperer l'id
const urlSearchParams = new URLSearchParams(queryStringUrlId);

const id = urlSearchParams.get("id")
let itemPrice = 0
let imgUrl, altText, articleName

    //recuperation des données de l'id dans la base des données par  l'API avec la methode "GET"
      fetch(`http://localhost:3000/api/products/${id}`)
      .then((Response) => Response.json())
      .then((res) => handleData(res))

      //Création d'une fonction pour recuperer des elements contenus dans le ID
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

        //Création d'une fonction pour importer l'image et alt image du produit séléctionné par l'utilisateur
        function makeImage(imageUrl, altTxt) {
            const image = document.createElement('img')
            image.src = imageUrl
            image.alt = altTxt
            const parent = document.querySelector(".item__img")
            if(parent != null) parent.appendChild(image)
        }

        //Création d'une fonction pour importer le nom du produit séléctionné par l'utilisateur
        function makeTitle(name) {
            const h1 = document.querySelector("#title")
            if(h1 != null) h1. textContent = (name)
        }

        //Création d'une fonction pour importer le prix du produit séléctionné par l'utilisateur 
        function makePrice(price) {
            const span = document.querySelector("#price")
            if(span != null) span. textContent = (price)
        }

        //Création d'une fonction pour importer la description du produit séléctionné par l'utilisateur 
        function makeDescription(description) {
            const p = document.querySelector("#description")
            if(description != null) p. textContent = (description)
        }

        //Création d'une fonction pour importer la colors du produit séléctionné par l'utilisateur 
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

        //création d'une fonction pour gérer le click sur le boutton
        function handleClick() {
            const color = document.querySelector("#colors").value
            const quantity = document.querySelector("#quantity").value
            if (isOrderInvalid(color, quantity)) return
            saveCart(color, quantity)
            redirectToCart()
        }

        let nb_canap = document.querySelector('#quantity');
        nb_canap.addEventListener("blur", () => {
            if(nb_canap.value < 1 || nb_canap.value > 100)
            {
                alert("Veuillez saisir une quantité entre 1 et 100");
                nb_canap.value = 1;
                return;
            }else{
                alert("quatité souhaitée:" + nb_canap.value);
            }
        })

        //Création d'une fonction pour enregistrer les  clés et les valeurs qui seront stockés dans le localStorage
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

        //réation d'une fonction pour controler la validité de la quantité et la couleur
        function isOrderInvalid(color, quantity) {
            if (color == null || color === "" || quantity == null || quantity == 0) {
                alert("veuillez selectionner la couleur et la quantité")
                return true
            }
            return false   
        }

        //Création d'une fonction pour rediriger l'utilisateur vers le panier 
        function redirectToCart() {
            window.location.href = "cart.html"
        }
        
        
        
        
        
        