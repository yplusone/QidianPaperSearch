import React from 'react';
import '../../css/common.css';
import './RK.css';
import { Divider, Tooltip } from 'antd';
class RK extends React.Component{
    getItem =()=>{
        let arr =[]
        for(let i=0;i<10;i++){
            let item={
                key:i,
                type:"区块链",
                title:" 基于区块链的论文审核机制",
                author:"王旌权"
            }
            arr.push(item)
        }
        return arr;
    }
    ItemToData =(item)=>(
    <div className="RankingInfo bcFlexRow" key={item.key}>
        <div className="RankingInfoType">
            [{item.type}]
        </div>
        <div className="RankingInfoTitle">
            <Tooltip title={item.title}>
                {item.title}
            </Tooltip>
        </div>
        <div className="RankingInfoAuthor">
            {item.author}
        </div>
    </div>)
    render(){
        return (
            <div className="RankingOutSide scFlexColumn">
                <div className="RankingTitle scFlexRow">
                    {this.props.title?this.props.title:"本周强推"}
                </div>
                <Divider style={{margin:"0px"}} />
                {this.getItem().map(this.ItemToData)}
            </div>
            )
    }
}

export default RK;