import { PostsStore } from './PostsStore';
import { RouterStore } from './RouterStore';

export interface Stores {
  posts: PostsStore;
  router: RouterStore;
}

const initStores = () => ({
  router: new RouterStore(),
  posts: new PostsStore()
});

let instance: RootStore | null = null;

export const getStores = (): Stores => RootStore.getInstance().getStores();

export class RootStore {
  static getInstance = getInstance;
  stores: Stores;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
  }

  getStores(): Stores {
    if (!this.stores) {
      this.stores = initStores();
    }

    return this.stores;
  }
}

function getInstance() {
  if (!instance) {
    instance = new RootStore();
  }
  return instance;
}
