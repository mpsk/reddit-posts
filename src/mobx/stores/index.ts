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

export const initStores = () => {
    const stores = {
        router: new RouterStore(),
        posts: new PostsStore()
    };

    const history = RouterStore.initHistory(stores.router);

    return {
        stores,
        history
    };
};

type MapStoreToProps<TStateProps, TOwnProps, Stores> = (store: Stores, ownProps: TOwnProps) => TStateProps;
export function connect<InjectedProps, OwnProps = {}>(mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>) {
    return (Component: IReactComponent<OwnProps> & {isMobxInjector?: boolean}) => {
        return inject(mapStoreToProps)(observer(Component)) as React.ComponentClass<OwnProps>;
    };
}
