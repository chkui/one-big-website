import {faReact, faNode, faJava, faLinux} from '@fortawesome/fontawesome-free-brands'
import {flow} from '../src/common/flow'

export const categoryTypeMap = {
    react: {
        code: 'react',
        name: 'React',
        des: '用于构建用户界面的JavaScript库',
        alt: 'React 用于构建用户界面的JavaScript库',
        icon: {img: faReact, color: '#61dafb', type: 'font'}
    },
    nodeJs: {
        code: 'nodeJs',
        name: 'NodeJs',
        des: '基于事件驱动、非阻塞I/O模型的JavaScript 运行环境',
        alt: 'nodeJs 基于事件驱动、非阻塞I/O模型的JavaScript 运行环境',
        icon: {img: faNode, color: '#43853d', type: 'font'}
    },
    java: {
        code: 'java',
        name: 'Java',
        des: '闻名全球的面向对象高级程序设计语言',
        alt: 'java 闻名全球的面向对象高级程序设计语言',
        icon: {img: faJava, color: '#f80000', type: 'font'}
    },
    hazelcast: {
        code: 'hazelcast',
        name: 'Hazelcast',
        des: '分布式内存数据网格，提供多种数据结构的分布式实现',
        alt: 'hazelcast 分布式内存数据网格，提供多种数据结构的分布式实现',
        icon: {img: 'hazelcastLogo', color: '#0d2a35', type: 'icon'}
    },
    spring: {
        code: 'spring',
        name: 'Spring',
        des: '基于IOC容器的Java轻量化解决方案',
        alt: 'spring 基于IOC容器的Java轻量化解决方案',
        icon: {img: 'springLogo', color: '#68bd45', type: 'icon'}
    },
    vertx: {
        code: 'vertx',
        name: 'Vertx',
        des: '基于netty实现的Java非阻塞事件驱动框架',
        alt: 'vertx 基于netty实现的Java非阻塞事件驱动框架',
        icon: {img: 'vertxLogo', color: '#782b90', type: 'icon'}
    },
    nginx: {
        code: 'nginx',
        name: 'Nginx',
        des: '高性能页面与反向代理服务器',
        alt: 'nginx 高性能页面与反向代理服务器',
        icon: {img: 'nginxLogo', color: '#047832', type: 'icon'}
    },
    tensorflow: {
        code: 'tensorflow',
        name: 'TensorFlow',
        des: '基于DistBelief进行研发的第二代人工智能学习系统',
        alt: 'tensorflow 基于DistBelief进行研发的第二代人工智能学习系统',
        icon: {img: 'tensorflowLogo', color: '#febd36', type: 'icon'}
    },
    jolokia: {
        code: 'jolokia',
        name: 'Jolokia',
        des: 'JSR-160的实现，通过JMX远程管理监控JVM',
        alt: 'jolokia JSR-160的实现，通过JMX远程管理监控JVM',
        icon: {img: 'https://file.mahoooo.com/res/file/chk_website_jolokia_2018_4_14.png', color: '#800D0D', type: 'img'}
    },
    linux: {
        code: 'linux',
        name: 'Linux',
        des: '地球上最伟大的操作系统之一',
        icon: {img: faLinux, color: '#e95420', type: 'font'}
    }
}

export const categoryStructure = {
    react: {
        react_establish_development_environment: require('./articles/react/1_react_establish_development_environment'),
        react_jsx_syntax_and_components: require('./articles/react/2_react_jsx_syntax_and_components'),
        react_state_event_and_render: require('./articles/react/3_react_state_event_and_render'),
        react_list_key_and_form:require('./articles/react/4_react_list_key_and_form'),
        react_understand_jsx_and_props:require('./articles/react/5_react_understand_jsx_and_props'),
        react_typechecking_with_proptypes_and_dom_element:require('./articles/react/6_react_typechecking_with_proptypes_and_dom_element'),
        react_static_type_check_with_flow:require('./articles/react/7_react_static_type_check_with_flow')
    },
    nodeJs: {
        install_nodejs_runtime_environment: require('./articles/nodejs/1_install_nodejs')
    },
    java: {},
    hazelcast: {},
    spring: {},
    vertx: {
        vertx_source_code_how_to_create_cluster: require('./articles/vertx/1_vertx_source_code_how_to_create_cluster'),
        vertx_source_mongdb_config: require('./articles/vertx/2_vertx_source_mongdb_config')
    },
    nginx: {},
    tensorflow: {},
    linux: {
        ubuntu_modify_view_port_by_xrandr: require('./articles/linux/1_modify_ubuntu_view_port')
    },
    jolokia: {}
}
const getPosAndList = (category, id) => {
    return flow(categoryStructure[category])
        .then(structure => structure[id])
        .then((art, chain) => {
            const structures = chain[0], list = [];
            let count = 0, pos = -1;
            for (const key in structures) {
                key === id && (pos = count);
                list.push(structures[key]);
                count++;
            }
            return {
                pos: pos,
                list: list
            }
        }).else();

}

export const getRelated = (category, id, len) => {
    let posObj, result = false;
    if (posObj = getPosAndList(category, id)) {
        const list = posObj.list, len = list.length, pos = posObj.pos;
        result = [];
        if (len < len + 1) {
            for (const item of list) {
                id !== item.url && result.push(item);
            }
        } else if (0 === pos) {
            result.concat(list.slice(1, 5));
        } else if (len - 1 === pos) {
            result.concat(list.slice(len - 6, 5));
        } else {
            let hash = 1, count = 0;
            while (count < len) {
                let curPos = 0;
                if (++count % 2) {
                    curPos = (pos + hash++)%len;
                } else {
                    curPos = pos - hash;
                    curPos < 0 && (curPos = (len + curPos)%len);
                }
                result.push(list[curPos]);
            }
        }
    }
    return result;
}

export const getArticlePrevNext = (category, id) => {
    return flow(getPosAndList(category, id))
        .then(obj => obj.list)
        .then(list => list.length > 0)
        .then((l, chain) => {
            const pos = chain[0].pos, list = chain[1];
            if (0 === pos) return {next: list[1]};
            else if (list.length - 1 === pos) return {prev: list[list.length - 2]};
            else return {prev: list[pos - 1], next: list[pos + 1]}
        }).else();
}