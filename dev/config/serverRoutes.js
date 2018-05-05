import clientRoutes from './clientRoutes'
import {loadArticle} from './redux/articleAction'
import {loadCategoryAction} from './redux/categoryAction'
import {ShowType} from './redux/headerReducer'
import {initRunLocalAction} from './redux/appAction'
import {categoryTypeMap, categoryStructure, getArticlePrevNext} from '../data/category'
import {getArticleUrl, getCategoryUrl} from '../config/url'

const _ServerRouteConfig = {
    home: {//主页
        renderRule: true,
        renderActions: [
            (url, params, store) => {
                return new Promise((res, rej) => {
                    store.dispatch(initRunLocalAction(false));
                    res();
                })
            }
        ],
        renderTemplate: [
            (url, params, state) =>
                new Promise((res, rej) => {
                    res({
                        title: '随风溜达的向日葵 - 用自己的方式输出原创内容',
                        keywords: '随风溜达的向日葵,软件开发,软件技术,个人博客,开源,开源技术,软件开发教程,Java,Jvm,React,Nodejs,Node,Vertx,Nginx,Hazelcast,Spring,TensorFlow,Jolokia',
                        url: 'https://www.chkui.com',
                        description: '随风溜达的向日葵(www.chkui.com)的个人技术博客。详细讲解Java、Jvm、Javascript、React、Nodejs、Vertx、Nginx、Hazelcast、Spring、TensorFlow、Jolokia等语言或开源技术的基础知识以及使用方法。本人会随时跟进各种开源框架的更新并调整文章内容。',
                        pageType: 'website',
                        modifiedTime: '2018-5-3 15:08:29',
                        publishedTime: '2018-3-21 15:16:46',
                        robots: 'index,follow',
                        ldjson: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebPage",
                            "@id": "https://www.chkui.com",
                            "url": "https://www.chkui.com",
                            "name": '随风溜达的向日葵 - 用自己的方式输出原创内容',
                            "headline": '随风溜达的向日葵 - 用自己的方式输出原创内容',
                            "image": {
                                "@type": "ImageObject",
                                "url": "https://file.mahoooo.com/res/file/chk_blog_favicon_256.ico",
                                "height": 256,
                                "width": 256
                            },
                            "datePublished": '2018-4-20 17:48:39',
                            "dateModified": '2018-3-21 15:16:46',
                            "author": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵"
                            },
                            "publisher": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://file.mahoooo.com/res/file/favicon128.ico"
                                }
                            },
                            "description": '随风溜达的向日葵(www.chkui.com)的个人技术博客。详细讲解Java、Jvm、Javascript、React、Nodejs、Vertx、Nginx、Hazelcast、Spring、TensorFlow、Jolokia等语言或开源技术的基础知识以及使用方法。随时跟进各种技术的最新动态并加以介绍。'
                        })
                    })
                })
        ]
    },
    article: {
        renderRule: true,
        renderActions: [//action 列表
            (url, params, store) => {
                return new Promise((res, rej) => {
                    store.addListener((state) => {
                        if (state.articleInfoReducer.page) {
                            res();
                        }
                    })
                    store.dispatch(initRunLocalAction(false));
                    store.dispatch(loadArticle(params.category, params.id, ShowType.NONE));
                })
            }
        ],
        renderTemplate: [
            (url, params, state) =>
                new Promise((res, rej) => {
                    const category = params.category,
                        id = params.id,
                        article = categoryStructure[category][id],
                        url = getArticleUrl(category, id).server,
                        subject = article.subject,
                        modifiedTime = article.modifiedTime,
                        publishedTime = article.publishedTime,
                        description = article.des,
                        prevNext = getArticlePrevNext(category, id);

                    res({
                        title: `${subject}`,
                        keywords: article.keywords,
                        url: url,
                        description: description,
                        pageType: 'article',
                        modifiedTime: modifiedTime,
                        publishedTime: publishedTime,
                        prev: prevNext && prevNext.prev && getArticleUrl(prevNext.prev.category, prevNext.prev.url).server,
                        next: prevNext && prevNext.next && getArticleUrl(prevNext.next.category, prevNext.next.url).server,
                        robots: 'index,follow',
                        ldjson: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebPage",
                            "@id": url,
                            "url": url,
                            "name": subject,
                            "headline": subject,
                            "image": {
                                "@type": "ImageObject",
                                "url": "https://file.mahoooo.com/res/file/chk_blog_favicon_256.ico",
                                "height": 256,
                                "width": 256
                            },
                            "datePublished": publishedTime,
                            "dateModified": modifiedTime,
                            "author": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵"
                            },
                            "publisher": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://file.mahoooo.com/res/file/favicon128.ico"
                                }
                            },
                            "description": description
                        })
                    })
                })
        ]
    },
    categoryList: {
        renderRule: true,
        renderActions: [
            (url, params, store) => {
                return new Promise((res, rej) => {
                    store.dispatch(initRunLocalAction(false))
                    res();
                })
            }
        ],
        renderTemplate: [
            (url, params, state) =>
                new Promise((res, rej) => {
                    res({
                        title: `软件开发技术分类 - 随风溜达的向日葵`,
                        keywords: '随风溜达的向日葵,软件开发技术分类,Java,Jvm,React,Nodejs,Node,Vertx,Nginx,Hazelcast,Spring,TensorFlow,Jolokia',
                        url: 'http://www.chkui.com/category',
                        description: '核心软件开发技术分类，包括Java、React、Nodejs、Vertx、Nginx、Hazelcast、Spring、TensorFlow、Jolokia',
                        pageType: 'website',
                        modifiedTime: '2018-5-3 15:08:29',
                        publishedTime: '2018-3-21 15:16:46',
                        robots: 'index,follow',
                        ldjson: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebPage",
                            "@id": 'http://www.chkui.com/category',
                            "url": 'http://www.chkui.com/category',
                            "name": '软件开发技术分类 - 用自己的方式输出原创内容',
                            "headline": '软件开发技术分类 - 用自己的方式输出原创内容',
                            "image": {
                                "@type": "ImageObject",
                                "url": "https://file.mahoooo.com/res/file/chk_blog_favicon_256.ico",
                                "height": 256,
                                "width": 256
                            },
                            "datePublished": '2018-4-20 17:48:39',
                            "dateModified": '2018-3-21 15:16:46',
                            "author": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵"
                            },
                            "publisher": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://file.mahoooo.com/res/file/favicon128.ico"
                                }
                            },
                            "description": '核心软件开发技术分类，包括Java、React、Nodejs、Vertx、Nginx、Hazelcast、Spring、TensorFlow、Jolokia'
                        })
                    })
                })
        ]
    },
    category: {
        renderRule: true,
        renderActions: [//action 列表
            (url, params, store) => {
                return new Promise((res, rej) => {
                    store.addListener((state) => {
                        if (state.categoryTypeListReducer.listInfo) {
                            res();
                        }
                    })
                    store.dispatch(loadCategoryAction(params.type, ShowType.BREADCRUMBTOP));
                })
            }
        ],
        renderTemplate: [
            (url, params, state) =>
                new Promise((res, rej) => {
                    const category = categoryTypeMap[params.type],
                        name = category.name,
                        innerUrl = getCategoryUrl(params.type).server,
                        title = `${name}`,
                        description = `${name} ${category.des}`;
                    res({
                        title: title,
                        keywords: `随风溜达的向日葵,软件开发技术分类,${name}`,
                        url: innerUrl,
                        description: description,
                        pageType: 'website',
                        robots: 'index,follow',
                        ldjson: JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebPage",
                            "@id": innerUrl,
                            "url": innerUrl,
                            "name": title,
                            "headline": title,
                            "image": {
                                "@type": "ImageObject",
                                "url": "https://file.mahoooo.com/res/file/chk_blog_favicon_256.ico",
                                "height": 256,
                                "width": 256
                            },
                            "author": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵"
                            },
                            "publisher": {
                                "@type": "Person",
                                "name": "随风溜达的向日葵",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://file.mahoooo.com/res/file/favicon128.ico"
                                }
                            },
                            "description": description
                        })
                    })
                })
        ]
    },
    about: {
        renderRule: true,
        renderTemplate: [
            (url, params, state) =>
                new Promise((res, rej) => {
                    res({
                        title: '关于',
                        keywords: '随风溜达的向日葵,软件开发技术分类,关于作者',
                        robots: 'nofollow'
                    })
                })
        ]
    }
}

const routes = clientRoutes.map(route => {
    const id = route.id, server = _ServerRouteConfig[id];
    return server ? {
        id: route.id,
        url: route.url,
        component: route.component,
        renderRule: server.renderRule,
        renderActions: server.renderActions,
        renderTemplate: server.renderTemplate
    } : route;
});

export default routes