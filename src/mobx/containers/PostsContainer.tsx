import { RouteComponentProps } from 'react-router';
import { RedditReqPosts } from 'services/RedditService';
import { Posts, PostsProps } from 'components/Posts';
import { connect } from 'mobx/stores';
import { generatePath, ROUTES } from 'routes';

export const PostsContainer = connect<PostsProps, RouteComponentProps<{ subreddit?: string }>>(
  ({ posts, router }, props) => ({
    ...props,
    posts: [...posts.postsList],
    isFetchingPosts: posts.isFetchingPosts,
    pathname: router.location.pathname,
    getPosts: (pathname: RedditReqPosts, subreddit?: string) => {
      if ([ROUTES.HOT, ROUTES.NEW, ROUTES.TOP].includes(pathname)) {
        posts.requestPosts(pathname.replace('/', '') as RedditReqPosts);
      } else if (subreddit) {
        posts.requestSubredditPosts(subreddit);
      }
    },
    onItemHideClick: (id: string) => posts.hidePost(id),
    onItemSubRedditClick: (subreddit: string) => {
      router.push(generatePath(ROUTES.SUBREDDIT, { subreddit }));
    }
  })
)(Posts);
