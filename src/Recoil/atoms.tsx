import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const signInUserState = atom({
  key: "userSignIn",
  default: " ",
  effects_UNSTABLE: [persistAtom],
});

export { signInUserState };
