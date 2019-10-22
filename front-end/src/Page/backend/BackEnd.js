import React from 'react';
import '../css/common.css';
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import './BackEnd.css'
import { Card, Avatar } from 'antd';
import { Statistic, Row, Col } from 'antd';
import { Upload, message } from 'antd';
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;

const Uploadprops = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class BackEnd extends React.Component{
  constructor(props){
    super()
  } 
  getData =()=>(
    <div>
      <Card
          style={{ width: 1200}}
          cover={
            <img
              style={{width:1200,height:200,objectFit:"cover"}}
              alt="example"
              src="https://i0.hdslb.com/bfs/space/e5256682bac0aeb01db9fad3b374988abef99bc0.png"
            />
          }
          actions={[
            <Icon type="setting" key="setting" />,
            <Icon type="edit" key="edit" />,
            <Icon type="ellipsis" key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="游鱼星"
            description="But nothing happened"
          />
        </Card>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="发布论文数"
                value={110}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={null}
                suffix="篇"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="审核论文数"
                value={90}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={null}
                suffix="篇"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="待审论文数"
                value={9}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={null}
                suffix="篇"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="合格论文数"
                value={72}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={null}
                suffix="篇"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="论文合格率"
                value={80}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={null}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="审核成功率"
                value={90}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={null}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="诚信指数"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={null}
                suffix="/10"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="目前等级"
                value={10}
                precision={0}
                valueStyle={{ color: '#cf1322' }}
                prefix={null}
                suffix="级审核者"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
  getUpload =()=>(
  <Dragger {...Uploadprops} style={{width:1200,height:500}}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">点击或拖动文件到此处进行上传</p>
      <p className="ant-upload-hint">
        支持单个或多个文件一起上传
      </p>
    </Dragger>
  )
  getApprove =()=>{return 'Approve'}
  getInfo = ()=>{
    return "所有最终解释权由项目团队保留"
  }
  getOp =()=>{
    if(this.props.match.params.op==undefined)return "undefined"
    switch(this.props.match.params.op){
      case "Data":return this.getData()
      case "Upload":return this.getUpload()
      case "Approve":return this.getApprove()
      case "Info":return this.getInfo()
    }
  } 
  CheckOp =()=>{
    if(this.props.match.params.op==undefined)return '1'
    switch(this.props.match.params.op){
      case "Data":return '1'
      case "Upload":return "2"
      case "Approve":return "3"
      case "Info":return "4"
    }
  }
  render(){

        return (
          <Layout style={{width:1536}}>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.CheckOp()]}>
                <Menu.Item key="1">
                  <Link to="/BackEnd/Data" >
                    <Icon type="clock-circle" />
                    <span className="nav-text">数据概览</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/BackEnd/Upload">
                    <Icon type="upload" />
                    <span className="nav-text">上传论文</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/BackEnd/Approve">
                    <Icon type="user" />
                    <span className="nav-text">参与审批</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/BackEnd/Info">
                    <Icon type="info-circle" />
                    <span className="nav-text">相关条例</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '24px 16px 0' }}>
                <div className="scFlexColumn" style={{ padding: 24, background: '#fff', minHeight: 705 }}>{this.getOp()}</div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>PaperX ©2019</Footer>
            </Layout>
          </Layout>            
    )
  }
}

export default BackEnd;
