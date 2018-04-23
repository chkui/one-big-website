import React from 'react'

const asyncLoad = load =>{
    return class extends React.Component {
        constructor(...props) {
            super(...props)
            this.state = {loadValue:null}
            this.async = this.async.bind(this)
        }

        async(value) {
            this.setState({
                loadValue: value
            })
        }

        componentDidMount() {
            console.log('Mount');
            0 !== window.scrollY && window.scrollTo(0, 0)
        }

        componentWillMount() {
            load(this.async)
        }

        render() {
            return (this.state);
        }
    }
}