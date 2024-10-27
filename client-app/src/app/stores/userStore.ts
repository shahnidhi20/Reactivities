import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFromValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFromValues) => {
    const user = await agent.Account.login(creds);

    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.cuurent();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFromValues) => {
    const user = await agent.Account.register(creds);

    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };
}
