import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'

// this is used to display GPS button over Google Map
class MapControl extends Component {
    static propTypes = {
        controlPosition: PropTypes.number,
    }

    componentWillUnmount() {
        const { props } = this
        if (!props.map) return
        const index = props.map.controls[props.controlPosition].getArray().indexOf(this.el)
        props.map.controls[props.controlPosition].removeAt(index)
    }

    componentDidMount() {
        this._render()
    }

    componentDidUpdate() {
        this._render()
    }


    shouldComponentUpdate(nextProps) {
        return !this.props.map && nextProps.map
    }

    _render() {
        const { props } = this
        if (!props.map || !props.controlPosition) return
        // for every component passed
        render(
            <div ref={el => {
                // if hasn't already rendered
                if (!this.renderedOnce) {
                    // position on specifed position
                    this.el = el
                    props.map.controls[props.controlPosition].push(el)
                } else if (el && this.el && el !== this.el) {
                    // get the child component and update
                    this.el.innerHTML = '';
                    [].slice.call(el.childNodes).forEach(child => this.el.appendChild(child))
                }
                this.renderedOnce = true
            }}>
                {props.children}
            </div>,
            document.createElement('div')
        )
    }

    render() {
        return <noscript />
    }
}

export default MapControl