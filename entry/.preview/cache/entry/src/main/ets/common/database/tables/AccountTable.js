/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import relationalStore from '@ohos:data.relationalStore';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import Rdb from '@bundle:com.example.rdb/entry/ets/common/database/Rdb';
export default class AccountTable {
    constructor(callback = () => {
    }) {
        this.accountTable = new Rdb(CommonConstants.ACCOUNT_TABLE.tableName, CommonConstants.ACCOUNT_TABLE.sqlCreate, CommonConstants.ACCOUNT_TABLE.columns);
        this.accountTable.getRdbStore(callback);
    }
    getRdbStore(callback = () => {
    }) {
        this.accountTable.getRdbStore(callback);
    }
    insertData(account, callback) {
        const valueBucket = generateBucket(account);
        this.accountTable.insertData(valueBucket, callback);
    }
    deleteData(account, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('id', account.id);
        this.accountTable.deleteData(predicates, callback);
    }
    updateData(account, callback) {
        const valueBucket = generateBucket(account);
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('id', account.id);
        this.accountTable.updateData(predicates, valueBucket, callback);
    }
    query(text, callback, isAll = true) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        if (!isAll) {
            predicates.like('title', '%' + text + '%').or().like('txt', '%' + text + '%');
        }
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = {
                        id: 0, title: '', txt: '', url: ''
                    };
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.title = resultSet.getString((resultSet.getColumnIndex('title')));
                    tmp.txt = resultSet.getString((resultSet.getColumnIndex('txt')));
                    tmp.url = resultSet.getString((resultSet.getColumnIndex('url')));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                callback(result);
            }
        });
    }
}
function generateBucket(account) {
    let obj = {};
    obj.title = account.title;
    obj.txt = account.txt;
    obj.url = account.url;
    return obj;
}
//# sourceMappingURL=AccountTable.js.map