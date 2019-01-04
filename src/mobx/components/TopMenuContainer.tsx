import { connect } from 'mobx/stores';
import { TopMenu, TopMenuProps } from 'components/TopMenu';

export const TopMenuContainer = connect<TopMenuProps>((stores) => ({
  activePath: stores.router.location.pathname,
  hiddenPostsCount: stores.posts.hiddenPosts.length,
  onClickPath: (path: string) => stores.router.push(path),
  onBack: () => stores.router.goBack()
}))(TopMenu);
