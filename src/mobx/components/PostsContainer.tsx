import { match } from 'react-router';
import { RedditReqPosts } from 'services/RedditService';
import { Posts, PostsProps } from 'components/Posts';
import { connect } from 'mobx/stores';
import { generatePath, ROUTES } from 'routes';

export const PostsContainer = connect<PostsProps>((stores) => ({
  posts: stores.posts.posts,
  isFetchingPosts: stores.posts.isFetchingPosts,
  pathname: stores.router.location.pathname,
  getPosts: (pathname: RedditReqPosts, match: match<{ subreddit?: string }>) => {
    if ([ROUTES.HOT, ROUTES.NEW, ROUTES.TOP].includes(pathname)) {
      stores.posts.requestPosts(pathname.replace('/', '') as RedditReqPosts);
    } else if (match.params && match.params.subreddit) {
      stores.posts.requestSubredditPosts(match.params.subreddit);
    }
  },
  onItemHideClick: (id: string) => stores.posts.hidePost(id),
  onItemSubRedditClick: (subreddit: string) => {
    stores.router.push(generatePath(ROUTES.SUBREDDIT, { subreddit }));
  }
}))(Posts);
