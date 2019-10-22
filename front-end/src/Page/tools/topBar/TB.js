import React from 'react';
import '../../css/common.css';
import './TB.css';
import { Button, Modal, Input } from 'antd';
import {Link} from 'react-router-dom'
const ButtonGroup = Button.Group;

class TB extends React.Component{
    constructor(props){
        super()
        this.state={
            loginInfo:{
                visible:false,
                keystore:"",
                pass:""
            }
        }
    }
    handleInfoChangeLoginUserName=(e)=>{
        let loginInfo = this.state.loginInfo;
        loginInfo.keystore=e.target.value;
        this.setState({loginInfo:loginInfo})
    }
    handleInfoChangeLoginPassword=(e)=>{
        let loginInfo = this.state.loginInfo;
        loginInfo.pass=e.target.value;
        this.setState({loginInfo:loginInfo})
    }
    handleLogInStart=()=>{
        let loginInfo = this.state.loginInfo;
        loginInfo.visible=true;
        this.setState({loginInfo:loginInfo})
    }
    handleLogInCancel=()=>{
        let loginInfo = this.state.loginInfo;
        loginInfo.visible=false;
        this.setState({loginInfo:loginInfo})
    }
    handleLogInSuccess=()=>{
        let loginInfo = this.state.loginInfo;
        console.log("login success:",loginInfo)
        loginInfo.keystore="";
        loginInfo.pass="";
        loginInfo.visible=false;
        this.setState({loginInfo:loginInfo})
    }
    
    render(){
        return (
            <div className="buttonBar bcFlexRow">
                <Modal
                    title="登录界面(但我们还是推荐您使用钱包登陆)"
                    visible={this.state.loginInfo.visible}
                    onOk={this.handleLogInSuccess}
                    onPressEnter={this.handleLogInSuccess}
                    onCancel={this.handleLogInCancel}
                    okText="登录"
                    cancelText="取消"
                    closable={false}
                >
                    <Input defaultValue=""  placeholder="请输入KeyStore" addonBefore={<div style={{width:"60px"}}>KeyStore</div>} onChange={this.handleInfoChangeLoginUserName}/>
                    <Input.Password defaultValue="" visibilityToggle={false} placeholder="请输入密码"  addonBefore={<div style={{width:"60px"}}>Password</div>} onChange={this.handleInfoChangeLoginPassword} />
                </Modal>
                <p>
                    <Link to="/" style={{color:"white"}}>起点论文网</Link>
                </p>
                <ButtonGroup>
                    <Button type="default" onClick={()=>{this.handleLogInStart()}}>登录</Button>
                    <Button type="primary"><Link to="/BackEnd/Data">管理</Link></Button>
                </ButtonGroup>
            </div>
            )
    }
}

export default TB;
