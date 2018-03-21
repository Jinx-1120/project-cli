<!--
****--@file     userHeadImg
****--@date     2018/1/26 10:34
****--@author   YC
****--@describe 用户头像组件
-->
<template>
    <div class="userHeadImgBox" :style="{width:wh+'px',height:wh+'px'}">
        <img :src="src || _src" @error="showDefImg()" class="userHeadImg">
    </div>
</template>
<style lang="scss">
    .userHeadImgBox {
        border-radius: 50%;
        overflow: hidden;
    }

    .userHeadImg {
        width: 100%;
    }
</style>
<script>
    /*当前组件必要引入*/

    //当前组件引入全局的util
    let Util = null;
    export default {
        props: {
            wh: { // 宽高
                type: Number,
                default: 100
            },
            src: { // 头像地址（绝对地址）
                type: String,
                default: ''
            },
            _src: {// 如果头像地址不存在，则显示该地址（绝对地址）
                type: String,
                default: '/static/img/man.png'
            }
        },
        data() {
            return {}
        },
        methods: {
            //初始化请求列表数据
            init() {

            },
            showDefImg() {
                return this._src
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {}
    }

</script>