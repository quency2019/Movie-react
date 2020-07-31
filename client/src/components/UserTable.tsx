import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd';
import { IUser, IUserCondition } from '../services/UserService';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';


interface IUserTable {
    data: IUser[],
    onload: () => void,
    onDeleteUser: (_id: string) => void,
    condition: IUserCondition,
    total: number,
    onPageChange: (condition: IUserCondition) => void
}
export default class UserTable extends Component<IUserTable> {

    componentDidMount() {
        this.props.onload()
    }
    private pageConfig = (): false | PaginationConfig => {

        if (this.props.total === 0) {
            return false
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total

        }
    }


    private getColumns = (): ColumnProps<IUser>[] => {
        return [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '操作',
                key: '_id',
                render: (text) => (
                    <div>
                        <Button type="primary" size='small' href={`user/edit/${text._id}`}>编辑</Button>&nbsp;
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={(e) => {
                                if (e) {
                                    this.props.onDeleteUser(text._id)
                                }
                            }}

                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger" size='small'
                            >删除</Button> </Popconfirm>

                    </div>

                ),
            },
        ]



    }

    render() {
        console.log(this.props)
        return (
            <Table
                rowKey="_id"
                pagination={
                    this.pageConfig()
                }
                onChange={(e) => {
                    this.props.onPageChange({
                        page: e.current,
                        limit: e.pageSize,
                    })
                    console.log(e)
                }}
                dataSource={this.props.data}
                columns={this.getColumns()} />
        )
    }
}
