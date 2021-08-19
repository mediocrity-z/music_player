<template>
    <div class="comments">
        <!-- 固定区域，用于页签的展示 -->
     <div class="title">
       <el-badge value="hot" class="item">
 <el-tabs>
    <el-tab-pane disabled label="精选回复" name="first"></el-tab-pane>
  </el-tabs>
</el-badge>
       
     </div>
     <!-- 主题内容区域 -->
     <div class="content">
        <!-- 用户区域 -->
            <div class="user" v-for="item in hotComments" :key="item.id">
                <!-- 头像 -->
      <el-avatar :src="item.user.avatarUrl"></el-avatar>
    <!-- 昵称 -->
            <div class="nickname">{{item.user.nickname}}</div>
            <!-- 评论 -->
            <div class="words">{{item.content}}</div>
<!-- 发表时间 -->
            <div class="time">{{item.time | dataFormat}}</div>
        </div>
        
     </div>
    </div>
</template>
<script>
import hub from './eventBus'
export default {
    data(){
        return{
            // 热门评论列表
            hotComments:[]
        }
    },
    mounted(){
        // 用于接收list组件传递过来的数据
        hub.$on('sendHotComments',(comments)=>{
        this.hotComments=comments
        })
    }
}
</script>
<style lang="less" scoped>
.comments{
    position: relative;
    margin-right: 15px;
.title{
    position: fixed;
    z-index: 9999;
    top: 80px;
   
}
.content{
  position: absolute;
  top: 100px;
  width: 100%;
  .user{
     
    margin-bottom: 42px;
    border: 1px solid rgb(109, 168, 202);
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 10px;
    background-color: rgb(241, 224, 71);
.nickname{
   margin-top: -33px;
    margin-left: 50px;
    font-size: 13px;
}
.words{
    margin-top: 30px;
    margin-bottom: 40px;
    margin-left: 0;
    font-size: 13px;
}
.time{
    margin: 10px 0 0 135px;
     font-size: 13px;
}
  }
}
}
</style>