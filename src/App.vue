<template>
  <div id="app">
    <el-container>
      <!-- 顶部区域 -->
      <search></search>

      <!-- 中间主体区域 -->
      <div class="main">
        <!-- 歌曲列表区域 -->
        <el-aside width="200px">
          <list> </list>
        </el-aside>

       
        <el-main> 
           <!-- 歌曲封面信息区域 -->
          <cover></cover>
          <!-- mv显示区域 -->
           <videos></videos> </el-main>

        <!-- 精选回复区域 -->
        <el-aside width="200px">
          <comments></comments>
        </el-aside>
      </div>
      <!-- 音频播放区域 -->
      <el-footer>
        <player></player>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import list from "./components/list.vue";
import player from "./components/player.vue";
import search from "./components/search.vue";
import cover from "./components/cover.vue";
import comments from "./components/comments.vue";
import videos from "./components/videos.vue";
export default {
  name: "App",
  components: {
    list,
    search,
    player,
    cover,
    comments,
    videos,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" >
* {
  padding: 0;
  margin: 0;
}
.el-container {
  .el-footer {
    background-color: rgb(141, 179, 201);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .main {
    background-image: url("./assets/bg.jpg");
    background-repeat: no-repeat;
    display: flex;
    height: 536px;
    .el-main {
      color: white;
      text-align: center;
      line-height: 160px;

      flex: 2;
    }
    .el-aside {
      flex: 1;
    }
  }
}
</style>
