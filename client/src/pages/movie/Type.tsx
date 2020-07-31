import React, { Component, Dispatch } from 'react'
import { IMovieType, MovieTypeService } from '../../services/MovieTypeService'
import { fetchMovieTypeAction, changeMovieTypeAction, movieTypeActions } from '../../store/actions/movieTypeAction'
import { IRootState } from '../../store/reducers/reducers'

import { message, Button, Modal, Input } from 'antd'
import MyTag from '../../components/Tag'
import { connect } from 'react-redux'

interface ITypeProp {
    data: IMovieType[],
    onLoad: () => void,
    onChange: (id: string, isShow: boolean) => void
    addType: (text: string) => Promise<string>
}
class Type extends Component<ITypeProp, any>{
    state = {
        visible: false,
        confirmLoading: false,
        ModalText: ""
    }

    componentDidMount() {
        this.props.onLoad()

    }

    hideModal = () => {
        this.setState({
            visible: false
        })

    }
    handleAdd = async () => {
        this.setState({
            confirmLoading: true,
        });
        const result = this.props.data.find((it: IMovieType) => it.types === this.state.ModalText)
        if (!result) {
            const res = await this.props.addType(this.state.ModalText)
            if (!res) {
                message.success("添加成功")
            } else {
                message.warn("添加失败")
            }
        } else {
            message.warn("类型不可以重复")
        }
        this.setState({
            visible: false,
            confirmLoading: false,
        });




    }
    render() {
        const tags = this.props.data.map((a: IMovieType, i: number) => (<MyTag key={i} checked={a.isShow} onChange={(e) => {
            this.props.onChange(a._id!, e)
        }} children={a.types}></MyTag>))
        return (
            <div>
                {tags}
                <Button type="danger" onClick={() => {
                    this.setState({
                        visible: true
                    })
                }}>添加</Button>
                <Modal
                    title="添加的电影类型"
                    visible={this.state.visible}
                    onOk={this.handleAdd}
                    onCancel={this.hideModal}
                    okText="添加"
                    cancelText="取消"
                >
                    <Input placeholder="请输入添加的电影类型" onChange={(e) => {
                        this.setState({
                            ModalText: e.target.value,
                        });
                    }} />
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state: IRootState) => {
    return state.type
}

const mapDispatchToProps = (dispatch: Dispatch<movieTypeActions>) => {
    return {
        onLoad() {
            dispatch(fetchMovieTypeAction())
        },
        onChange(id: string, isShow: boolean) {
            dispatch(changeMovieTypeAction(id, isShow))
        },
        async addType(types: string) {
            const res = await MovieTypeService.add({
                types,
                isShow: true
            })
            console.log(res)
            if (!res.err) {
                dispatch(fetchMovieTypeAction())
            }

            return res.err

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Type)