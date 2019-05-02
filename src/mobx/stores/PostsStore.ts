import { observable, action, computed, flow } from 'mobx';
import { sortBy } from 'lodash';
import { RedditService, RedditReqPosts } from 'services/RedditService';
import { IPostItem } from 'types';

export const arrayToMap = <T>(items: T[], key: keyof T) =>
  items.reduce((data, item: T) => data.set(item[key], item), new Map<T[keyof T], T>());

const getSortedPosts = (posts: Map<IPostItem['id'], IPostItem>): IPostItem[] =>
  sortBy(Array.from(posts.values()), 'created');

export class PostsStore {
  @observable isFetchingPosts = false;
  posts = observable.map<IPostItem['id'], IPostItem>();
  hiddenPosts = observable.map<IPostItem['id'], IPostItem>();

  requestPosts = flow(requestPosts);
  requestSubredditPosts = flow(requestSubredditPosts);

  @computed get postsList(): IPostItem[] {
    return getSortedPosts(this.posts);
  }

  @computed get hiddenPostsList(): IPostItem[] {
    return getSortedPosts(this.hiddenPosts);
  }

  @action resetHidden() {
    this.hiddenPosts.forEach((post) => this.posts.set(post.id, post));
    this.hiddenPosts.clear();
  }

  @action hidePost(id: string) {
    const post = this.posts.get(id);
    if (post) {
      this.hiddenPosts.set(post.id, post);
      this.posts.delete(post.id);
    }
  }
}

function* requestPosts(this: PostsStore, reqPost: RedditReqPosts) {
  this.isFetchingPosts = true;
  try {
    const data = yield RedditService.getPosts(reqPost);
    this.posts.replace(arrayToMap<IPostItem>(data, 'id'));
  } catch (e) {
    this.posts.clear();
  }
  this.isFetchingPosts = false;
}

function* requestSubredditPosts(this: PostsStore, subreddit: string) {
  this.isFetchingPosts = true;
  try {
    const data = yield RedditService.getSubRedditPosts(subreddit);
    this.posts.replace(arrayToMap<IPostItem>(data, 'id'));
  } catch (e) {
    this.posts.clear();
  }
  this.isFetchingPosts = false;
}
