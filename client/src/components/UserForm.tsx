import React, { Component } from 'react'
import { Form, Button, Checkbox, Input, message, Modal } from 'antd'
import { IUser } from '../services/UserService';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { withRouter, RouteComponentProps } from 'react-router';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 12,
            offset: 4,
        },
    },
};
interface IUserFormProp extends RouteComponentProps {
    user?: IUser,
    onChange: (user: IUser) => Promise<string>,
    form: WrappedFormUtils
}
class UserForm extends Component<IUserFormProp, any> {

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                console.log(values)

                const res = await this.props.onChange(values)
                if (res) {
                    message.warn(res)
                } else {
                    if (this.props.user) {

                        Modal.confirm({
                            title: '编辑成功是否跳转到电影列表页面？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                this.props.history.push("/user")
                            }
                        })
                    } else {
                        Modal.confirm({
                            title: '添加成功是否跳转到电影列表页面？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                this.props.history.push("/user")
                            }
                        })
                    }
                }

            }
        });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                            {
                                max: 18,
                                message: '用户名长度不能超过18!'
                            },
                            {
                                min: 3,
                                message: '用户名长度不能小于3!'
                            }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码',

                            },
                            {
                                max: 18,
                                message: '用户名长度不能超过18!'
                            },
                            {
                                min: 6,
                                message: '用户名长度不能小于6!'
                            },

                        ],
                    })(<Input.Password />)}
                </Form.Item>
                {/*    <Form.Item label="再次输入密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入密码!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item> */}

                <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入姓名!',
                            },
                            {
                                max: 10,
                                message: '姓名长度不能超过10!'
                            },
                            {
                                min: 1,
                                message: '姓名长度不能小于1!'
                            }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, message: '请输入手机号' },
                            {
                                max: 11,
                                message: '手机号长度不能超过11!'
                            },
                            {
                                min: 11,
                                message: '手机号长度不能小于11!'
                            },
                            {
                                pattern: /^[1][3-8][0-9]{9}$/, message: '请输入正确手机号'
                            }

                        ],
                    })(<Input />)}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
              </Button>
                </Form.Item>
            </Form>
        )
    }
}
type UserField = {
    [p in Exclude<keyof IUser, "_id">]: any
}
function getFields(user: any): UserField {
    const obj: any = {}
    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            obj[key] = Form.createFormField({
                value: user[key],
            })
        }
    }
    return obj
}
export default withRouter(Form.create<IUserFormProp>({
    mapPropsToFields(props) {
        if (props.user) {
            return getFields(props.user)
        }
    }
})(UserForm))
