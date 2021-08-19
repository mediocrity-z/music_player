<template>
  <div v-show="isShow" class="videos">
        
    <video ref="videoRefs" autoplay controls :src="mvUrl"></video>

      <el-button @click="closeVideo()" type="info" icon="el-icon-close" circle></el-button>
  </div>
</template>
<script>
import hub from "./eventBus";
export default {
  data() {
    return {
        // 控制mv的显示与隐藏
      isShow: false,
    //   mv的地址
      mvUrl: "",
    };
  },
  methods:{
    
      closeVideo(){
        // 点击关闭按钮将mv部分隐藏
          this.isShow=false;
        // 暂停mv的播放
          this.$refs.videoRefs.pause();
        
      }
  },
  mounted() {
    //   接收list组件传递过来的mv地址数据
    hub.$on("sendMvUrl", (url) => {
      this.mvUrl = url;
      this.isShow = true;
    });
  },
};
</script>
<style lang="less" scoped>
.videos {
  position: relative;
  position: fixed;
  z-index: 100000;
  right: 380px;
  width: 640px;
  height: 480px;
  margin-left: 50px;
  .el-button{
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-65%,-10%);
  }
  video{
      position: absolute;
     top: -50px;
      left: -10px; 
  width: 640px;
  height: 480px;
  }
}
</style>