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

import AccountTable from '../common/database/tables/AccountTable';
import AccountData from '../viewmodel/AccountData';
import CommonConstants from '../common/constants/CommonConstants';
// import { DialogComponent } from '../view/DialogComponent';
import { ImageList } from '../viewmodel/AccountList';
import Logger from '../common/utils/Logger';
import router from '@ohos.router';
import Constants from '../common/constants/Constants';
import thermal from '@ohos.thermal';

@Entry
@Component
struct MainPage {
  @State accounts: Array<AccountData> = [];
  @State searchText: string = '';
  @State isEdit: boolean = false;
  @State isBiji: boolean = false;
  @State isInsert: boolean = false;
  @State newAccount: AccountData = { id: 0, title: '',txt:'',url:''};
  @State index: number = -1;
  @State count: number = 0
  private AccountTable = new AccountTable(() => {});
  private deleteList: Array<AccountData> = [];
  searchController: SearchController = new SearchController();

  accept(isInsert: boolean, newAccount: AccountData): void {
    if (isInsert) {
      Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
      this.AccountTable.insertData(newAccount, (id: number) => {
        newAccount.id = id;
        this.accounts.push(newAccount);
      });
    } else {
      this.AccountTable.updateData(newAccount, () => {
      });
      let list = this.accounts;
      this.accounts = [];
      list[this.index] = newAccount;
      this.accounts = list;
      this.index = -1;
    }
  }

  onPageShow(){
    this.isInsert=router.getParams()?.['isInsert'];
    this.newAccount=router.getParams()?.['newAccount'];
    if(this.isBiji){
      this.accept(this.isInsert,this.newAccount);
      this.isBiji=false;
    }

  }

  aboutToAppear() {
    this.AccountTable.getRdbStore(() => {
      this.AccountTable.query('', (result: AccountData[]) => {
        this.accounts = result;
      }, true);
    });
  }

  selectListItem(item: AccountData) {
    this.isInsert = false;
    this.isBiji =true;
    this.index = this.accounts.indexOf(item);
    this.newAccount = {
      id: item.id,
      title: item.title,
      txt: item.txt,
      url: item.url
    };
  }

  deleteListItem() {
    for (let i = 0; i < this.deleteList.length; i++) {
      let index = this.accounts.indexOf(this.deleteList[i]);
      this.accounts.splice(index, 1);
      this.AccountTable.deleteData(this.deleteList[i], () => {
      });
    }
    this.deleteList = [];
    this.isEdit = false;
  }

