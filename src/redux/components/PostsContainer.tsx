import React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { routerActions } from 'connected-react-router';
import { RedditReqPosts } from 'services/RedditService';
import { Posts, PostsProps } from 'components/Posts';
import { posts, PostsActionsPayload } from 'redux/store/posts/posts.actions';
import { State } from 'redux/store/reducers';
import { ROUTES, generatePath } from 'routes';

export const PostsContainer = connect(
    (state: State): Pick<PostsProps, 'posts'|'isFetchingPosts'|'pathname'> => ({
        posts: [...state.posts.posts],
        isFetchingPosts: state.posts.isFetchingPosts,
        pathname: state.router.location.pathname,
    }),
    (dispatch: Dispatch): Pick<PostsProps, 'getPosts'|'onItemHideClick'|'onItemSubRedditClick'> => ({
        getPosts: (pathname: PostsActionsPayload['reqPost'], match: match<{subreddit?: string}>) => {
            if ([ROUTES.HOT, ROUTES.NEW, ROUTES.TOP].includes(pathname)) {
                dispatch(posts.requestPosts(pathname.replace('/', '') as RedditReqPosts));
            } else if (match.params && match.params.subreddit) {
                dispatch(posts.requestSubredditPosts(match.params.subreddit));
            }
        },
        onItemHideClick: (id: string) => dispatch(posts.hidePost(id)),
        onItemSubRedditClick: (subreddit: string) => {
            dispatch(routerActions.push(generatePath(ROUTES.SUBREDDIT, { subreddit })));
        }
    })
)(Posts);