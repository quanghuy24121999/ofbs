import React, { Component } from 'react'

import TopMenu from '../components/topMenu'

export default class searchResult extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { state } = this.props.location;

        console.log(state);
        return (
            <div>
                <TopMenu />
            </div>
        )
    }
}