  build() {
    Stack() {
      Column() {
        Row() {
          Row(){
            Text('笔记')
              .fontWeight(FontWeight.Bold)
              .height($r('app.float.component_size_SP'))
              .fontSize($r('app.float.font_size_L'))
              .margin({ left: $r('app.float.font_size_L') })
              // .onClick(()=>{
              //   router.pushUrl({url:'pages/MainPage'})
              // })
            Text('   ')
            Text('待办')
              .fontColor(Color.Gray)
              .fontWeight(FontWeight.Bold)
              .height($r('app.float.component_size_SP'))
              .fontSize($r('app.float.font_size_L'))
                //.margin({ left: $r('app.float.font_size_L') })
              .onClick(()=>{
                this.isInsert= false;
                this.newAccount= { id: 0, title:'',txt:'',url:''};
                router.pushUrl({url:'pages/ToDoListPage'})
              })
          }


          // Image($rawfile('ic_public_edit.svg'))
          //   .width($r('app.float.component_size_S'))
          //   .aspectRatio(CommonConstants.FULL_SIZE)
          //   .margin({ right: $r('app.float.font_size_L') })
          //   .onClick(() => {
          //     this.isEdit = !this.isEdit;
          //   })
        }
        .width(CommonConstants.FULL_WIDTH)
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

        Row() {
          Search({
            value: this.searchText,
            placeholder: CommonConstants.SEARCH_TEXT,
            controller: this.searchController
          })
            .width(CommonConstants.FULL_WIDTH)
            .borderRadius($r('app.float.radius_size_M'))
            .borderWidth($r('app.float.border_size_S'))
            .borderColor($r('app.color.border_color'))
            .placeholderFont({ size: $r('app.float.font_size_M') })
            .textFont({ size: $r('app.float.font_size_M') })
            .backgroundColor(Color.White)
            .onChange((searchValue: string) => {
              this.searchText = searchValue;
            })
            .onSubmit((searchValue: string) => {
              if (searchValue === '') {
                this.AccountTable.query('', (result: AccountData[]) => {
                  this.accounts = result;
                }, true);
              } else {
                this.AccountTable.query(String(searchValue), (result: AccountData[]) => {
                  this.accounts = result;
                }, false);
              }
            })
        }
        .width(CommonConstants.FULL_WIDTH)
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .margin({ top: $r('app.float.edge_size_S'), bottom: $r('app.float.edge_size_S') })

        Row() {
          List({ space: CommonConstants.FULL_SIZE }) {
            ForEach(this.accounts, (item: AccountData) => {
              ListItem() {
                Row() {
                  Image(item.url)
                    .height(Constants.FULL_PERCENT)
                    .aspectRatio(1)
                    .objectFit(ImageFit.Cover)
                    .borderRadius($r('app.float.item_img_border_radius'))
                  Column(){
                    Row(){
                      Text(item.title)
                        .fontSize($r('app.float.title_font'))
                        .fontColor($r('app.color.title_color'))
                        .layoutWeight(1)
                        .maxLines(1)
                        .lineHeight($r('app.float.title_line_height'))
                        .fontFamily($r('app.string.harmony_hei_ti_medium'))
                        .margin({ left: $r('app.float.normal_padding') })
                        .textOverflow({ overflow: TextOverflow.Ellipsis })
                        .fontWeight(Constants.TITLE_FONT_WEIGHT)
                    }
                    .alignItems(VerticalAlign.Center)
                    .width(Constants.FULL_PERCENT)

                    Text(item.txt)
                      .fontSize($r('app.float.desc_font'))
                      .fontFamily($r('app.string.harmony_hei_ti'))
                      .opacity(Constants.DESC_OPACITY)
                      .fontColor($r('app.color.title_color'))
                      .lineHeight($r('app.float.desc_line_height'))
                      .width(Constants.FULL_PERCENT)
                      .maxLines(Constants.CONTENT_MAX_LINE)
                      .fontWeight(Constants.DESC_FONT_WEIGHT)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })

                  }
                  .width('60%')
                  Blank()
                    .layoutWeight(1)

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
                    .flexGrow(CommonConstants.FULL_SIZE)
                    .justifyContent(FlexAlign.End)
                  }




                }
                .width(CommonConstants.FULL_WIDTH)
                .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
              }
              .width(CommonConstants.FULL_WIDTH)
              .height($r('app.float.component_size_LM'))
              .onClick(() => {
                this.selectListItem(item);
                router.pushUrl({
                  url:'pages/NewsEditPage',
                  params:{
                    newAccount: this.newAccount,
                    isInsert: this.isInsert,
                  }
                })
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
          }
          .width(CommonConstants.FULL_WIDTH)
          .borderRadius($r('app.float.radius_size_L'))
          .backgroundColor(Color.White)
        }
        .width(CommonConstants.FULL_WIDTH)
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .margin({ top: $r('app.float.edge_size_SM') })

      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)

      if (!this.isEdit) {
        Button() {
          Image($rawfile('add.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .position({ x: CommonConstants.EDIT_POSITION_X, y: CommonConstants.EDIT_POSITION_Y })
        .onClick(() => {
          this.isInsert = true;
          this.newAccount = { id: 0, title:'',txt:'',url:'' };
          this.isBiji=true;
          // this.dialogController.open();
          router.pushUrl({
            url:'pages/NewsEditPage',
            params:{
              newAccount: this.newAccount,
              isInsert: this.isInsert,
            }
          })
        })
      }

      if (this.isEdit) {
        Button() {
          Image($rawfile('delete.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .backgroundColor($r('app.color.background_color'))
        .markAnchor({ x: $r('app.float.mark_anchor'), y: CommonConstants.MINIMUM_SIZE })
        .position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y })
        .onClick(() => {
          this.deleteListItem();
        })
      }
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .backgroundColor($r('app.color.background_color'))
  }
}