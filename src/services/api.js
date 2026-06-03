const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const getHeaders = () => ({
  "Content-Type": "application/json",
  ...(localStorage.getItem("token")
    ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
    : {}),
});

const handleResponse = async (res) => {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error || body?.message || res.statusText;
    throw new Error(message);
  }
  const data = await res.json();
  const authHeader = res.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  return token ? { ...data, token } : data;
};

export const api = {
  get: (url, options = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: getHeaders(),
      ...options,
    }).then(handleResponse),

  post: (url, body, options = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
      ...options,
    }).then(handleResponse),

  put: (url, body, options = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
      ...options,
    }).then(handleResponse),

  patch: (url, body, options = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(body),
      ...options,
    }).then(handleResponse),

  delete: (url, options = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
      ...options,
    }).then(handleResponse),
};
