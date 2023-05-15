// Azione per impostare il login effettuato correttamente
export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

// Azione per impostare il logout
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
