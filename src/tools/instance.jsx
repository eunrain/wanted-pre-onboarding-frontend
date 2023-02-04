import axios from "axios";

export const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`,
  },
});

export const SignUpAPI = {
  signUp: (payload) => instance.post(`auth/signup`, payload),
};

export const LoginAPI = {
  login: (payload) => instance.post(`auth/signin`, payload),
};

export const TodoAPI = {
  createTodo: (payload) => instance.post(`todos`, payload),
  getTodos: () => instance.get(`todos`),
  updateTodo: (payload) => {
    console.log(payload);
    instance.put(`todos/${payload.todoId}`, {
      todo: payload.todo,
      isCompleted: payload.isCompleted,
    });
  },
  deleteTodo: (payload) => instance.delete(`todos/${payload}`),
};
