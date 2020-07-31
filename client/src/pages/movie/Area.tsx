import React, { Component, Dispatch } from 'react'
import MyTag from '../../components/Tag'
import { connect } from 'react-redux'
import { IRootState } from '../../store/reducers/reducers'
import { IMovieArea, MovieAreaService } from '../../services/MovieAreaService'
import { movieAreaActions, fetchMovieAreaAction, editMovieAreaAction, changeMovieAreaAction } from '../../store/actions/movieAreaAction'
import { Button, Modal, Input, message } from 'antd'
interface IAreaProp {
    data: IMovieArea[],
    onLoad: () => void,
    onChange: (id: string, isShow: boolean) => void
    addArea: (text: string) => Promise<string>
}
class Area extends Component<IAreaProp, any>{
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
        const result = this.props.data.find((it: IMovieArea) => it.area === this.state.ModalText)
        if (!result) {
            const res = await this.props.addArea(this.state.ModalText)
            if (!res) {
                message.success("添加成功")
            } else {
                message.warn("添加失败")
            }
        } else {
            message.warn("地区不可以重复")
        }
        this.setState({
            visible: false,
            confirmLoading: false,
        });




    }
    render() {
        const tags = this.props.data.map((a: IMovieArea, i: number) => (<MyTag key={i} checked={a.isShow} onChange={(e) => {
            this.props.onChange(a._id!, e)
        }} children={a.area}></MyTag>))
        return (
            <div>
                {tags}
                <Button type="danger" onClick={() => {
                    this.setState({
                        visible: true
                    })
                }}>添加</Button>
                <Modal
                    title="添加的电影上映区域"
                    visible={this.state.visible}
                    onOk={this.handleAdd}
                    onCancel={this.hideModal}
                    okText="添加"
                    cancelText="取消"
                >
                    <Input placeholder="请输入添加的电影上映区域" onChange={(e) => {
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
    return state.area
}

const mapDispatchToProps = (dispatch: Dispatch<movieAreaActions>) => {
    return {
        onLoad() {
            dispatch(fetchMovieAreaAction())
        },
        onChange(id: string, isShow: boolean) {
            dispatch(changeMovieAreaAction(id, isShow))
        },
        async addArea(area: string) {
            const res = await MovieAreaService.add({
                area,
                isShow: true
            })
            console.log(res)
            if (!res.err) {
                dispatch(fetchMovieAreaAction())
            }

            return res.err

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Area)
