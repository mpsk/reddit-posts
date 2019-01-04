import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { postsReducer, PostsState } from './posts/posts.reducers';

export interface State {
  router: RouterState;
  posts: PostsState;
}

export const rootReducer = (history: any): Reducer<State> =>
  combineReducers<State>({
    router: connectRouter(history),
    posts: postsReducer
  });
