import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { RedditService } from 'services/RedditService';
import { PostsActions, posts, PostsActionsPayload } from './posts.actions';

function* getRedditPosts(action: AnyAction & {payload: PostsActionsPayload}) {
    try {
        const { reqPost } = action.payload;
        const data = yield call(() => RedditService.getPosts(reqPost));
        
        yield put(posts.requestPostsComplete(data));

    } catch (e) {
        yield put(posts.requestPostsFail(e));
    }
}

function* getSubRedditPosts(action: AnyAction & {payload: PostsActionsPayload}) {
    try {
        const { subreddit } = action.payload;
        const data = yield call(() => RedditService.getSubRedditPosts(subreddit));
        
        yield put(posts.requestSubredditPostsComplete(data));

    } catch (e) {
        yield put(posts.requestSubredditPostsFail(e));
    }
}

export function* postsSagas() {
    yield all([
      takeLatest(PostsActions.REQUEST_POSTS, getRedditPosts),
      takeLatest(PostsActions.REQUEST_SUBREDDIT_POSTS, getSubRedditPosts),
    ]);
}