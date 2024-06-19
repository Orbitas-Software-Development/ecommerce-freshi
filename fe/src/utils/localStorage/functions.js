export const saveUserInfo = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("expiration", data.expiration);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("role", JSON.stringify(data.role));
};
export const saveCompanyLogoBase64 = (imgBase64) => {
  localStorage.setItem("companyLogo", imgBase64);
};
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getValueLocalStorage = (key) => {
  return localStorage.getItem("companyLogo");
};
export const getUsername = (key) => {
  let user = JSON.parse(localStorage.getItem("user"));
  let role = JSON.parse(localStorage.getItem("role"));
  if (role === "admin") {
    return user.login;
  }
  return user.userName;
};
export const getName = (key) => {
  let user = JSON.parse(localStorage.getItem("user"));
  let role = JSON.parse(localStorage.getItem("role"));

  if (role === "admin") {
    return user.firstName + " " + user.lastName;
  }
  return user?.fullName;
};
export const getRole = (key) => {
  return JSON.parse(localStorage.getItem("role"));
};
