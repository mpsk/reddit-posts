export interface IPopulatItem {
  title: string;
  subscribers: number;
  name: string;
  icon_img: string;
}

export interface IPostItem {
  id: string;
  author: string;
  thumbnail: string;
  title: string;
  url: string;
  subreddit: string;
  created: number;
}

export interface IListing<T> {
  data: {
    children: Array<{ data: T }>;
  };
  kind: 'Listing';
}
