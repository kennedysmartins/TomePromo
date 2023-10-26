export const searchProducts = async(searchTerm) => {
    console.log('Executando searchProducts')
    try{
        if(searchTerm) {
            const response = await fetch(`https://api-tomepromo.onrender.com/products/search/${searchTerm}`)
            if(response.ok) {
                const data = await response.json();
                return data;
            } 
        }

    } catch (error) {
        console.error('Erro ao buscar o produto', error)
        return [];
    }
}

export const getProducts = async() => {
    console.log('Executando getProducts')
    try{
            const response = await fetch(`https://api-tomepromo.onrender.com/products`)
            if(response.ok) {
                const data = await response.json();
                return data;
            } 

    } catch (error) {
        console.error('Erro ao carregar os produtos', error)
        return [];
    }
}

export const getProductById = async(id) => {
    console.log('Executando getProductById')
    const result = products.filter((product) => {
        return product.id === id;
      });
      return result[0];
}

export const getCategories = async() => {
    console.log('Executando getCategories')
    try{
            const response = await fetch(`https://api-tomepromo.onrender.com/categories`)
            if(response.ok) {
                const data = await response.json();
                return data;
            } 

    } catch (error) {
        console.error('Erro ao carregar as categorias', error)
        return [];
    }
}
