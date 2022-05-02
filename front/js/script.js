
//Recuperation des données du back par la methode get
fetch("http://localhost:3000/api/products")
    .then(function (response){ return response.json();})
    .then (function (canaps) {canaps.forEach(canap => {
      document.querySelector('#items').innerHTML = document.querySelector('#items').innerHTML + 
      `<a href="./product.html?id=${canap._id}">
      <article>
        <img src="${canap.imageUrl}" alt="${canap.altTxt}">
        <h3 class="productName">${canap.name}</h3>
        <p class="productDescription">${canap.description}</p>
      </article>
    </a>`
    })});
