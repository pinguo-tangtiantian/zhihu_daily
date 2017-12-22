import { combineReducers } from 'redux';


import { fetchNewsDetail } from './fetchNewsDetail';
import { fetchLongComments, fetchShortgComments } from './fetchComments';
import { fetchExtraNewsInfo } from './fetchExtraNewsInfo';
import { fetchBeforeNews } from './fetchBeforeNews';
import { fetchLatestNews } from './fetchLatestNews';
import { setDisplayMode } from './setDisplayMode'


export const reducers = combineReducers({
    "fetchNewsDetail": fetchNewsDetail,
    "fetchLongComments": fetchLongComments,
    "fetchShortgComments": fetchShortgComments,
    "fetchExtraNewsInfo": fetchExtraNewsInfo,
    "fetchBeforeNews": fetchBeforeNews,
    "fetchLatestNews": fetchLatestNews,
    "setDisplayMode": setDisplayMode
});