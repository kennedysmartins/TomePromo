import axios from "axios";

export const searchProducts = async (searchTerm) => {
  console.log("Executando searchProducts");
  try {
    if (searchTerm) {
      const response = await fetch(
        `https://api-tomepromo.onrender.com/products/search/${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }
  } catch (error) {
    console.error("Erro ao buscar o produto", error);
    return [];
  }
};

export const getProducts = async () => {
  console.log("Executando getProducts");
  try {
    const response = await fetch(`https://api-tomepromo.onrender.com/products`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao carregar os produtos", error);
    return [];
  }
};

export const getProductById = async (id) => {
  console.log("Executando getProductById");
  try {
    const response = await fetch(
      `https://api-tomepromo.onrender.com/products/${id}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao carregar os produtos", error);
    return [];
  }
};

export const getCategories = async () => {
  console.log("Executando getCategories");
  try {
    const response = await fetch(
      `https://api-tomepromo.onrender.com/categories`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao carregar as categorias", error);
    return [];
  }
};

export const createProduct = async (data) => {
  try {
    const response = await fetch(
      "https://api-tomepromo.onrender.com/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Erro ao criar o produto: ", error);
    return false;
  }
};

export const urlExtractor = async (url) => {
  try {
    console.log("Enviando requisição para a URL: ", url);
    const response = await axios.post(
      "https://api-tomepromo.onrender.com/products/extractor",
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao extrair dados da url: ", error);
    return false;
  }
};
