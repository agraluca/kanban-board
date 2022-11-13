export function setToken(token: string) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function getToken() {
  return localStorage.getItem("token");
}
