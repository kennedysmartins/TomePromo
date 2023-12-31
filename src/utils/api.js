import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const numberAPI = process.env.NEXT_PUBLIC_NUMBER;
const numberTestAPI = process.env.NEXT_PUBLIC_NUMBER_TEST;

export const searchProducts = async (searchTerm) => {
  try {
    if (searchTerm) {
      const response = await fetch(
        `${apiUrl}/products/search/${searchTerm}`
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
  try {
    const response = await fetch(`${apiUrl}/products`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao carregar os produtos", error);
    return [];
  }
};

export const getProductGroups = async () => {
  try {
    const response = await fetch(`${apiUrl}/products/productGroups`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao carregar os grupos", error);
    return [];
  }
};

export const getProductsByGroup = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/products/productGroups/${id}/products`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao carregar os produtos do grupo", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(
      `${apiUrl}/products/${id}`
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

export const deleteProductById = async (id) => {
  try {
    const response = await fetch(
      `${apiUrl}/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao deletar o produto", error);
    return [];
  }
};

export const updateProductClick = async (id) => {
  console.log("API Click")
  try {
    const response = await fetch(
      `${apiUrl}/products/${id}/click`,
      {
        method: "PATCH",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao atualizar o produto", error);
    return [];
  }
};

export const editProductById = async (data, id) => {
  try {
    const response = await fetch(
      `${apiUrl}/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao editar o produto", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/categories`
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
      `${apiUrl}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao criar o produto: ", error);
    return null;
  }
};

export const createProductGroup = async (groupData, productIds) => {
  try {
    const response = await fetch(`${apiUrl}/products/create-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...groupData,
        productIds: productIds,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro ao criar o grupo de produtos');
    }
  } catch (error) {
    console.error('Erro ao criar o grupo de produtos', error);
    throw error;
  }
};

export const urlExtractor = async (url) => {
  try {
    const response = await axios.post(
      `${apiUrl}/products/extractor`,
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


export const messageSend = async (text) => {
  const message = {
    phoneNumber: numberAPI,
    message: text,
  };

  try {
    const response = await axios.post(
      `${apiUrl}/message/send`,
      message,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao enviar mensagem: ", error);
    return false;
  }
};

export const messageSendTest = async (text) => {
  const message = {
    phoneNumber: numberTestAPI,
    message: text,
  };

  try {
    const response = await axios.post(
      `${apiUrl}/message/send`,
      message,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erro ao enviar mensagem: ", error);
    return false;
  }
};