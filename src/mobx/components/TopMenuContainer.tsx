import { connect } from 'mobx/stores';
import { TopMenu, TopMenuProps } from 'components/TopMenu';

export const TopMenuContainer = connect<TopMenuProps>(({ posts, router }) => ({
  activePath: router.location.pathname,
  hiddenPostsCount: posts.hiddenPosts.length,
  onClickPath: (path: string) => router.push(path),
  onBack: () => router.goBack()
}))(TopMenu);
