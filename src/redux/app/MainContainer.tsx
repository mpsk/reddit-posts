import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PostsContainer } from 'redux/containers/PostsContainer';
import { TopMenuContainer } from 'redux/containers/TopMenuContainer';
import { ROUTES } from 'routes';

export const MainContainer = () => {
  return (
    <div className="MainContainer">
      <TopMenuContainer />
      <div className="MainContainer__content">
        <Switch>
          <Route path={[ROUTES.SUBREDDIT, ROUTES.HOT, ROUTES.NEW, ROUTES.TOP]} component={PostsContainer} />
          <Redirect from="/" to={ROUTES.NEW} exact />
        </Switch>
      </div>
    </div>
  );
};
