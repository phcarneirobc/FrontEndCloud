const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');

// let url = 'http://localhost:3000';
let url = '52.4.91.150:3000';

// Function to fetch all products from the server
async function fetchProducts() {
  const response = await fetch(`${url}/products`);
  const products = await response.json();

  // Clear product list
  productList.innerHTML = '';

  // Add each product to the list
  products.forEach(product => {
    console.log(product);
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price}`;
    li.id = product.id;

    // Add delete button for each product
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteProduct(product.id);
      await fetchProducts();
    });
    li.appendChild(deleteButton);

    // Add update button for each product
    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Update';
    updateButton.addEventListener('click', () => {
      updateProductId.value = product.id;
      updateProductName.value = product.name;
      updateProductPrice.value = product.price;
    });
    li.appendChild(updateButton);

    productList.appendChild(li);

    const showButton = document.createElement('button');
    showButton.innerHTML = 'Show';
    showButton.addEventListener('click', () => {
      let baseUrl = window.location.origin;
      let newPath = `/see-product.html#${product.id}`;
      let newUrl = baseUrl + newPath;

      window.location.href = newUrl;
    })
    li.appendChild(showButton);
  });
  
}


// Event listener for Add Product form submit button
addProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = addProductForm.elements['name'].value;
  const price = addProductForm.elements['price'].value;
  await addProduct(name, price);
  addProductForm.reset();
  await fetchProducts();
});

// Function to add a new product
async function addProduct(name, price) {
  const response = await fetch(`${url}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, price })
  });
  return response.json();
}

// Function to delete a new product
async function deleteProduct(id) {
  const response = await fetch(`${url}/products/` + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify({id})
  });
  return response.json();
}


// Submit event of update product
updateProductForm.addEventListener('submit', async event => {
  event.preventDefault();

  const id = updateProductForm.elements['id'].value;
  const name = updateProductForm.elements['name'].value;
  const price = updateProductForm.elements['price'].value;

  await updateProduct(id,name,price);
  await fetchProducts();
});

// Function to update a new product
async function updateProduct(id,name,price) {
  const response = await fetch(`${url}/products/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, name, price })
  });
  return response.json();
}


// Fetch all products on page load
fetchProducts();
