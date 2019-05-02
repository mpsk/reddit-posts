import { AnyAction } from 'redux';
import { handleActions } from 'redux-actions';
import { sortBy } from 'lodash';
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

const getSortedPosts = (posts: IPostItem[]): IPostItem[] => sortBy(posts, 'created');

export const postsReducer = handleActions(
  {
    [PostsActions.REQUEST_POSTS]: (state, action) => {
      return { ...state, isFetchingPosts: true };
    },
    [PostsActions.REQUEST_POSTS_COMPLETE]: (state, { payload }: PostsAction) => {
      return { ...state, posts: getSortedPosts(payload.posts), isFetchingPosts: false };
    },
    [PostsActions.REQUEST_POSTS_FAIL]: (state, action) => {
      return { ...state, posts: [], isFetchingPosts: false };
    },

    [PostsActions.REQUEST_SUBREDDIT_POSTS]: (state, action) => {
      return { ...state, isFetchingPosts: true };
    },
    [PostsActions.REQUEST_SUBREDDIT_POSTS_COMPLETE]: (state, { payload }: PostsAction) => {
      return { ...state, posts: getSortedPosts(payload.posts), isFetchingPosts: false };
    },
    [PostsActions.REQUEST_SUBREDDIT_POSTS_FAIL]: (state, action) => {
      return { ...state, posts: [], isFetchingPosts: false };
    },

    [PostsActions.HIDE_POST]: (state, { payload }: PostsAction) => {
      const [posts, hidden] = state.posts.reduce(
        (res, item) => {
          if (item.id === payload.id) {
            res[0].splice(res[0].indexOf(item), 1);
            res[1].push(item);
          }
          return res;
        },
        [[...state.posts], [...state.hiddenPosts]] as [IPostItem[], IPostItem[]]
      );
      return { ...state, posts, hiddenPosts: hidden };
    },

    [PostsActions.RESET_HIDDEN_POSTS]: (state) => {
      const { hiddenPosts, posts } = state;
      return { ...state, hiddenPosts: [], posts: getSortedPosts(posts.concat(hiddenPosts)) };
    }
  },
  initialState
);
