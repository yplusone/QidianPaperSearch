import React from 'react';
import '../css/common.css';
import './Search.css';
import PL from '../tools/PaperList/PaperList';
import { Pagination } from 'antd';
class Search extends React.Component{
    constructor(props){
        super()
        this.state={
            page:1
        }
    }
    getItem =()=>{
        let arr =[];
        let page = this.state.page-1
        for(let i=page*4;i<page*4+4;i++){
            let item={
                key:i+1
            }
            arr.push(item)
        }
        return arr;
    }

    itemToData =(item)=>(<PL key={item.key} number={item.key}/>)
    
    refresh = (i) =>{
        this.setState({page:i})
    }

    render(){
        return (
           <div className="SearchOutSide ssFlexRow">
               <div className="SearchInfo scFlexColumn">
                    <div className="SearchInfoTitle csFlexColumn">
                        <div className="SearchResultTitle ccFlexRow">
                            检索结果：<p>46</p>
                        </div>
                        <div className="SearchResultTitle ccFlexRow">
                            检索内容：<p>区块链</p>
                        </div>
                    </div>
               </div>
               <div className="SearchContent ssFlexColumn">
                    <div className="SearchContentTitle bcFlexRow">
                        <div className="SearchChoice ccFlexRow">
                            <div className="SearchChoiceInside bcFlexRow">
                                <div>排序方式：</div>
                                <div>日期</div>
                                <div>被引次数</div>
                                <div>使用次数</div>
                                <div>相关性</div>
                            </div>
                        </div>
                    </div>
                    <div className="resultOutSide scFlexRow">
                        <div className="result acFlexColumn">
                            {this.getItem().map(this.itemToData)} 
                            <Pagination
                                defaultPageSize={4}
                                defaultCurrent={1}
                                hideOnSinglePage={true}
                                total={300}
                                showLessItems={true}
                                onChange={(page,pagesize)=>{this.refresh(page)}}
                                />        
                        </div>
                        <div className="operator scFlexColumn">
                            
                    
                        </div>
                    </div>
               </div>
           </div>
            )
    }
}

export default Search;
