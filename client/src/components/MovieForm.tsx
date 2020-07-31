import React, { Component, Dispatch } from 'react'
import { Form, Input, Button, Checkbox, InputNumber, Switch, message, Modal } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import UploadPoster from './uploadPoster';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { IMovie } from '../services/MovieService';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IRootState } from '../store/reducers/reducers';
import { IMovieType } from '../services/MovieTypeService';
import { IMovieTypeState } from '../store/reducers/movieTypeReducer';
import { IMovieAreaState } from '../store/reducers/movieAreaReducer';
import { movieTypeActions, fetchMovieTypeAction } from '../store/actions/movieTypeAction';
import { movieAreaActions, fetchMovieAreaAction } from '../store/actions/movieAreaAction';
import { IMovieArea } from '../services/MovieAreaService';
interface IMovieFormProp extends RouteComponentProps {
    form: WrappedFormUtils
    onSubmit: (movie: IMovie) => Promise<string>
    movie?: IMovie,
    onLoad: () => void,
    area: IMovieAreaState,
    type: IMovieTypeState
}
interface IMovieFormState {
    isModal: boolean
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


class MovieForm extends Component<IMovieFormProp, IMovieFormState>{

    state = {
        isModal: false
    }
    componentDidMount() {
        console.log(this.props)
        this.props.onLoad()

    }

    private handleSubmit = (e: React.FormEvent<any>) => {
        console.log()
        e.preventDefault();
        this.props.form.validateFields(async (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue()
                const res = await this.props.onSubmit(formData as IMovie)
                if (res) {
                    message.error(res)
                } else {
                    if (this.props.movie) {
                        Modal.confirm({
                            title: '编辑成功是否跳转到电影列表页面？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                this.props.history.push("/movie")
                            }
                        })
                    } else {
                        Modal.confirm({
                            title: '添加成功是否跳转到电影列表页面？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                this.props.history.push("/movie")
                            }
                        })

                    }

                }
            }


        })




    }

    private handleGetAreas(): CheckboxOptionType[] {
        const newData = this.props.area.data.filter(i => i.isShow)
        const data = newData.map((it: IMovieArea) => {
            const obj: any = {}
            obj.label = it.area;
            obj.value = it.area
            return obj
        },
        )
        return data
    }
    private handleGetTypes(): CheckboxOptionType[] {
        const newData = this.props.type.data.filter(i => i.isShow)
        const data = newData.map((it: IMovieType) => {
            const obj: any = {}
            obj.label = it.types;
            obj.value = it.types
            return obj
        },
        )
        return data
    }
    render() {
        const allAreas: CheckboxOptionType[] = this.handleGetAreas();
        const allTypes: CheckboxOptionType[] = this.handleGetTypes();
        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...formItemLayout}
                onSubmit={this.handleSubmit}
            >
                <Form.Item label="海报">
                    {getFieldDecorator<IMovie>('poster')(
                        <UploadPoster />
                    )}
                </Form.Item>
                <Form.Item label="电影名称">
                    {getFieldDecorator<IMovie>('name', {
                        rules: [{ required: true, message: '请输入电影名称' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="地区"
                >
                    {getFieldDecorator<IMovie>('area', {
                        rules: [{ required: true, message: '请选择上映地区' }],
                    })(
                        <Checkbox.Group options={allAreas} />
                    )}
                </Form.Item>
                <Form.Item label="类型"
                >
                    {getFieldDecorator<IMovie>('types', {
                        rules: [{ required: true, message: '请选择电影类型' }],
                    })(
                        <Checkbox.Group options={allTypes} />
                    )}
                </Form.Item>
                <Form.Item label="时长"
                >
                    {getFieldDecorator<IMovie>('timelong', {
                        rules: [{ required: true, message: '请输入电影时长' }],
                    })(
                        <InputNumber min={1} step={10} />
                    )}
                </Form.Item>
                <Form.Item label="是否热映"
                >
                    {getFieldDecorator<IMovie>('isHot', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item label="是否正在上映"
                >
                    {getFieldDecorator<IMovie>('isComing', {
                        valuePropName: 'checked',
                        initialValue: false

                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item label="是否经典"
                >
                    {getFieldDecorator<IMovie>('isClassic', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item label="描述"
                >
                    {getFieldDecorator<IMovie>('discription', {

                    })(
                        <Input.TextArea />
                    )}
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 20,
                        offset: 4
                    }}
                >
                    <Button type="primary" htmlType="submit" >提交</Button>
                </Form.Item>

            </Form>
        )
    }
}
const mapStateToProps = (state: IRootState) => {
    const area = state.area;
    const type = state.type;
    return { area, type }
}
const mapDispatchToProps = (dispatch: Dispatch<movieAreaActions | movieTypeActions>) => {
    return {
        onLoad() {
            dispatch(fetchMovieAreaAction())
            dispatch(fetchMovieTypeAction())
        },

    }
}

type MovieField = {
    [p in Exclude<keyof IMovie, "_id">]: any
}
function fieldsHelper(movie: any): MovieField {
    let obj: any = {}
    for (const key in movie) {
        obj[key] = Form.createFormField({
            value: movie[key]
        })
    }
    return obj

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form.create<IMovieFormProp>({
    mapPropsToFields(props) {
        if (props.movie) {
            return fieldsHelper(props.movie)
        }
    },
}
)(MovieForm)))

