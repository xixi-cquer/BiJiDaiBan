/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstant';
/**
 * Saving and manipulating data displayed on the page.
 */
export class DataModel {
    constructor() {
        /**
         * Saved Data.
         */
        this.tasks = CommonConstants.TODO_DATA;
    }
    /**
     * Get the data.
     */
    getData() {
        function ascend(x, y) {
            return x[1] - y[1]; //按照数组的第4个值升序排列
        }
        this.tasks = this.tasks.sort(ascend);
        return this.tasks;
    }
    cheData(data) {
        let index = this.tasks.indexOf(data);
        if (data[1] === '0') {
            data.splice(1, 1, '1');
            this.tasks.splice(index, 1, data);
        }
        else {
            data.splice(1, 1, '0');
            this.tasks.splice(index, 1, data);
        }
        function ascend(x, y) {
            return x[1] - y[1]; //按照数组的第4个值升序排列
        }
        this.tasks = this.tasks.sort(ascend);
        return this.tasks;
    }
    setData(data) {
        this.tasks.unshift([data, '0']);
        return this.tasks;
    }
    delData(index) {
        this.tasks.splice(index, 1);
        return this.tasks;
    }
}
export default new DataModel();
//# sourceMappingURL=DataModel.js.map