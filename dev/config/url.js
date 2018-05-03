import {isServerEvn} from 'pwfe-dom/util'
import {flow} from '../src/common/flow'

const HOST = {
    host: 'http://www.chkui.com',
    react: 'http://react.chkui.com',
    nodeJs: 'http://nodejs.chkui.com',
    java: 'http://java.chkui.com',
    hazelcast: 'http://hazelcast.chkui.com',
    spring: 'http://spring.chkui.com',
    vertx: 'http://vertx.chkui.com',
    nginx: 'http://nginx.chkui.com',
    tensorflow: 'http://tensorflow.chkui.com',
    jolokia: 'http://jolokia.chkui.com',
    client: '',
}

const url = {
    home: '/',
    category: '/category'
}

const getHost = (category, isServer) => {
    return flow(isServer).then(() => {
        const _h = HOST[category] || HOST.host;
    }).else(() => HOST.client)
}

export const getNavUrl = url => {
    return {
        server: `${HOST.host}${url}`,
        client: url
    }
}

export const getCategoryUrl = categoryId => {
    const local = `/category/${categoryId}`;
    return {
        server: `${HOST.host}${local}`,
        client: local
    }
}

/**
 *
 * @param categoryId
 * @param id
 * @returns {{server: string 服务端跳转的URL, client: string 单页面应用跳转的URL}}
 */
export const getArticleUrl = (categoryId, id) => {
    const local =`/article/${categoryId}/${id}`;
    return {
        server: `${HOST.host}${local}`,
        client: local
    }
}