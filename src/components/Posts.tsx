import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import { List, Loader } from 'semantic-ui-react';
import { RedditReqPosts } from 'services/RedditService';
import { IPostItem } from 'types';

import { PostItem } from './PostItem';

export interface PostsProps {
  posts: IPostItem[];
  pathname: string;
  isFetchingPosts: boolean;
  getPosts(path: RedditReqPosts, match: match): void;
  onItemHideClick(id: string): void;
  onItemSubRedditClick(subreddit: string): void;
}

export class Posts extends React.Component<PostsProps & RouteComponentProps> {
  componentWillMount() {
    this.props.getPosts(this.props.pathname as RedditReqPosts, this.props.match);
  }

  componentWillUpdate(nextProps: PostsProps & RouteComponentProps) {
    if (this.props.pathname !== nextProps.pathname) {
      this.props.getPosts(nextProps.pathname as RedditReqPosts, nextProps.match);
    }
  }

  render() {
    const items = this.props.posts.map((item) => {
      const onHideClick = () => this.props.onItemHideClick(item.id);
      const onSubRedditClick = () => this.props.onItemSubRedditClick(item.subreddit);
      return <PostItem key={item.id} item={item} onHideClick={onHideClick} onSubRedditClick={onSubRedditClick} />;
    });
    return (
      <List divided relaxed>
        {this.props.isFetchingPosts ? (
          <Loader active size="large">
            Loading
          </Loader>
        ) : (
          items
        )}
      </List>
    );
  }
}
