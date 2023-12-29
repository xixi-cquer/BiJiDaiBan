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

import DataModel from '../viewmodel/DataModel';
import CommonConstants from '../common/constants/CommonConstant';
import CommonConstant from '../common/constants/CommonConstants';
import ToDoItem from '../view/ToDoItem';
import router from '@ohos.router';
import Constants from '../common/constants/Constants';
import prompt from '@ohos.prompt';

@CustomDialog
struct CustomDialogExample {
  @Link newStr:string
  controller: CustomDialogController
  confirm?: (newStr:string) => void;
  build() {
    Column() {
      Row(){
        Text('添加待办')
          .fontWeight(FontWeight.Bold)
          .height($r('app.float.component_size_L'))
          .fontSize($r('app.float.font_size_L'))
          .margin({ left: $r('app.float.font_size_L') })

        Text('提交')
          .fontSize($r('app.float.title_font'))
          .textAlign(TextAlign.End)
          .height($r('app.float.release_btn_height'))
          .width($r('app.float.release_btn_width'))
          .margin({ right: $r('app.float.font_size_L') })
          .onClick(()=>{
            if(this.newStr===''){
              prompt.showToast({ message: '不能添加空待办', bottom: CommonConstant.PROMPT_BOTTOM });
            }else{
              this.confirm(this.newStr);
              this.controller?.close();
            }
          })
      }
      .width(CommonConstant.FULL_WIDTH)
      .justifyContent(FlexAlign.SpaceBetween)
      //.margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

      TextInput({ placeholder: this.newStr===''?'填写内容':this.newStr , text:this.newStr===''?'':this.newStr })
        .fontSize($r('app.float.title_font'))
        .placeholderFont({ size: $r('app.float.title_font') })
        .margin({ top: $r('app.float.common_padding') })
        .fontColor($r('app.color.title_color'))
        .backgroundColor(Color.White)
        .onChange((value: string) => {
          this.newStr = value;
        })
        .width(Constants.FULL_PERCENT)
        .height('60vp')

    }
    .backgroundColor($r('app.color.listColor'))
    .height('40%')
  }
}

@Entry
@Component
struct ToDoListPage {
  @State totalTasks: Array<Array<string>> = [];
  @State isEdit:boolean=false;
  @State newStr:string=''
  @State count: number = 0
  private deleteList: Array<Array<string>> = [];
  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({
      newStr: $newStr,
      confirm: (newStr:string) => {this.addItem(newStr),this.newStr=''}
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });

  aboutToAppear() {
    this.totalTasks = DataModel.getData();
  }
  addItem(text:string){
    this.totalTasks=DataModel.setData(text);
  }

  deleteListItem() {
    for (let i = 0; i < this.deleteList.length; i++) {
        let index = this.totalTasks.indexOf(this.deleteList[i]);
        this.totalTasks=DataModel.delData(index);
    }
    this.deleteList = [];
    this.isEdit = false;
  }

  build() {
    Column({ space: CommonConstants.COLUMN_SPACE }) {
      Row() {
        Row(){
          Text('笔记')
            .fontWeight(FontWeight.Bold)
            .height($r('app.float.component_size_SP'))
            .fontSize($r('app.float.font_size_L'))
            .margin({ left: $r('app.float.font_size_L') })
            .fontColor(Color.Gray)
            .onClick(()=>{
              router.back()
            })
          Text('   ')
          Text('待办')
            .fontWeight(FontWeight.Bold)
            .height($r('app.float.component_size_SP'))
            .fontSize($r('app.float.font_size_L'))
          //.margin({ left: $r('app.float.font_size_L') })
          // .onClick(()=>{
          //   router.pushUrl({url:'pages/SecPage'})
          // })

        }

        // Image($rawfile('ic_public_edit.svg'))
        //   .width($r('app.float.component_size_S'))
        //   .aspectRatio(1)
        //   .margin({ right: $r('app.float.font_size_L') })
        //   .onClick(() => {
        //     this.isEdit = !this.isEdit;
        //   })
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })
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


      ForEach(this.totalTasks, (item: Array<string>) => {
        Row(){
          ToDoItem({ content: item });
          if (this.isEdit) {
            Row() {
              Toggle({ type: ToggleType.Checkbox })
                .onChange((isOn) => {
                  if (isOn) {
                    this.deleteList.push(item);
                  } else {
                    let index = this.deleteList.indexOf(item);
                    this.deleteList.splice(index, 1);
                  }
                })
            }
            .align(Alignment.End)
            .flexGrow(1)
            .justifyContent(FlexAlign.End)
        }
       }
        .onClick(() => {
          this.totalTasks=DataModel.cheData(item);
        })
        .gesture(
          LongPressGesture({ repeat: true })
            // 由于repeat设置为true，长按动作存在时会连续触发，触发间隔为duration（默认值500ms）
            .onAction((event: GestureEvent) => {
              if (event.repeat) {
                this.count++
              }
            })
              // 长按动作一结束触发
            .onActionEnd(() => {
              this.count = 0
              this.isEdit=!this.isEdit;
            })
        )
      })

      if (!this.isEdit) {
        Button() {
          Image($rawfile('add.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .position({ x: CommonConstant.EDIT_POSITION_X, y: CommonConstant.EDIT_POSITION_Y })
        .onClick(() => {
          this.dialogController.open();
        })
      }
      if (this.isEdit) {
        Button() {
          Image($rawfile('delete.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .backgroundColor($r('app.color.background_color'))
        .markAnchor({ x: $r('app.float.mark_anchor'), y: CommonConstant.MINIMUM_SIZE })
        .position({ x: CommonConstant.DELETE_POSITION_X, y: CommonConstant.DELETE_POSITION_Y })
        .onClick(() => {
          this.deleteListItem();
        })
      }
    }
    .width(CommonConstants.FULL_LENGTH)
    .height(CommonConstants.FULL_LENGTH)
    .backgroundColor($r('app.color.page_background'))
  }
}function showToast(arg0: { message: string; bottom: string; }) {
throw new Error('Function not implemented.');
}
