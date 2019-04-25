import { configure } from 'mobx';
import { RouterStore } from './RouterStore';
import { Stores, RootStore } from './RootStore';

export * from './connect';

configure({
  enforceActions: 'observed'
});

export { Stores, RootStore, RouterStore };
