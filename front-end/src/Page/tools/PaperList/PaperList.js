import React from 'react';
import '../../css/common.css';
import './PaperList.css';
import { Divider } from 'antd';
class PL extends React.Component{
    render(){
        return (
           <div className="PLoutside bsFlexRow">
               <div className="PLinfo">
                    <div className="PLtitle">
                        基于区块链的论文审核机制
                    </div>
                    <div className="PLtitle">
                        Paper Auditing Mechanism Based on Block Chain
                    </div>
                    <div className="PLAuthor">
                        作者：王旌权
                    </div>
                    <div className="PLFrom">
                        计算机报：卷：87 页：472 出版年：2029
                    </div>
                    <div className="PLFrom">
                        Computer Report: Volume: 87 pages: 472 year: 2029
                    </div>
               </div>
               <div className="PLnumber csFlexRow">
                    {this.props.number}
               </div>
                
           </div>
            )
    }
}
export default PL;
