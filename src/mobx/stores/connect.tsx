import React from 'react';
import { observer, inject, IReactComponent } from 'mobx-react';
import { Stores, getStores } from './RootStore';

export type MapStoreToProps<TStateProps, TOwnProps, Stores> = (store: Stores, ownProps: TOwnProps) => TStateProps;

export function connect<InjectedProps, OwnProps = {}>(
  mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>
) {
  return (Component: IReactComponent<OwnProps> & { isMobxInjector?: boolean }) => {
    if (Component.isMobxInjector) {
      // README: For avoid using 'observer' on a component that already has 'inject'
      const withProps = (mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>) => {
        return (Component: IReactComponent<OwnProps>): IReactComponent<OwnProps> => {
          return ({ children, ...ownProps }: any) => {
            const newProps = mapStoreToProps(getStores(), ownProps) as any;
            return <Component {...{ ...newProps, children }} />;
          };
        };
      };

      return observer<IReactComponent<OwnProps>>(withProps(mapStoreToProps)(Component));
    } else {
      return inject(mapStoreToProps)(observer((props) => <Component {...props} />));
    }
  };
}
