import * as React from 'react';
import { configure, observe } from 'mobx';
import { observer, inject, IReactComponent } from 'mobx-react';
import { PostsStore } from './PostsStore';
import { RouterStore } from './RouterStore';

configure({
  enforceActions: 'observed'
});

export interface Stores {
  router: RouterStore;
  posts: PostsStore;
}

let _stores: Stores; // TODO: Should be special RootStore instance
export const initStores = () => {
  _stores = {
    router: new RouterStore(),
    posts: new PostsStore()
  };
  const history = RouterStore.initHistory(_stores.router);

  return {
    stores: _stores,
    history
  };
};

export type MapStoreToProps<TStateProps, TOwnProps, Stores> = (store: Stores, ownProps: TOwnProps) => TStateProps;

export function connect<InjectedProps, OwnProps = {}>(
  mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>
) {
  return (Component: IReactComponent<OwnProps> & { isMobxInjector?: boolean }) => {
    if (Component.isMobxInjector) {
      // README: For avoid using 'observer' on a component that already has 'inject'
      const withProps = (mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>) => {
        return <OwnProps>(Component: IReactComponent<OwnProps>): IReactComponent<OwnProps> => {
          return ({ children, ...ownProps }: any) => {
            const newProps = mapStoreToProps(_stores, ownProps) as any;
            return React.createElement(Component as React.ComponentClass<OwnProps>, { ...newProps, children });
          };
        };
      };

      return observer<IReactComponent<OwnProps>>(withProps(mapStoreToProps)(Component));
    } else {
      return inject(mapStoreToProps)(observer((props) => React.createElement(Component, props)));
    }
  };
}
