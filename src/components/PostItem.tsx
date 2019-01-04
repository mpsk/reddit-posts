import React from 'react';
import { List, Image, Label, Button } from 'semantic-ui-react';
import { IPostItem } from 'types';

export interface PostItemProps {
  item: IPostItem;
  onSubRedditClick(): void;
  onHideClick(): void;
}

export const PostItem: React.SFC<PostItemProps> = ({ item, ...props }) => {
  const thumbnail = item.thumbnail.match('http') ? item.thumbnail : null;
  const time = new Date(Number(item.created + '000')).toUTCString();
  const title = item.title.length > 200 ? `${item.title.substring(0, 200)}...` : item.title;

  return (
    <List.Item className="PostItem">
      <div className="PostItem__image">{thumbnail && <Image src={thumbnail} size="small" />}</div>
      <List.Content>
        <List.Header className="PostItem__link" as="a" href={item.url}>
          {title}
        </List.Header>
        <List.Description>{time}</List.Description>
        <List.Description className="PostItem__link" as="a" href={item.url} target="_blank">
          {item.url.substring(0, 30)}...
        </List.Description>
        <Label as="a" basic onClick={props.onSubRedditClick}>
          #{item.subreddit}
        </Label>
        <Button compact size="tiny" onClick={props.onHideClick}>
          Hide
        </Button>
      </List.Content>
    </List.Item>
  );
};
