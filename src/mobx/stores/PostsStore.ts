import { observable, action, IObservableArray, flow, computed, toJS, observe } from 'mobx';
import { RedditService, RedditReqPosts } from 'services/RedditService';
import { IPostItem } from 'types';

export class PostsStore {
  @observable posts: IObservableArray<IPostItem> = [] as any;
  @observable hiddenPosts: IObservableArray<IPostItem> = [] as any;
  @observable isFetchingPosts = false;

  requestPosts = flow(requestPosts);
  requestSubredditPosts = flow(requestSubredditPosts);

  @action hidePost(id: string) {
    const post = this.posts.find((item) => item.id === id);
    if (post) {
      this.hiddenPosts.push(post);
      this.posts.remove(post);
    }
  }
}

function* requestPosts(this: PostsStore, reqPost: RedditReqPosts) {
  this.isFetchingPosts = true;
  try {
    const data = yield RedditService.getPosts(reqPost);
    this.posts.replace(data);
  } catch (e) {
    this.posts.clear();
  }
  this.isFetchingPosts = false;
}

function* requestSubredditPosts(this: PostsStore, subreddit: string) {
  this.isFetchingPosts = true;
  try {
    const data = yield RedditService.getSubRedditPosts(subreddit);
    this.posts.replace(data);
  } catch (e) {
    this.posts.clear();
  }
  this.isFetchingPosts = false;
}
