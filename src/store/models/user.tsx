import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface UserType {
  loggedIn: boolean;
  name: string;
  email: string;
}

export const user = createModel<RootModel>()({
  state: {
    loggedIn: false,
    name: "",
    email: "",
  },
  reducers: {
    // handle state changes with pure functions
    setUser(state, payload: UserType) {
      const { name, email, loggedIn } = payload;
      localStorage.setItem("user", JSON.stringify(payload));
      return { ...state, loggedIn, name, email };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchUserAsync(payload: UserType, state) {
      console.log("This is current root state", state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.user.setUser(payload);
    },
  }),
});
