import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Content-Type": `application/json`,
  },
});

instance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전 작업 수행
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
    return instance.put(`todos/${payload.todoId}`, {
      todo: payload.todo,
      isCompleted: payload.isCompleted,
    });
  },
  deleteTodo: (payload) => instance.delete(`todos/${payload}`),
};
