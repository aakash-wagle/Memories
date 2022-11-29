import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// executes before every request
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile").token
    )}`;
  }

  return req;
});

// '/posts' routes
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id, updatedPost) =>
  API.patch(`/posts/${id}/like`, updatedPost);

// '/user' routes
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

// BEFORE USING AXIOS INSTANCE
// const url = "http://localhost:5000/posts";

// export const fetchPosts = () => axios.get(url);

// export const createPost = (newPost) => axios.post(url, newPost);

// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

// export const deletePost = (id) => axios.delete(`${url}/${id}`);

// export const likePost = (id, updatedPost) => axios.patch(`${url}/${id}/like`, updatedPost);
