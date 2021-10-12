<template>
  <div>
    <el-header>
      <div class="wenzi">音乐播放器</div>
      <!-- 在输入框输入内容查询 -->
      <el-autocomplete
        v-model="keywords"
        clearble
        :fetch-suggestions="querySearch"
        placeholder="搜索您感兴趣的歌曲或歌手"
        :trigger-on-focus="false"
      ></el-autocomplete>

      <!-- 搜索按钮 -->
      <el-button
        type="primary"
        icon="el-icon-search"
        circle
        @click="send"
      ></el-button>
    </el-header>
  </div>
</template>
<script>
import hub from "./eventBus";
export default {
  data() {
    return {
      // 输入框输入的关键字
      keywords: "",
      // 通过关键字查询到的歌曲列表
      musicList: [],
      // 实现输入框防抖功能的定时器
      timer: null,
      // 缓存搜索过的列表数据
      cacheobj: {},
    };
  },
  methods: {
    // 向list组件传递数据
    async send() {
      //   通过关键字查询得到歌曲列表的数据
      const { data: res } = await this.$http.get(
        `https://autumnfish.cn/search?keywords=${this.keywords}`
      );

      //  将数据传递到list组件中去
      hub.$emit("sendList", res.result.songs);
    },
    // 监听输入框的输入事件
    async querySearch(queryString, cb) {
      //  输入关键字，获取歌曲列表
      const { data: res } = await this.$http.get(
        `https://autumnfish.cn/search?keywords=${this.keywords}`
      );
      var list = res.result.songs;
      var results = list.filter(this.createFilter(queryString));

      // 调用 callback 返回建议列表的数据
      // 维护两个数组，一个用于缓存搜索过的列表数据，一个用来返回未输入过的列表数据
      var arr = [],
        cache = [];
      // 列表数据中的每项需是包含 value：属性值 的对象
      for (let i = 0; i < results.length; i++) {
        arr.push({ value: results[i].name });
        cache.push({ value: results[i].name });
      }
      // 如果缓存列表中有数据，优先返回缓存列表
      if (this.cacheobj[queryString]) {
        cb(this.cacheobj[queryString]);
        return;
      }
      // 清除定时器
      clearTimeout(this.timer);
      // 设置定时器
      this.timer = setTimeout(() => {
        cb(arr);
      }, 500);
      // 将列表数据保存到缓存对象中，键为关键字，值为数组
      this.cacheobj[queryString] = cache;
    },
    // 将关键字和获取到的歌曲列表进行匹配
    createFilter(queryString) {
      return (state) => {
        return state.name.toLowerCase().indexOf(queryString.toLowerCase()) == 0;
      };
    },
  },
};
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
  .el-autocomplete {
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