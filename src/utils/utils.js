const apiString = `https://fakestoreapi.com`;

const mockProducts = [
    {
        "id": 1,
        "name": "Apple",
        "description" : "Lushious Red",
        "price": 1.99
    },
    {
        "id": 2,
        "name": "Orange",
        "description" : "Appealling Orange",
        "price": 1.99
    },
    {
        "id": 3,
        "name": "Bananna",
        "description" : "Vibrant Yellow",
        "price": 1.99
    },
    {
        "id": 3,
        "name": "Lime",
        "description" : "Rich Green",
        "price": 1.99
    },
    {
        "id": 3,
        "name": "Blueberry",
        "description" : "Deep Blue",
        "price": 1.99
    },
    {
        "id": 3,
        "name": "Grape",
        "description" : "Majestic Purple",
        "price": 1.99
    }
  ]

export const getMockProductList = async () => {
    return mockProducts;
}

const getJSONFromResponse = async (fetchURL) => {
    const response = await fetch(fetchURL);

    if(!response.ok){
        return Promise.reject(response.statusText);
    }

    const jsonOBJ = await response.json();
    return jsonOBJ;
}

export const getFullProductList = async () => {
    const searchURL = `${apiString}/products`;

    const result = await getJSONFromResponse(searchURL);

    return result;
}

export const getProductById = async (id) => {
    const searchURL = `${apiString}/products/${id}`;

    //console.log(`Executing product Fetch for - ${searchURL}`);

    const result = await getJSONFromResponse(searchURL);

    return result;
}

export const getCarts = async () => {
    const cartURL = `${apiString}/carts`;

    const result = await getJSONFromResponse(cartURL);

    return result;
}

export const getCartById = async (id) => {
    const cartURL = `${apiString}/carts/${id}`;

    const result = await getJSONFromResponse(cartURL);

    return result;
}

export const pushCartItem = async(cartID, productID, quantity) => {
    const pushURL = `${apiString}/carts/${cartID}`;

    const response = await fetch(pushURL, {
        method:"PATCH",
        body:JSON.stringify(
            {
                products:[
                    {
                        productId:parseInt(productID), 
                        quantity:parseInt(quantity)
                    }
                ]
            }
        )
    });

    if(!response.ok){
        return Promise.reject(response.statusText);
    }

    const result = await response.json();

    return result;
}