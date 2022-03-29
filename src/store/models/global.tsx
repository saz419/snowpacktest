import { createModel } from "@rematch/core";
import { RootModel } from ".";
export const global = createModel<RootModel>()({
  state: {
    isLoading: false,
  }, // initial state
  reducers: {
    loading(state, payload: boolean) {
      return {
        ...state,
        isLoading: payload,
      };
    },
  },
  effects: (dispatch) => ({}),
});
