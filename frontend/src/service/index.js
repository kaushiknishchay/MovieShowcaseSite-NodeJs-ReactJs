import httpRequest from '../utils/httpRequest';


export default {
  login: (email, password) => httpRequest.post('/auth/login', {
    email,
    password,
  }),

  fetchMovies: () => httpRequest.get('movie'),
};
