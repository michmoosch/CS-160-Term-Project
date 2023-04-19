// Super Backpack: price_1MyPpLKqLmqC1u8HU4Ro53YA
// File Folder, Letter Size: price_1MyPqmKqLmqC1u8HlhbwYKNF
// Energizer Industrial Alkaline Batteries: price_1MyPsRKqLmqC1u8HVWSuNqSK
// Boise X-9 Copy Paper, 92 Brightness: price_1MyPtDKqLmqC1u8H3exTjp5V
// Best Tote: price_1MyPtsKqLmqC1u8HijN4AW9P
// SHarpie Fine Tip Permanent Marker: price_1MyPv0KqLmqC1u8HLwrTYuMT

const products = [
    {
        id: "price_1MyPpLKqLmqC1u8HU4Ro53YA",
        name: "Super Backpack",
        price: 129.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        image: "http://source.unsplash.com/random"
    },
    {
        id: "price_1MyPqmKqLmqC1u8HlhbwYKNF",
        name: "File Folder, Letter Size",
        price: 12.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        image: "http://source.unsplash.com/random"
    },
    {
        id: "price_1MyPsRKqLmqC1u8HVWSuNqSK",
        name: "Energizer Industrial Alkaline Batteries",
        price: 9.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        image: "http://source.unsplash.com/random"
    },
    {
        id: "price_1MyPtDKqLmqC1u8H3exTjp5V",
        name: "Boise X-9 Copy Paper, 92 Brightness",
        price: 44.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        image: "http://source.unsplash.com/random"
    },
    {
        id: "price_1MyPtsKqLmqC1u8HijN4AW9P",
        name: "Best Tote",
        price: 399.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        image: "http://source.unsplash.com/random"
    },
    {
        id: "price_1MyPv0KqLmqC1u8HLwrTYuMT",
        name: "SHarpie Fine Tip Permanent Marker",
        price: 9.99,
        description: "Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut labore et dolore magna",
        image: "http://source.unsplash.com/random"
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