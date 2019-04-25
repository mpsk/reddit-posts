import { match } from 'react-router';
import { RedditReqPosts } from 'services/RedditService';
import { Posts, PostsProps } from 'components/Posts';
import { connect } from 'mobx/stores';
import { generatePath, ROUTES } from 'routes';

export const PostsContainer = connect<PostsProps>(({ posts, router }) => ({
  posts: [...posts.posts],
  isFetchingPosts: posts.isFetchingPosts,
  pathname: router.location.pathname,
  getPosts: (pathname: RedditReqPosts, match: match<{ subreddit?: string }>) => {
    if ([ROUTES.HOT, ROUTES.NEW, ROUTES.TOP].includes(pathname)) {
      posts.requestPosts(pathname.replace('/', '') as RedditReqPosts);
    } else if (match.params && match.params.subreddit) {
      posts.requestSubredditPosts(match.params.subreddit);
    }
  },
  onItemHideClick: (id: string) => posts.hidePost(id),
  onItemSubRedditClick: (subreddit: string) => {
    router.push(generatePath(ROUTES.SUBREDDIT, { subreddit }));
  }
}))(Posts);
