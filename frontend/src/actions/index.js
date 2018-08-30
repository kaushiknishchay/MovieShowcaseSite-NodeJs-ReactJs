export const myAction = () => ({
  type: 'ACTION_CODE',
  payload: 'aa',
});

export const doLogin = (email, password) => ({
  type: 'LOGIN_INITIATE',
  payload: {
    email,
    password,
  },
});

export const doLogoutAction = () => ({
  type: 'LOGOUT_SUCCESS',
});

export const fetchMovieList = () => ({
  type: 'FETCH_MOVIELIST',
});
