// Sample data for initial load
const initialShoes = [
    { title: "Nike Dunk Panda", size: 11, sku: "DD1391-100", whereBought: "Nike Store", price: 100, image: "photos/test.jpg" }
];

// Load shoes from local storage or use initial data
let shoes = JSON.parse(localStorage.getItem('shoes')) || initialShoes;

// Function to render shoes
const renderShoes = () => {
    const shoeContainer = document.getElementById('shoe-container');
    const totalCostElement = document.getElementById('total-cost');
    shoeContainer.innerHTML = '';
    let totalCost = 0;

    shoes.forEach(shoe => {
        const shoeDiv = document.createElement('div');
        shoeDiv.classList.add('shoe');
        shoeDiv.innerHTML = `
            <h3>${shoe.title}</h3>
            <p>Size: ${shoe.size}</p>
            <p>SKU: ${shoe.sku}</p>
            <p>Where Did You Buy: ${shoe.whereBought}</p>
            <p>Price Paid: $${shoe.price}</p>
            ${shoe.image ? `<img src="${shoe.image}" alt="${shoe.title}" style="max-width: 100%; height: auto;">` : ''}
        `;
        shoeContainer.appendChild(shoeDiv);
        totalCost += shoe.price;
    });

    totalCostElement.textContent = `Total Cost of Inventory: $${totalCost}`;
};

// Function to add new shoe
const addShoe = (event) => {
    event.preventDefault();
    const title = document.getElementById('shoe-title').value;
    const size = document.getElementById('size').value;
    const sku = document.getElementById('sku').value;
    const whereBought = document.getElementById('where-bought').value;
    const price = parseFloat(document.getElementById('price-paid').value);
    const imageFile = document.getElementById('shoe-image').files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        const image = reader.result;
        const newShoe = { title, size, sku, whereBought, price, image };
        shoes.push(newShoe);
        localStorage.setItem('shoes', JSON.stringify(shoes));

        window.location.href = 'index.html';
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const newShoe = { title, size, sku, whereBought, price, image: null };
        shoes.push(newShoe);
        localStorage.setItem('shoes', JSON.stringify(shoes));
        window.location.href = 'index.html';
    }
};

// Event listener for form submission
if (document.getElementById('add-shoe-form')) {
    document.getElementById('add-shoe-form').addEventListener('submit', addShoe);
}

// Render shoes on page load
if (document.getElementById('shoe-container')) {
    renderShoes();
}
