<template>
  <div class="list">
      
     <el-col :span="6">
           
         <div class="grid-content bg-purple" 
     v-for="item in musicList" :key="item.id">
       <el-button type="primary" icon="el-icon-video-play" size="small" circle @click="getUrl(item.id);getImg(item.id);getComments(item.id)"></el-button>
     <div class="name">{{item.name}}/{{item.artists[0].name}}</div>
     <div v-if="item.mvid!==0" class="mv el-icon-monitor" @click="getMvUrl(item.mvid)"></div>
     </div>
     
     </el-col>
         
  </div>
</template>
<script>
import hub from './eventBus'
export default {
    created(){
    
    },
    
    data(){
        return{
    //   查询得到的歌曲列表
       musicList:[],
    //    歌手名称
       singer:'',
    //    音频的地址
       songUrl:'',
      //  歌曲封面图片地址
       imgUrl:'',
      //  热门评论列表
       hotComments:[],
      //  mv的地址
      mvUrl:''
        }
    },
    methods:{
      // 根据歌曲的id获取音频地址
   async getUrl(id){
     const {data:res}=await this.$http.get('https://autumnfish.cn/song/url?id='+id)
     this.songUrl=res.data[0].url
     if(this.songUrl!==null){
        //    将歌曲列表组件中的url通过自定义事件名传入到player组件中
    hub.$emit('sendUrl',this.songUrl)
     }
     else{
       this.$message({
         message:'抱歉，这首歌曲暂无版权',
         center:true
       })
     }
    },
    // 根据歌曲的id获取歌曲封面图片的地址
    async getImg(id){
      const {data:res}=await this.$http.get('https://autumnfish.cn/song/detail?ids='+id);
      this.imgUrl=res.songs[0].al.picUrl;
      // 将封面图片地址传给cover组件
      hub.$emit('sendImg',this.imgUrl)
    },
    // 根据热门评论的id获取热门评论的数据
    async getComments(id){
      const {data:res}=await this.$http.get('https://autumnfish.cn/comment/hot?type=0&id='+id)
      this.hotComments=res.hotComments
      
      // 将热门评论列表数据传递给comments组件
      hub.$emit('sendHotComments',this.hotComments)
    },
    // 根据歌曲的mvid获取mv视频的地址
    async getMvUrl(id){
      if(id!==0){
        const {data:res}=await this.$http.get('https://autumnfish.cn/mv/url?id='+id)
        this.mvUrl=res.data.url;
        // 将mv的地址数据传递给videos组件
        hub.$emit('sendMvUrl',this.mvUrl)
      }
      return 
    }
    },
    mounted(){
        // 接收搜索组件传递过来的数据
      hub.$on('sendList',(list)=>{
          this.musicList=list
      })
    

    }
};
</script>
<style lang="less" scoped>
.list {
  .el-col{
      margin-left: 20px;
      margin-top: 20px;
    border-radius: 4px;
     .grid-content {
       box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 10px;
    height: 54px;
    width:250px;
    text-align: center;
    margin: 10px 0 10px 0;
    position: relative;
    .el-button{
     position: absolute;
     left:0;
     top: 10px;
     opacity: 0.8;
    }
    .name{
        position: absolute;
       left: 40px;
       top: 16px;
   font-size: 14px;
   width: 170px;
   color: rgb(218, 202, 202);
//    让文字超过的部分隐藏
   overflow: hidden;
//    强制文字在一排上显示
   white-space: nowrap;
//    超出的文本内容变成省略号
text-overflow:ellipsis;
    }
    .mv{
      position: absolute;
      right: 10px;
      top: 18px;
      cursor: pointer;
    }
  }
  .bg-purple {
    background: rgba(62, 59, 231, 0.1);
  }

  }
  .el-backtop{
    width: 200px;
    height: 200px;
  }
}
</style>