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
import DataModel from '@bundle:com.example.rdb/entry/ets/viewmodel/DataModel';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstant';
import CommonConstant from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import ToDoItem from '@bundle:com.example.rdb/entry/ets/view/ToDoItem';
import router from '@ohos:router';
import Constants from '@bundle:com.example.rdb/entry/ets/common/constants/Constants';
import prompt from '@ohos:prompt';
class CustomDialogExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__newStr = new SynchedPropertySimpleTwoWayPU(params.newStr, this, "newStr");
        this.controller = undefined;
        this.confirm = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newStr.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get newStr() {
        return this.__newStr.get();
    }
    set newStr(newValue) {
        this.__newStr.set(newValue);
    }
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/ToDoListPage.ets(30:5)");
            Column.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.height('40%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/ToDoListPage.ets(31:7)");
            Row.width(CommonConstant.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('添加待办');
            Text.debugLine("pages/ToDoListPage.ets(32:9)");
            Text.fontWeight(FontWeight.Bold);
            Text.height({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('提交');
            Text.debugLine("pages/ToDoListPage.ets(38:9)");
            Text.fontSize({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.textAlign(TextAlign.End);
            Text.height({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.width({ "id": 16777347, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ right: { "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Text.onClick(() => {
                var _a;
                if (this.newStr === '') {
                    prompt.showToast({ message: '不能添加空待办', bottom: CommonConstant.PROMPT_BOTTOM });
                }
                else {
                    this.confirm(this.newStr);
                    (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
                }
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.create({ placeholder: this.newStr === '' ? '填写内容' : this.newStr, text: this.newStr === '' ? '' : this.newStr });
            TextInput.debugLine("pages/ToDoListPage.ets(57:7)");
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.fontSize({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.placeholderFont({ size: { "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.margin({ top: { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.backgroundColor(Color.White);
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.onChange((value) => {
                this.newStr = value;
            });
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.width(Constants.FULL_PERCENT);
            //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
            TextInput.height('60vp');
            if (!isInitialRender) {
                //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class ToDoListPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__totalTasks = new ObservedPropertyObjectPU([], this, "totalTasks");
        this.__isEdit = new ObservedPropertySimplePU(false, this, "isEdit");
        this.__newStr = new ObservedPropertySimplePU('', this, "newStr");
        this.__count = new ObservedPropertySimplePU(0, this, "count");
        this.deleteList = [];
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample(this, {
                    newStr: this.__newStr,
                    confirm: (newStr) => { this.addItem(newStr), this.newStr = ''; }
                });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.totalTasks !== undefined) {
            this.totalTasks = params.totalTasks;
        }
        if (params.isEdit !== undefined) {
            this.isEdit = params.isEdit;
        }
        if (params.newStr !== undefined) {
            this.newStr = params.newStr;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.deleteList !== undefined) {
            this.deleteList = params.deleteList;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__totalTasks.purgeDependencyOnElmtId(rmElmtId);
        this.__isEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__newStr.purgeDependencyOnElmtId(rmElmtId);
        this.__count.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__totalTasks.aboutToBeDeleted();
        this.__isEdit.aboutToBeDeleted();
        this.__newStr.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get totalTasks() {
        return this.__totalTasks.get();
    }
    set totalTasks(newValue) {
        this.__totalTasks.set(newValue);
    }
    get isEdit() {
        return this.__isEdit.get();
    }
    set isEdit(newValue) {
        this.__isEdit.set(newValue);
    }
    get newStr() {
        return this.__newStr.get();
    }
    set newStr(newValue) {
        this.__newStr.set(newValue);
    }
    get count() {
        return this.__count.get();
    }
    set count(newValue) {
        this.__count.set(newValue);
    }
    aboutToAppear() {
        this.totalTasks = DataModel.getData();
    }
    addItem(text) {
        this.totalTasks = DataModel.setData(text);
    }
    deleteListItem() {
        for (let i = 0; i < this.deleteList.length; i++) {
            let index = this.totalTasks.indexOf(this.deleteList[i]);
            this.totalTasks = DataModel.delData(index);
        }
        this.deleteList = [];
        this.isEdit = false;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.COLUMN_SPACE });
            Column.debugLine("pages/ToDoListPage.ets(109:5)");
            Column.width(CommonConstants.FULL_LENGTH);
            Column.height(CommonConstants.FULL_LENGTH);
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/ToDoListPage.ets(110:7)");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/ToDoListPage.ets(111:9)");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('笔记');
            Text.debugLine("pages/ToDoListPage.ets(112:11)");
            Text.fontWeight(FontWeight.Bold);
            Text.height({ "id": 16777296, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Text.fontColor(Color.Gray);
            Text.onClick(() => {
                router.back();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('   ');
            Text.debugLine("pages/ToDoListPage.ets(121:11)");
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('待办');
            Text.debugLine("pages/ToDoListPage.ets(122:11)");
            Text.fontWeight(FontWeight.Bold);
            Text.height({ "id": 16777296, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['ic_public_edit.svg'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/ToDoListPage.ets(133:9)");
            Image.width({ "id": 16777294, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.aspectRatio(1);
            Image.margin({ right: { "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Image.onClick(() => {
                this.isEdit = !this.isEdit;
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // Text($r('app.string.page_title'))
            //   .fontSize($r('app.float.title_font_size'))
            //   .fontWeight(FontWeight.Bold)
            //   .lineHeight($r('app.float.title_font_height'))
            //   .width(CommonConstants.TITLE_WIDTH)
            //   .margin({
            //     top: $r('app.float.title_margin_top'),
            //     bottom: $r('app.float.title_margin_bottom')
            //   })
            //   .textAlign(TextAlign.Start)
            //   .onClick(()=>{
            //     router.pushUrl({url:'pages/ToDoListPage'})
            //   })
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/ToDoListPage.ets(162:9)");
                    Row.onClick(() => {
                        this.totalTasks = DataModel.cheData(item);
                    });
                    Gesture.create(GesturePriority.Low);
                    LongPressGesture.create({ repeat: true });
                    LongPressGesture.onAction((event) => {
                        if (event.repeat) {
                            this.count++;
                        }
                    });
                    LongPressGesture.onActionEnd(() => {
                        this.count = 0;
                        this.isEdit = !this.isEdit;
                    });
                    LongPressGesture.pop();
                    Gesture.pop();
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new ToDoItem(this, { content: item }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    If.create();
                    if (this.isEdit) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Row.create();
                                Row.debugLine("pages/ToDoListPage.ets(165:13)");
                                Row.align(Alignment.End);
                                Row.flexGrow(1);
                                Row.justifyContent(FlexAlign.End);
                                if (!isInitialRender) {
                                    Row.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Toggle.create({ type: ToggleType.Checkbox });
                                Toggle.debugLine("pages/ToDoListPage.ets(166:15)");
                                Toggle.onChange((isOn) => {
                                    if (isOn) {
                                        this.deleteList.push(item);
                                    }
                                    else {
                                        let index = this.deleteList.indexOf(item);
                                        this.deleteList.splice(index, 1);
                                    }
                                });
                                if (!isInitialRender) {
                                    Toggle.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            Toggle.pop();
                            Row.pop();
                        });
                    }
                    else {
                        If.branchId(1);
                    }
                    if (!isInitialRender) {
                        If.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                If.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.totalTasks, forEachItemGenFunction);
            if (!isInitialRender) {
                // Text($r('app.string.page_title'))
                //   .fontSize($r('app.float.title_font_size'))
                //   .fontWeight(FontWeight.Bold)
                //   .lineHeight($r('app.float.title_font_height'))
                //   .width(CommonConstants.TITLE_WIDTH)
                //   .margin({
                //     top: $r('app.float.title_margin_top'),
                //     bottom: $r('app.float.title_margin_bottom')
                //   })
                //   .textAlign(TextAlign.Start)
                //   .onClick(()=>{
                //     router.pushUrl({url:'pages/ToDoListPage'})
                //   })
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // Text($r('app.string.page_title'))
        //   .fontSize($r('app.float.title_font_size'))
        //   .fontWeight(FontWeight.Bold)
        //   .lineHeight($r('app.float.title_font_height'))
        //   .width(CommonConstants.TITLE_WIDTH)
        //   .margin({
        //     top: $r('app.float.title_margin_top'),
        //     bottom: $r('app.float.title_margin_bottom')
        //   })
        //   .textAlign(TextAlign.Start)
        //   .onClick(()=>{
        //     router.pushUrl({url:'pages/ToDoListPage'})
        //   })
        ForEach.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (!this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.debugLine("pages/ToDoListPage.ets(201:9)");
                        Button.width({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.position({ x: CommonConstant.EDIT_POSITION_X, y: CommonConstant.EDIT_POSITION_Y });
                        Button.onClick(() => {
                            this.dialogController.open();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['add.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Image.debugLine("pages/ToDoListPage.ets(202:11)");
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.debugLine("pages/ToDoListPage.ets(212:9)");
                        Button.width({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.markAnchor({ x: { "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, y: CommonConstant.MINIMUM_SIZE });
                        Button.position({ x: CommonConstant.DELETE_POSITION_X, y: CommonConstant.DELETE_POSITION_Y });
                        Button.onClick(() => {
                            this.deleteListItem();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['delete.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Image.debugLine("pages/ToDoListPage.ets(213:11)");
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function showToast(arg0) {
    throw new Error('Function not implemented.');
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new ToDoListPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ToDoListPage.js.map