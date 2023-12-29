
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
import Constants from '../common/constants/Constants';
import { fileSelect } from '../common/utils/FileUtil';
import Logger from '../common/utils/Logger';
import AccountData from '../viewmodel/AccountData';


@Entry
@Component
struct NewsEditPage {
  @State newAccount:AccountData={ id: 0, title: '',txt:'',url:''};
  currentDate:string = new Date().toUTCString();
  @State isInsert:boolean=router.getParams()?.['isInsert'];
  title: string = '';
  content: string = '';
  @State imageUri: string = '';

  selectImage() {
    fileSelect().then((uri: string) => {
      this.imageUri = uri;
    });
  }

  aboutToAppear(){
    this.newAccount= router.getParams()?.['newAccount'];
    this.title=this.newAccount.title;
    this.content=this.newAccount.txt;
    this.imageUri=this.newAccount.url;
  }


  build() {
    Stack() {
      Column() {
        Row(){
         Text('编辑笔记')
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
              this.newAccount.title=this.title;
              this.newAccount.txt=this.content;
              this.newAccount.url=this.imageUri;
              router.back({
                url:'pages/MainPage',
                params:{
                  newAccount: this.newAccount,
                  isInsert: this.isInsert,
                }
              });
            })
        }
        .width(CommonConstants.FULL_WIDTH)
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

        //Text(this.currentDate)

        Column() {
          Column() {
            TextInput({ placeholder: this.title===''?$r('app.string.title_default_text'):this.title , text:this.title===''?'':this.title })
              .fontSize($r('app.float.title_font'))
              .placeholderFont({ size: $r('app.float.title_font') })
              .margin({ top: $r('app.float.common_padding') })
              .fontColor($r('app.color.title_color'))
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.title = value;
              })
              .width(Constants.FULL_PERCENT)
              .height($r('app.float.input_height'))
            Divider()
              .opacity($r('app.float.divider_opacity'))
              .color($r('app.color.title_color'))
              .width(Constants.DIVIDER_WIDTH)
            TextArea({ placeholder: this.content===''?$r('app.string.content_default_text'):this.content ,text:this.content===''?'':this.content })
              .placeholderFont({ size: $r('app.float.title_font') })
              .fontColor($r('app.color.title_color'))
              .height('60%')
              .fontSize($r('app.float.title_font'))
              .margin({ top: $r('app.float.normal_padding') })
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.content = value;
              })
            Scroll() {
              Row() {
                Image(this.imageUri ? this.imageUri : $r('app.media.ic_add_pic'))
                  .width($r('app.float.img_size'))
                  .height($r('app.float.img_size'))
                  .objectFit(ImageFit.Cover)
                  .onClick(() => this.selectImage())
              }
              .padding($r('app.float.common_padding'))
            }
            .width(Constants.FULL_PERCENT)
            .scrollable(ScrollDirection.Horizontal)
            .align(Alignment.Start)
          }
          .borderRadius($r('app.float.edit_view_radius'))
          .backgroundColor(Color.White)
          .width(Constants.FULL_PERCENT)


        }
        .padding({
          left: $r('app.float.common_padding'),
          right: $r('app.float.common_padding'),
          bottom: $r('app.float.common_padding')
        })
        .height(Constants.FULL_PERCENT)
        .justifyContent(FlexAlign.SpaceBetween)
      }
      .height(Constants.FULL_PERCENT)
      //.title(Constants.RELEASE_TITLE)
      //.titleMode(NavigationTitleMode.Mini)
      .backgroundColor($r('app.color.listColor'))
    }
  }
}

