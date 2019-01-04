import { AnyAction } from 'redux';
import { handleActions } from 'redux-actions';
import { posts, PostsActions, PostsAction } from './posts.actions';
import { IPostItem } from 'types';

export interface PostsState {
  posts: IPostItem[];
  hiddenPosts: IPostItem[];
  isFetchingPosts: boolean;
}

const initialState: PostsState = {
  posts: [],
  hiddenPosts: [],
  isFetchingPosts: false
};

export const postsReducer = handleActions(
  {
    [PostsActions.REQUEST_POSTS]: (state, action) => {
      return { ...state, isFetchingPosts: true };
    },
    [PostsActions.REQUEST_POSTS_COMPLETE]: (state, { payload }: PostsAction) => {
      return { ...state, posts: payload.posts, isFetchingPosts: false };
    },
    [PostsActions.REQUEST_POSTS_FAIL]: (state, action) => {
      return { ...state, posts: [], isFetchingPosts: false };
    },

    [PostsActions.REQUEST_SUBREDDIT_POSTS]: (state, action) => {
      return { ...state, isFetchingPosts: true };
    },
    [PostsActions.REQUEST_SUBREDDIT_POSTS_COMPLETE]: (state, { payload }: PostsAction) => {
      return { ...state, posts: payload.posts, isFetchingPosts: false };
    },
    [PostsActions.REQUEST_SUBREDDIT_POSTS_FAIL]: (state, action) => {
      return { ...state, posts: [], isFetchingPosts: false };
    },

    [PostsActions.HIDE_POST]: (state, { payload }: PostsAction) => {
      const [posts, hidden] = state.posts.reduce(
        (res, item) => {
          if (item.id !== payload.id) {
            res[0].push(item);
          } else {
            res[1].push(item);
          }
          return res;
        },
        [[], []] as [IPostItem[], IPostItem[]]
      );
      return { ...state, posts, hiddenPosts: [...state.hiddenPosts, ...hidden] };
    }
  },
  initialState
);
