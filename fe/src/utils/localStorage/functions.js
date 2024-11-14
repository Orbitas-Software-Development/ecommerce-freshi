export const setUserInfo = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("expiration", data.expiration);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("role", JSON.stringify(data.role));
  localStorage.setItem("customTheme", JSON.stringify(data.customTheme));
};
export const saveCompanyLogoBase64 = (imgBase64) => {
  localStorage.setItem("companyLogo", imgBase64);
};
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getValueLocalStorage = () => {
  return localStorage.getItem("companyLogo");
};
export const getUsername = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let role = JSON.parse(localStorage.getItem("role"));
  if (role === "admin") {
    return user.login;
  }
  return user.userName;
};
export const getName = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let role = JSON.parse(localStorage.getItem("role"));

  if (role === "admin") {
    return user.firstName + " " + (user.lastName === null ? "" : user.lastName);
  }
  return user?.fullName;
};
export const getRole = () => {
  return JSON.parse(localStorage.getItem("role"));
};

export const getCustomTheme = () => {
  return JSON.parse(localStorage.getItem("customTheme"));
};

export const getCompanyLogo = () => {
  try {
    let userLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userLocalStorage?.branch) {
      return userLocalStorage?.branch?.client?.company?.pictureBusinessName;
    }
    return userLocalStorage?.company?.pictureBusinessName;
  } catch (e) {
    return "";
  }
};
export const getClientLogo = () => {
  try {
    let userLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userLocalStorage?.branch?.client) {
      return userLocalStorage?.branch?.client.logoBase64;
    }
    return "";
  } catch (e) {
    return "";
  }
};
