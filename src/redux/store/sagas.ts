import { all } from 'redux-saga/effects';
import { postsSagas } from './posts/posts.sagas';

const sagas = [postsSagas];

export function* rootSaga() {
  yield all(sagas.map((saga) => saga()));
}
