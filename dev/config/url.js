import {isServerEvn} from 'pwfe-dom/util'
import {flow} from '../src/common/flow'

const HOST = {
    host: 'https://www.chkui.com',
    react: 'https://react.chkui.com',
    nodeJs: 'https://nodejs.chkui.com',
    java: 'https://java.chkui.com',
    hazelcast: 'https://hazelcast.chkui.com',
    spring: 'https://spring.chkui.com',
    vertx: 'https://vertx.chkui.com',
    nginx: 'https://nginx.chkui.com',
    tensorflow: 'https://tensorflow.chkui.com',
    jolokia: 'https://jolokia.chkui.com',
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