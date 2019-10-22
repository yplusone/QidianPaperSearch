import React from 'react';
import '../css/common.css';
import './Login.css';
import { Input, Button } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
class Login extends React.Component{
    render(){
        return (
           <div className="LoginOutSide scFlexColumn">
               <div className="LoginInfo scFlexRow">
                    <div className="InfoToLogin">
                        请登录以继续访问
                    </div>
               </div>
               <div className="LoginContent bcFlexRow">
                    <div className="LoginInfoContent bsFlexColumn">
                        <div className="InfoLoginWord">
                            注册用户登录
                        </div>
                        <div className="InfoLoginWordSmall">
                            使用您的PaperX账户登录，注意要通过漫游功能登录，必须最近曾在机构处进行过登录
                        </div>
                        <div className="InfoLoginForm bsFlexColumn">
                            <Input addonBefore="账户"/>
                            <Input.Password addonBefore="密码"/>
                            <Button>登录</Button>
                        </div>
                        <div className="InfoLoginWord">
                            机构用户登录1
                        </div>
                        <div className="InfoLoginWordSmall">
                            授权用户请选择你的机构所属的组织或地区
                        </div>
                        <div className="InfoLoginForm2 bsFlexRow">
                        <Select defaultValue="hangzhou" style={{ width: 200 }} onChange={null}>
                            <Option value="hangzhou">杭州</Option>
                            <Option value="xihu">西湖区</Option>
                        </Select>
                            <Button>登录</Button>
                        </div>
                        <div className="InfoLoginWord">
                            需要协助
                        </div>
                        <div className="InfoLoginWordSmall">
                            联系您的机构以解决登录和注册的问题
                        </div>
                        <div className="InfoLoginWordSmall">
                            您的ip地址为:168.192.1.1
                        </div>
                    </div>
                    <div className="LoginInfoTips">
                        <div className="InfoLoginTip">
                            未注册？
                        </div>
                        <div className="InfoLoginTipSmall">
                            注册之后即可体验诸多丰富的功能
                        </div>
                        <div className="InfoLoginTip">
                            无法注册？
                        </div>
                    </div>
               </div>
           </div>
            )
    }
}

export default Login;
