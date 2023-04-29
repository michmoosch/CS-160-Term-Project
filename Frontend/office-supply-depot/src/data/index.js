// Super Backpack: price_1MyPpLKqLmqC1u8HU4Ro53YA
// File Folder, Letter Size: price_1MyPqmKqLmqC1u8HlhbwYKNF
// Energizer Industrial Alkaline Batteries: price_1MyPsRKqLmqC1u8HVWSuNqSK
// Boise X-9 Copy Paper, 92 Brightness: price_1MyPtDKqLmqC1u8H3exTjp5V
// Best Tote: price_1MyPtsKqLmqC1u8HijN4AW9P
// SHarpie Fine Tip Permanent Marker: price_1MyPv0KqLmqC1u8HLwrTYuMT


const products = [
    {
        id: "price_1MyPpLKqLmqC1u8HU4Ro53YA",
        name: "Pen cup storage",
        price: 129.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        weight: 0.7,
        quantity: 5,
        image: `${process.env.PUBLIC_URL}/images/products/Resized images/pen cup storage1.jpg`
    },
    {
        id: "price_1MyPqmKqLmqC1u8HlhbwYKNF",
        name: "Black scissor",
        price: 12.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        weight: 3.5,
        quantity: 5,
        image: `${process.env.PUBLIC_URL}/images/products/Resized images/black scissor.jpg`
    },
    {
        id: "price_1MyPsRKqLmqC1u8HVWSuNqSK",
        name: "Notebook",
        price: 9.99,
        description: "Beautiful and practical perfect for journaling, note-taking, and creative expression. Durable cover and high-quality paper ensure a lasting companion.",
        weight: 3.5,
        quantity: 5,
        image: `${process.env.PUBLIC_URL}/images/products/Resized images/notebook1.jpg`
    },
    {
        id: "price_1MyPtDKqLmqC1u8H3exTjp5V",
        name: "Black stapler",
        price: 44.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        weight: 3.5,
        quantity: 5,
        image: `${process.env.PUBLIC_URL}/images/products/Resized images/black stapler.jpg`
    },
    {
        id: "price_1MyPtsKqLmqC1u8HijN4AW9P",
        name: "Red Stapler",
        price: 399.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        weight: 3.5,
        quantity: 5,
        image: `${process.env.PUBLIC_URL}/images/products/Resized images/red larger stapler.jpg`
    },
    {
        id: "price_1MyPv0KqLmqC1u8HLwrTYuMT",
        name: "Sticky note",
        price: 9.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        weight: 3.5,
        quantity: 5,
        image: `${process.env.PUBLIC_URL}/images/products/Resized images/sticky note.jpg`
    }
]

function getProductData(id){
    let productData = products.find(product => product.id === id);
    
    // If product is not found
    if(!productData){
        productData = {
            id: 0,
            name: "Product Not Found",
            price: 0,
            description: "Product Not Found",
            image: "http://source.unsplash.com/random"
        }
    
    return productData;
    }
}

export { products,  getProductData };