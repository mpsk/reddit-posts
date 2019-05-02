import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export interface TopMenuProps {
  activePath: string;
  hiddenPostsCount: number;
  resetHiddenPosts(): void;
  onClickPath(path: string): void;
  onBack(): void;
}

export const TopMenu: React.SFC<TopMenuProps> = ({ resetHiddenPosts, ...props }) => {
  const handleItemClick = (path: string) => () => props.onClickPath(path);
  const isActive = (path: string) => !!props.activePath.match(path);

  const [, subreddit] = props.activePath.split('/subreddit');

  return (
    <Menu pointing inverted fixed="top">
      <Menu.Menu>
        <Button secondary size="small" content="Back" icon="left arrow" labelPosition="left" onClick={props.onBack} />
      </Menu.Menu>
      <Menu.Item name="new" active={isActive('/new')} onClick={handleItemClick('/new')} />
      <Menu.Item name="hot" active={isActive('/hot')} onClick={handleItemClick('/hot')} />
      <Menu.Item name="top" active={isActive('/top')} onClick={handleItemClick('/top')} />
      {subreddit && <Menu.Item children={<b>Subbreddit: {subreddit}</b>} active />}
      <Menu.Menu position="right">
        <Menu.Item onClick={resetHiddenPosts}>Hidden posts: {props.hiddenPostsCount}</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
