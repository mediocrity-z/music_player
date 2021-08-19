<template>
    <div>
        <el-header>
        <div class="wenzi">音乐播放器</div>
           <!-- 在输入框输入内容查询 -->
        <el-input placeholder="搜索您感兴趣的歌曲或歌手" clearble v-model="keywords" @change="send(keywords)">
        </el-input>
        <!-- 搜索按钮 -->
        <el-button type="primary" icon="el-icon-search" circle @click="send(keywords)"></el-button>
        </el-header>
    </div>
</template>
<script>
import hub from './eventBus'
export default {
    data(){
        return{
            // 输入框输入的关键字
            keywords:'',
            // 通过关键字查询到的歌曲列表
            musicList:[]
            
        }
    },
    methods:{
        // 向list组件传递数据
      async send(keywords){ 
        //   通过关键字查询得到歌曲列表的数据
           const{data:res}=await this.$http.get(`https://autumnfish.cn/search?keywords=${keywords}`)
          // 将获取到的歌曲放在列表中
           this.musicList=res.result.songs
           
          //  将数据传递到list组件中去
           hub.$emit('sendList',this.musicList)
        }


    }
    
}
</script>
<style lang="less" scoped>
.el-header {
  
    background-color: #6ee7d7;
    color: white;
    line-height: 60px;
    position: relative;
    .wenzi {
      font-size: 16px;
      position: absolute;
      left: 30px;
    }
    .el-input {
      position: absolute;
      right: 70px;
      width: 320px;
    }
    .el-button {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }
</style>