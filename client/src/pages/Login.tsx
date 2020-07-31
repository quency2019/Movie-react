import React, { Component, Dispatch } from 'react'
import { Form, Input, Button, Icon, message } from 'antd'

import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { IAdminState, IAdmin } from '../store/reducers/adminReducer';
import { IRootState } from '../store/reducers/reducers';
import { adminAction, adminActions, setLoginAdminAction } from '../store/actions/admin';
import { RouteComponentProps } from 'react-router';


interface ILoginProps extends RouteComponentProps {
    form: WrappedFormUtils,
    admin: IAdminState,
    onLoad: () => void,
    onLogin: (admin: IAdmin) => void

}
class Login extends Component<ILoginProps>{

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                const data = this.props.admin.data.find(i => i.username === values.username)
                if (data) {
                    if (data.password === values.password) {
                        this.props.onLogin(values)
                        message.success("登陆成功")
                        localStorage.setItem("admin", JSON.stringify(data))
                        this.props.history.push(`${this.props.location.state}`)
                    } else {
                        message.warn("密码错误")
                    }



                }


            }
        });
    }
    componentDidMount() {
        this.props.onLoad()
        console.log(this.props.location.state)
    }
    render() {


        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-bg">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆 </Button>

                    </Form.Item>

                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state: IRootState) => {
    return {
        admin: state.admin,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<adminActions>) => {
    return {
        onLoad() {
            dispatch(adminAction())
        },
        onLogin(admin: IAdmin) {
            dispatch(setLoginAdminAction(admin))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<ILoginProps>({
    mapPropsToFields(props) {
        if (localStorage.getItem('admin')) {
            const admin = JSON.parse(localStorage.getItem('admin')!)
            if (admin) {
                return {
                    username: Form.createFormField({
                        value: admin.username,
                    }),
                    password: Form.createFormField({
                        value: admin.password,
                    }),

                };
            }
        }


    }
})(Login))