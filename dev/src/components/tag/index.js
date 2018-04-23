import OriTag from 'pwfe-dom/tag'
import {getArticleUrl, getCategoryUrl} from '../../../config/url'

const Tag = OriTag;
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}
require.ensure([], require => {
    Tag.setIcon(require("../../../res/img"))
}, 'res')
export default Tag

const CategoryLink = props =>{

}