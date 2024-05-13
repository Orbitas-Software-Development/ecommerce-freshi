export const saveUserInfo = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("expiration", data.expiration);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("role", JSON.stringify(data.role));
};
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};
