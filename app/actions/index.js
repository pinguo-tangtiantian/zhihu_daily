import { fetchBeforeNews } from './fetchBeforeNews';
import { fetchLongComments, fetchShorComments } from './fetchComments';
import { fetchExtraNewsInfo } from './fetchExtraNewsInfo';
import { fetchLatestNews } from './fetchLatestNews';
import { fetchNewsDetail } from './fetchNewsDetail';


/**
 * 设置展示模式
 * @param {string} toMode 要切换到的模式，可选"night"/"daytime"
 */
const setDisplayMode = (toMode) => {
    switch(toMode){
        case "night": {
            return {
                type: "NIGHT_MODE"
            }
        }
        case "daytime": {
            return {
                type: "DAYTIME_MODE"
            }
        }
        default: {
            return {
                type: "NIGHT_MODE"
            }
        }
    }
}

export {
    fetchBeforeNews,
    fetchLongComments,
    fetchShorComments,
    fetchExtraNewsInfo,
    fetchLatestNews,
    fetchNewsDetail,
    setDisplayMode
}