import React, { Component } from 'react'
import { Tag } from 'antd';
const { CheckableTag } = Tag;

interface TagProp {
    checked: boolean,
    onChange: (e: boolean) => void,
    // key: string

}
export default class MyTag extends Component<TagProp> {
    componentDidMount() {

    }

    render() {
        return (

            <CheckableTag checked={this.props.checked} onChange={this.props.onChange} className="tag-style" children={this.props.children} ></CheckableTag>

        )
    }
}
