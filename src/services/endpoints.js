export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  USER: {
    GET: (id) => `/user/${id}`,
  },
  TASK: {
    GET_ALL: "/task",
    CREATE: "/task",
    UPDATE: (id) => `/task/${id}`,
    DELETE: (id) => `/task/${id}`,
  },
};
