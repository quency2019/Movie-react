import React from 'react'
import { Route, NavLink, withRouter, RouteComponentProps, Switch } from 'react-router-dom'
import Home from './Home'
import MovieList from './movie/MovieList'
import AddMovie from './movie/AddMovie'
import { Layout, Menu, Row, Col, } from 'antd';
import Type from './movie/Type'
import Area from './movie/Area'
import EditMovie from './movie/EditMovie'
import AddUser from './user/AddUser'
import UserList from './user/UserList'
import EditUser from './user/EditUser'
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

interface ILayoutProp extends RouteComponentProps {


}
function getAdmin() {

    if (localStorage.getItem('admin')) {
        const admin = JSON.parse(localStorage.getItem('admin')!)
        return admin.username
    }
    return null
}
const _Layout: React.FC<ILayoutProp> = (props) => {
    console.log(props)
    return (
        <div className="container">
            <Layout>
                <Header className="header">
                    <Row>
                        <Col span={12}>
                            <NavLink to="/"><h2>电影管理系统</h2></NavLink>
                        </Col>
                        <Col span={8} ></Col>
                        <Col span={4} className="header-right" >
                            欢迎您{getAdmin()}
                        </Col>
                    </Row>


                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            defaultOpenKeys={[props.location.pathname]}
                            mode="inline"
                            theme="dark"
                        >
                            <SubMenu
                                key="/movie"
                                title={
                                    <span>
                                        <span>电影管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/movie"><NavLink to="/movie">电影列表</NavLink></Menu.Item>
                                <Menu.Item key="/movie/add"><NavLink to="/movie/add">添加电影</NavLink></Menu.Item>
                                <Menu.Item key="/movie/type"><NavLink to="/movie/type">电影类型</NavLink></Menu.Item>
                                <Menu.Item key="/movie/area"><NavLink to="/movie/area">电影地区</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="/user"
                                title={
                                    <span>
                                        <span>用户管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/user"><NavLink to="/user">用户列表</NavLink></Menu.Item>
                                <Menu.Item key="/user/add"><NavLink to="/user/add">添加用户</NavLink></Menu.Item>
                                {/* <Menu.Item key="7">添加用户</Menu.Item> */}
                                {/* <Menu.Item key="8">添加用户</Menu.Item> */}
                            </SubMenu>
                        </Menu>

                    </Sider>
                    <Content>
                        <div className="main">
                            <Route path="/" exact component={Home}></Route>
                            <Route path="/movie" exact component={MovieList}></Route>
                            <Route path="/movie/add" exact component={AddMovie}></Route>
                            <Route path="/movie/type" exact component={Type}></Route>
                            <Route path="/movie/area" exact component={Area}></Route>
                            <Route path="/movie/edit/:id" exact component={EditMovie}></Route>
                            <Route path="/user" exact component={UserList}></Route>
                            <Route path="/user/add" exact component={AddUser}></Route>
                            <Route path="/user/edit/:id" exact component={EditUser}></Route>
                        </div>
                    </Content>
                </Layout>

            </Layout>


        </div>
    )
}
export default _Layout