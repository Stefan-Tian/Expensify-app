import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogin = () => dispatch => (
  firebase.auth().signInWithPopup(googleAuthProvider)
);

export const startLogout = () => dispatch => (
  firebase.auth().signOut()
);