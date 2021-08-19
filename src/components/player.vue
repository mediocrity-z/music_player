<template>
    <div class="player">
        <!-- audio的原生方法，play，pause -->
        <audio @play="play" @pause="pause"  :src="songUrl" controls autoplay loop></audio>
    </div>
</template>
<script>
// 将事件处理中心引入
import hub from './eventBus'
export default {
    mounted(){
        // 接收list组件传递过来的数据
        hub.$on('sendUrl',(url)=>{
         this.songUrl=url
        })
    },
        data(){
            return{
                // 歌曲音频地址
            songUrl:'',
            // 控制封面动画的播放与暂停
            isPlaying:false
            }
        },
        methods:{
            play(){
                // 音频播放将播放封面动画
                this.isPlaying=true;
                // 向cover组件传递数据
                hub.$emit('sendState',this.isPlaying)
            },
            pause(){
                this.isPlaying=false;
                hub.$emit('sendState',this.isPlaying)
            }
        }
    }

</script>
<style lang="less" scoped>
     .player{
        height: 60px;
        audio{
            width: 100%;
            margin: 3px -20px 1px -20px
        }
    }

</style>