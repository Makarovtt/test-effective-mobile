const API = "http://localhost:3000";

const getToken = () => localStorage.getItem("jwt") ?? "";

const setToken = (token) => {
  localStorage.setItem("jwt", token);
  document.getElementById("tokenDisplay").textContent = token;
};

const clearToken = () => {
  localStorage.removeItem("jwt");
  document.getElementById("tokenDisplay").textContent = "— не установлен —";
};

const showResult = (elId, data, ok) => {
  const el = document.getElementById(elId);
  el.textContent = JSON.stringify(data, null, 2);
  el.className = "response " + (ok ? "ok" : "error");
};

const buildHeaders = (withBody) => ({
  ...(withBody ? {"Content-Type": "application/json"} : {}),
  ...(getToken() ? {Authorization: `Bearer ${getToken()}`} : {}),
});

const request = async (method, path, body, elId) => {
  try {
    const res = await fetch(API + path, {
      method,
      headers: buildHeaders(!!body),
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json();
    showResult(elId, json, res.ok);
    return {ok: res.ok, json};
  } catch (e) {
    showResult(elId, {error: e.message}, false);
  }
};

const register = () =>
  request(
    "POST",
    "/auth/register",
    {
      fullName: document.getElementById("reg-name").value,
      birthDate: document.getElementById("reg-birth").value,
      email: document.getElementById("reg-email").value,
      password: document.getElementById("reg-pass").value,
      role: document.getElementById("reg-role").value,
    },
    "reg-res",
  );

const login = async () => {
  const result = await request(
    "POST",
    "/auth/login",
    {
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-pass").value,
    },
    "login-res",
  );
  if (result?.ok && result.json?.token) setToken(result.json.token);
};

const getUser = () => {
  const id = document.getElementById("get-id").value.trim();
  request("GET", `/users/${id}`, null, "get-res");
};

const getUsers = () => request("GET", "/users", null, "list-res");

const blockUser = () => {
  const id = document.getElementById("block-id").value.trim();
  request("PATCH", `/users/${id}/block`, null, "block-res");
};

window.addEventListener("load", () => {
  const saved = getToken();
  if (saved) document.getElementById("tokenDisplay").textContent = saved;
});
