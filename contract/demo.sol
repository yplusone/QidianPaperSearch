pragma solidity ^0.4.24;

import "./Table.sol";

contract Asset {
    // event
    event RegisterEvent(int256 ret, string account, uint256 role);
    event TransferEvent(int256 ret, string from_account, string to_account, uint256 amount);
    event DownloadEvent(int256 ret,string account,uint256 paper_hash);
    constructor() public {
        // 构造函数中创建t_asset表
        createTableofUser();
        createTableofPaper();
    }

    function createTableofUser() private {
        TableFactory tf = TableFactory(0x1001); 
        // 资产管理表, key : account, field : asset_value
        // |  资产账户(主键)      |     资产金额       | 角色|
        // |-------------------- |-------------------|--------|
        // |        account      |    asset_value    |   role  |     
        // |---------------------|-------------------|--------|
        //role:1 for reader;2 for writer;3 for Reviewer;
        // 创建表
        tf.createTable("t_asset", "account", "asset_value,role");
    }
    function createTableofPaper() private {
        TableFactory tf = TableFactory(0x1001); 
        // 资产管理表, key : account, field : asset_value
        // |  资产账户(主键)      |     拥有者       | 收入|
        // |-------------------- |-------------------|--------|
        // |        paper_hash      |    owner    | income  |     
        // |---------------------|-------------------|--------|
        // 创建表
        tf.createTable("t_paper", "paper_hash", "owner,income");
    }
    function openTableofUser() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("t_asset");
        return table;
    }
    function openTableofPaper() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("t_paper");
        return table;
    }

    /*
    描述 : 根据资产账户查询资产金额
    参数 ： 
            account : 资产账户

    返回值：
            参数一： 成功返回0, 账户不存在返回-1
            参数二： 第一个参数为0时有效，资产金额
    */
    function selectUser(string account) public constant returns(int256, uint256, uint256) {
        // 打开表
        Table table = openTableofUser();
        // 查询
        Entries entries = table.select(account, table.newCondition());
        uint256 asset_value = 0;
        uint256 role_name=0;
        if (0 == uint256(entries.size())) {
            return (-1, asset_value,role_name);
        } else {
            Entry entry = entries.get(0);
            return (0, uint256(entry.getInt("asset_value")),uint256(entry.getInt("role")));
        }
    }
    function selectPaper(string paper_hash) public constant returns(int8, string,int256) {
        // 打开表
        Table table = openTableofPaper();
        // 查询
        Entries entries = table.select(paper_hash, table.newCondition());
        string owner;
        int256 income=0;
        if (0 == uint256(entries.size())) {
            return (-1, owner,income);
        } else {
            Entry entry = entries.get(0);
            return (0, string(entry.getAddress("owner")),uint256(entry.getInt("income")));
        }
    }
    /*
    描述 : 资产注册
    参数 ： 
            account : 资产账户
            amount  : 资产金额
    返回值：
            0  资产注册成功
            -1 资产账户已存在
            -2 其他错误
    */
    function register(string account, uint256 role) public returns(int256){
        int256 ret_code = 0;
        int256 ret= 0;
        int256 asset_value=2000;//every person can get 2000 after registering
        uint256 temp_asset_value = 0;
        uint256 temp_role_value = 0;
        // 查询账户是否存在
        (ret, temp_asset_value,temp_role_value) = selectUser(account);
        if(ret != 0) {
            Table table = openTableofUser();
            
            Entry entry = table.newEntry();
            entry.set("account", account);
            entry.set("role", int256(asset_value));
            entry.set("role", int256(role));
            // 插入
            int count = table.insert(account, entry);
            if (count == 1) {
                // 成功
                ret_code = 0;
            } else {
                // 失败? 无权限或者其他错误
                ret_code = -2;
            }
        } else {
            // 账户已存在
            ret_code = -1;
        }

        emit RegisterEvent(ret_code, account, role);

        return ret_code;
    }

    /*
    描述 : 资产转移
    参数 ： 
            from_account : 转移资产账户
            to_account ： 接收资产账户
            amount ： 转移金额
    返回值：
            0  资产转移成功
            -1 转移资产账户不存在
            -2 接收资产账户不存在
            -3 金额不足
            -4 金额溢出
            -5 其他错误
    */
    function transfer(string from_account, string to_account, uint256 amount) public returns(int256) {
        // 查询转移资产账户信息
        int ret_code = 0;
        int256 ret = 0;
        uint256 from_asset_value = 0;
        uint256 to_asset_value = 0;
        uint256 from_role_value=0;
        uint256 to_role_value=0;
        // 转移账户是否存在?
        (ret, from_asset_value,from_role_value) = selectUser(from_account);
        if(ret != 0) {
            ret_code = -1;
            // 转移账户不存在
            emit TransferEvent(ret_code, from_account, to_account, amount);
            return ret_code;

        }

        // 接受账户是否存在?
        (ret, to_asset_value,to_role_value) = selectUser(to_account);
        if(ret != 0) {
            ret_code = -2;
            // 接收资产的账户不存在
            emit TransferEvent(ret_code, from_account, to_account, amount);
            return ret_code;
        }

        if(from_asset_value < amount) {
            ret_code = -3;
            // 转移资产的账户金额不足
            emit TransferEvent(ret_code, from_account, to_account, amount);
            return ret_code;
        } 

        if (to_asset_value + amount < to_asset_value) {
            ret_code = -4;
            // 接收账户金额溢出
            emit TransferEvent(ret_code, from_account, to_account, amount);
            return ret_code;
        }

        Table table = openTableofUser();

        Entry entry0 = table.newEntry();
        entry0.set("account", from_account);
        entry0.set("asset_value", int256(from_asset_value - amount));
        entry0.set("role",int256(from_role_value));
        // 更新转账账户
        int count = table.update(from_account, entry0, table.newCondition());
        if(count != 1) {
            ret_code = -5;
            // 失败? 无权限或者其他错误?
            emit TransferEvent(ret_code, from_account, to_account, amount);
            return ret_code;
        }

        Entry entry1 = table.newEntry();
        entry1.set("account", to_account);
        entry1.set("asset_value", int256(to_asset_value + amount));
        entry1.set("role",int256(to_role_value));
        // 更新接收账户
        table.update(to_account, entry1, table.newCondition());

        emit TransferEvent(ret_code, from_account, to_account, amount);

        return ret_code;
    }
    function downloadpaper(string account,int256 paper_hash) public returns(int256) {
        // 查询转移资产账户信息
        int ret_code = 0;
        int256 ret = 0;
        uint256 from_asset_value = 0;
        uint256 from_role_value=0;
        // 转移账户是否存在?
        (ret, from_asset_value,from_role_value) = selectUser(account);
        if(ret != 0) {
            ret_code = -1;
            // 转移账户不存在
            emit TransferEvent(ret_code, account, paper_hash);
            return ret_code;

        }

        int256 amount=10; //still on discussion
        if(from_asset_value < amount) {
            ret_code = -3;
            // 转移资产的账户金额不足
            emit TransferEvent(ret_code, account, paper_hash);
            return ret_code;
        } 
        string writer_account;
        int256 writer_income=0;
        (ret,writer_account,writer_income)=selectPaper(paper_hash);
        if (writer_income + amount < writer_income) {
            ret_code = -4;
            // 接收账户金额溢出
            emit TransferEvent(ret_code, account,paper_hash);
            return ret_code;
        }

        Table table = openTableofUser();

        Entry entry0 = table.newEntry();
        entry0.set("account",account);
        entry0.set("asset_value", int256(from_asset_value - amount));
        entry0.set("role",int256(from_role_value));
        // 更新转账账户
        int count = table.update(account, entry0, table.newCondition());
        if(count != 1) {
            ret_code = -5;
            // 失败? 无权限或者其他错误?
            emit TransferEvent(ret_code, account,paper_hash);
            return ret_code;
        }
        Table table2=openTableofPaper(paper_hash);
        Entry entry1 = table2.newEntry();
        entry1.set("paper_hash",paper_hash);
        entry1.set("owner", writer_account);
        entry1.set("income", int256(writer_income + amount));
        // 更新接收账户
        table.update(paper_hash, entry1, table.newCondition());

        emit TransferEvent(ret_code, account, paper_hash);

        return ret_code;
    }

}