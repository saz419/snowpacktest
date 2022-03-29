import { Models } from "@rematch/core";
import { count } from "./count";
import { global } from "./global";
import { user } from "./user";

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  user: typeof user;
  global: typeof global;
}

export const models: RootModel = { count, user, global };
