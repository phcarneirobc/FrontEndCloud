let url = 'http://localhost:3000';
// let url =

let productId = window.location.hash.replace('#','');
console.log(productId);
start();

async function start() {
    let product = await getProduct(productId);

    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');

    console.log(product[0])

    console.log(productName);

    productName.innerHTML = product[0].name;
    productPrice.innerHTML = product[0].price;
}

async function getProduct(id) {
    const response = await fetch(`${url}/products/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        //body: JSON.stringify({id})
      });
      return response.json();
}

