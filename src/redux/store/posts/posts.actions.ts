import { IPostItem } from 'types';
import { RedditReqPosts } from 'services/RedditService';
import { Action } from 'redux';

export enum PostsActions {
    REQUEST_POSTS = 'REQUEST_POSTS',
    REQUEST_POSTS_COMPLETE = 'REQUEST_POSTS_COMPLETE',
    REQUEST_POSTS_FAIL = 'REQUEST_POSTS_FAIL',

    REQUEST_SUBREDDIT_POSTS = 'REQUEST_SUBREDDIT_POSTS',
    REQUEST_SUBREDDIT_POSTS_COMPLETE = 'REQUEST_SUBREDDIT_POSTS_COMPLETE',
    REQUEST_SUBREDDIT_POSTS_FAIL = 'REQUEST_SUBREDDIT_POSTS_FAIL',

    HIDE_POST = 'HIDE_POST'
}

export interface PostsActionsPayload {
    posts: any[];
    id: string;
    subreddit: string;
    reqPost: RedditReqPosts;
}

export type PostsAction = Action<PostsActions> & { payload: PostsActionsPayload };

export const posts = {
    requestPosts: (reqPost: PostsActionsPayload['reqPost']) => ({type: PostsActions.REQUEST_POSTS, payload: {reqPost}}),
    requestPostsComplete: (posts: IPostItem[]) => ({type: PostsActions.REQUEST_POSTS_COMPLETE, payload: {posts}}),
    requestPostsFail: (error: any) => ({type: PostsActions.REQUEST_POSTS_FAIL, error}),

    requestSubredditPosts: (subreddit: string) => ({type: PostsActions.REQUEST_SUBREDDIT_POSTS, payload: {subreddit}}),
    requestSubredditPostsComplete: (posts: IPostItem[]) => ({type: PostsActions.REQUEST_SUBREDDIT_POSTS_COMPLETE, payload: {posts}}),
    requestSubredditPostsFail: (error: any) => ({type: PostsActions.REQUEST_SUBREDDIT_POSTS_FAIL, error}),

    hidePost: (id: string) => ({type: PostsActions.HIDE_POST, payload: {id}}),
};
