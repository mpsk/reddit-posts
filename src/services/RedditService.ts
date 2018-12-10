import { map } from 'lodash';
import { IListing, IPostItem } from 'types/index';

export type RedditReqPosts = 'hot'|'new'|'top';

export class RedditService {

    static async getPosts(reqPosts: RedditReqPosts): Promise<IPostItem[]> {
        const resp = await fetch(`/${reqPosts}.json`).then(resp => resp.json()) as IListing<IPostItem>;
        const data = map(resp.data.children, 'data');
        return data;
    }

    static async getSubRedditPosts(subreddit: string) {
        const resp = await fetch(`/r/${subreddit}.json`).then(resp => resp.json()) as IListing<IPostItem>;
        const data = map(resp.data.children, 'data');
        return data;
    }

}
