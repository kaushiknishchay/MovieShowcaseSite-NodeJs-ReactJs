import { fromJS } from 'immutable';


const initialState = fromJS({
  authToken: null,
  isAdmin: false,
  loginLoading: false,
  signInRequired: true,
  reVerificationRequired: true,
  loginErrors: [],
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_LOADING':
      return state.merge({
        loginLoading: true,
      });
    case 'LOGIN_SUCCESS':
      return state.merge({
        loginLoading: false,
        authToken: payload.token,
        isAdmin: payload.isAdmin,
        signInRequired: false,
        reVerificationRequired: false,
        loginErrors: [],
      });
    case 'LOGIN_ERROR':
      return state.merge({
        authToken: null,
        loginLoading: false,
        signInRequired: false,
        reVerificationRequired: false,
        loginErrors: [payload.errors],
      });
    case 'LOGOUT_SUCCESS':
      return state.merge({
        isAdmin: false,
        authToken: null,
        signInRequired: true,
        reVerificationRequired: true,
        loginErrors: [],
      });
    case 'VERIFICATION_REQUIRED':
      return state.merge({
        reVerificationRequired: true,
      });
    case 'VERIFICATION_DONE':
      return state.merge({
        reVerificationRequired: false,
      });
    default:
      return state;
  }
};
