import React, { Component } from 'react'
import { Table, Switch, Button, Popconfirm, Icon, Input } from 'antd';
import { IMovieState } from '../store/reducers/movieReducer';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import { IMovie } from '../services/MovieService';
import { SwitchType } from '../services/CommonTypes';
import posterDefault from '../assets/poster_default.jpeg'

interface IMovieFunc {
    onLoad: () => void,
    onSwitchChange: (type: SwitchType, val: boolean, id: string) => void,
    onDeleteMovie: (id: string) => void,
    onChangePage: (page: number) => void,
    onKeyChange: (key: string) => void,
    onSearch: () => void

}
export default class MovieTable extends Component<IMovieState & IMovieFunc> {
    componentDidMount() {

        if (this.props.onLoad) {
            this.props.onLoad()
        }
    }

    private pageConfig = (): false | PaginationConfig => {

        if (this.props.total === 0) {
            return false
        }
        return {
            current: this.props.searchConditons.page,
            pageSize: this.props.searchConditons.limit,
            total: this.props.total

        }
    }

    private handleChange = (pagination: PaginationConfig) => {
        console.log(pagination)
        this.props.onChangePage(pagination.current!)

    }

    private handleReset = () => {
        this.props.onKeyChange("")
        this.props.onSearch()
    }
    private filterHelper = (p: object) => {
        return (<div style={{ padding: 8 }}>
            <Input
                value={this.props.searchConditons.key}
                onChange={(e) => {
                    this.props.onKeyChange(e.target.value)
                }}
                onPressEnter={this.props.onSearch}

                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
                type="primary"
                icon="search"
                size="small"
                style={{ width: 90, marginRight: 8 }}
                onClick={this.props.onSearch}
            >
                搜索
            </Button>
            <Button onClick={this.handleReset} size="small" style={{ width: 90 }}>
                重置
            </Button>
        </div>)
    }


    private getColums(): ColumnProps<IMovie>[] {
        return [
            {
                title: "封面", key: 'poster', render: (text) => {
                    if (!text.poster) {
                        return <img className="posterImg" alt="" src={posterDefault} />
                    } else {
                        return <img className="posterImg" alt="" src={text.poster} />
                    }

                }
            },
            {
                title: "名称", dataIndex: "name", key: 'name',
                filterDropdown: this.filterHelper,
                filterIcon: <Icon type="search" />
            },
            {
                title: "地区", key: 'area',
                render: (text) => {
                    return text.area.join(", ")
                }
            },
            {
                title: "类型", key: 'types',
                render: (text) => {
                    return text.types.join(", ")
                }
            },
            {
                title: "时长", key: 'timelong',
                render: (text) => {
                    return `${text.timelong}分钟`
                }

            },
            {
                title: "是否热映", key: 'isHot',
                render: (text) => {
                    return <Switch checked={text.isHot} onChange={(checked) => {
                        this.props.onSwitchChange(SwitchType.isHot, checked, text._id)
                    }} />
                }
            },
            {
                title: "是否正在上映", key: 'isComing',
                render: (text) => {
                    return <Switch checked={text.isComing} onChange={(checked) => {
                        this.props.onSwitchChange(SwitchType.isComing, checked, text._id)
                    }} />
                }
            },
            {
                title: "是否经典", key: 'isClassic',
                render: (text) => {
                    // console.log(text)
                    return <Switch checked={text.isClassic} onChange={(checked) => {
                        this.props.onSwitchChange(SwitchType.isClassic, checked, text._id)
                    }} />
                }
            },
            {
                title: '操作',
                key: '_id',
                render: (text) => (
                    <div>
                        <Button type="primary" size='small' href={`movie/edit/${text._id}`}>编辑</Button>&nbsp;
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={(e) => {
                                if (e) {
                                    this.props.onDeleteMovie(text._id)
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

        return (
            <div>
                <Table
                    loading={this.props.isLoading}
                    rowKey="_id"
                    dataSource={this.props.data}
                    columns={this.getColums()}
                    pagination={
                        this.pageConfig()
                    }
                    onChange={
                        this.handleChange
                    }

                />
            </div>
        )
    }
}
