import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'connected-react-router';
import { posts } from 'redux/store/posts/posts.actions';
import { State } from 'redux/store/reducers';

import { TopMenu, TopMenuProps } from 'components/TopMenu';

export const TopMenuContainer = connect(
  (store: State) => ({
    activePath: store.router.location.pathname,
    hiddenPostsCount: store.posts.hiddenPosts.length
  }),
  (dispatch): Pick<TopMenuProps, 'onClickPath' | 'onBack' | 'resetHiddenPosts'> => ({
    onClickPath: (path: string) => dispatch(routerActions.push(path)),
    onBack: () => dispatch(routerActions.goBack()),
    resetHiddenPosts: () => dispatch(posts.resetHiddenPosts())
  })
)(TopMenu);
