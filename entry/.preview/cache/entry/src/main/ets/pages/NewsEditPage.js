import router from '@ohos:router';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import Constants from '@bundle:com.example.rdb/entry/ets/common/constants/Constants';
import { fileSelect } from '@bundle:com.example.rdb/entry/ets/common/utils/FileUtil';
class NewsEditPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        var _a;
        super(parent, __localStorage, elmtId);
        this.__newAccount = new ObservedPropertyObjectPU({ id: 0, title: '', txt: '', url: '' }, this, "newAccount");
        this.currentDate = new Date().toUTCString();
        this.__isInsert = new ObservedPropertySimplePU((_a = router.getParams()) === null || _a === void 0 ? void 0 : _a['isInsert'], this, "isInsert");
        this.title = '';
        this.content = '';
        this.__imageUri = new ObservedPropertySimplePU('', this, "imageUri");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.newAccount !== undefined) {
            this.newAccount = params.newAccount;
        }
        if (params.currentDate !== undefined) {
            this.currentDate = params.currentDate;
        }
        if (params.isInsert !== undefined) {
            this.isInsert = params.isInsert;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.imageUri !== undefined) {
            this.imageUri = params.imageUri;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__imageUri.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newAccount.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__imageUri.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get newAccount() {
        return this.__newAccount.get();
    }
    set newAccount(newValue) {
        this.__newAccount.set(newValue);
    }
    get isInsert() {
        return this.__isInsert.get();
    }
    set isInsert(newValue) {
        this.__isInsert.set(newValue);
    }
    get imageUri() {
        return this.__imageUri.get();
    }
    set imageUri(newValue) {
        this.__imageUri.set(newValue);
    }
    selectImage() {
        fileSelect().then((uri) => {
            this.imageUri = uri;
        });
    }
    aboutToAppear() {
        var _a;
        this.newAccount = (_a = router.getParams()) === null || _a === void 0 ? void 0 : _a['newAccount'];
        this.title = this.newAccount.title;
        this.content = this.newAccount.txt;
        this.imageUri = this.newAccount.url;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.debugLine("pages/NewsEditPage.ets(35:5)");
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/NewsEditPage.ets(36:7)");
            Column.height(Constants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/NewsEditPage.ets(37:9)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('编辑笔记');
            Text.debugLine("pages/NewsEditPage.ets(38:10)");
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
            Text.debugLine("pages/NewsEditPage.ets(44:11)");
            Text.fontSize({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.textAlign(TextAlign.End);
            Text.height({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.width({ "id": 16777347, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ right: { "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Text.onClick(() => {
                this.newAccount.title = this.title;
                this.newAccount.txt = this.content;
                this.newAccount.url = this.imageUri;
                router.back({
                    url: 'pages/MainPage',
                    params: {
                        newAccount: this.newAccount,
                        isInsert: this.isInsert,
                    }
                });
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
            Text.create(this.currentDate);
            Text.debugLine("pages/NewsEditPage.ets(67:9)");
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/NewsEditPage.ets(69:9)");
            Column.padding({
                left: { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                bottom: { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
            Column.height(Constants.FULL_PERCENT);
            Column.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/NewsEditPage.ets(70:11)");
            Column.borderRadius({ "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.backgroundColor(Color.White);
            Column.width(Constants.FULL_PERCENT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: this.title === '' ? { "id": 16777283, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : this.title, text: this.title === '' ? '' : this.title });
            TextInput.debugLine("pages/NewsEditPage.ets(71:13)");
            TextInput.fontSize({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            TextInput.placeholderFont({ size: { "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            TextInput.margin({ top: { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            TextInput.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            TextInput.backgroundColor(Color.White);
            TextInput.onChange((value) => {
                this.title = value;
            });
            TextInput.width(Constants.FULL_PERCENT);
            TextInput.height({ "id": 16777335, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/NewsEditPage.ets(82:13)");
            Divider.opacity({ "id": 16777331, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Divider.color({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Divider.width(Constants.DIVIDER_WIDTH);
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextArea.create({ placeholder: this.content === '' ? { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : this.content, text: this.content === '' ? '' : this.content });
            TextArea.debugLine("pages/NewsEditPage.ets(86:13)");
            TextArea.placeholderFont({ size: { "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            TextArea.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            TextArea.height('60%');
            TextArea.fontSize({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            TextArea.margin({ top: { "id": 16777344, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            TextArea.backgroundColor(Color.White);
            TextArea.onChange((value) => {
                this.content = value;
            });
            if (!isInitialRender) {
                TextArea.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create();
            Scroll.debugLine("pages/NewsEditPage.ets(96:13)");
            Scroll.width(Constants.FULL_PERCENT);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.align(Alignment.Start);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/NewsEditPage.ets(97:15)");
            Row.padding({ "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(this.imageUri ? this.imageUri : { "id": 16777238, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/NewsEditPage.ets(98:17)");
            Image.width({ "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height({ "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.objectFit(ImageFit.Cover);
            Image.onClick(() => this.selectImage());
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new NewsEditPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=NewsEditPage.js.map