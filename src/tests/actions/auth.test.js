import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, logout, startLogin, startLouout } from "../../actions/auth";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("should generate login object", () => {
  const id = "12345"
  const action = login(id);
  expect(action).toEqual({
    type: "LOGIN",
    uid: "12345"
  });
});

test("should generate logout object", () => {
  const action = logout();
  expect(action.type).toBe("LOGOUT");
});

