import React from 'react'
import {getComponentName} from 'pwfe-dom/util'

const _callback = [], _LenStep = 100;
let curScrollTop, isInitListener, isInitData;

const addListener = (callback) => {
    _callback.push(callback)
}

const listener = () => {
    if (!isInitData) {
        curScrollTop = window.scrollY;
        isInitData = true;
    }
    if ((0 === window.scrollY) || (Math.abs(window.scrollY - curScrollTop) > _LenStep)) {
        curScrollTop = window.scrollY
        callList(window.scrollY)
    }
}

const callList = (top) => _callback.map(i => i(top))

const initListener = () => {
    if (!isInitListener) {
        document.addEventListener('scroll', listener);
        callList(window.scrollY);
        isInitListener = true;
    }
}

const withScroll = () => {
    return (Comp) => {
        class WrapComp extends React.Component {
            constructor(...props) {
                super(...props)
            }

            componentDidMount() {
                initListener();
            }

            render() {
                const props = Object.assign({}, this.props, {addListener: addListener})
                return (<Comp {...props} />)
            }
        }

        WrapComp.displayName = `withScroll(${getComponentName(WrapComp)})`;
        return WrapComp
    }
}

export default withScroll