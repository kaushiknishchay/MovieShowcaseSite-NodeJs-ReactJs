export default {
  saveToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  removeToken: () => localStorage.removeItem('authToken'),
  getToken: () => localStorage.getItem('authToken'),
};
