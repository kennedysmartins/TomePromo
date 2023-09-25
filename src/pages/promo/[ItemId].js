import React, { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { useRouter } from "next/router";
import { getProductById } from "@/services/products";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useForm } from "react-hook-form";
import axios from "axios";

function promoPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log("Resposta da API (get):", response.data);
        setPosts(response.data);
      } catch (error) {
        console.log("Error ao carregar o get:", error);
      }
    };
    loadPosts();
  }, []);

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost
      );
      console.log("Resposta da API (post): ", response.data);
      setPosts([response.data, ...posts]);
      setNewPost({ title: "", body: "", userId: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        newPost
      );
      if (response) {
        console.log("Resposta da API (delete): Deletado com sucesso!");
        alert("deletado com sucesso");
      }
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const [product, setProduct] = useState(Array(3).fill({}));
  const productID = router.query.ItemId;

  useEffect(() => {
    if (productID) {
      const result = getProductById(Number(productID));
      setProduct(result);
    }
  }, [productID]);

  return (
    <Container>
      <Header />
      <Content>
        <div className="flex flex-col sm:flex-row justify-center items-start">
          <Card
            imageURL={product.imageURL}
            nomeProduto={product.nomeProduto}
            linkCompra={product.linkCompra}
            data={product.data}
            hora={product.hora}
            text1={product.text1}
            text2={product.text2}
            text3={product.text3}
            text4={product.text4}
            text5={product.text5}
            text6={product.text6}
            text7={product.text7}
          />

          <div className="bg-zinc-100 w-[600px] my-[5.5rem] rounded-lg">
            <Breadcrumbs />
            <h2 className="m-4 font-bold">Adicionar comentário</h2>
            <form
              className="flex flex-col justify-center items-center w-full gap-2 p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="Titulo do comentário"
                {...register("title", {
                  required: "Campo obrigatório body",
                  minLength: 3,
                })}
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="border rounded py-2 px-3 w-full"
              />
              <input
                placeholder="Corpo do comentário"
                {...register("body", {
                  required: "Campo obrigatório body",
                  minLength: {
                    value: 3,
                    message: "O valor mínimo em body é 50 caracteres",
                  },
                  maxLength: {
                    value: 500,
                    message: "O valor máximo em body é 500 caracteres",
                  },
                })}
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                className="border rounded py-2 px-3 w-full"
              />
              <button
                // onClick={onSubmit}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 w-full"
              >
                Enviar
              </button>
            </form>

            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
            {errors.body && (
              <span className="text-red-500">{errors.body.message}</span>
            )}

            <br />
            <br />

            <div>
              <ul>
                {posts.slice(0, 3).map((post) => (
                  <div
                    className="bg-white shadow-md rounded p-4 mb-4 mx-4 hover:shadow-2xl transition-all"
                    key={post.id}
                  >
                    <li>
                      <strong>{post.title}</strong>
                      <p>Post: {post.body}</p>
                    </li>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="bg-blue-500 text-white py-2 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default promoPage;
