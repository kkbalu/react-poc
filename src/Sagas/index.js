import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { MoviesTypes } from '../Redux/MoviesRedux'
import {TreeTypes} from '../Redux/TreeRedux'
/* ------------- Sagas ------------- */
import getMovies from './MoviesSagas'
import getTree from './treeSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {  
  yield all([
    // some sagas only receive an action
    // some sagas receive extra parameters in addition to an action
   takeLatest(MoviesTypes.MOVIES_REQUEST, getMovies, api),
    takeLatest(TreeTypes.TREE_REQUEST, getTree, api)
  ])
}
