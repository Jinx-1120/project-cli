<!----------------------------------
****--页面加载loading(Loading)
****--@date     2017/6/19
****--@author   zyc<332533011@qq.com
---------------------------------->
<template>
  <div class="loading">
    <p><i class="el-icon-loading"></i> 加载中...</p>
  </div>
</template>
<style>
  .ivu-loading-bar .ivu-loading-bar-inner{
    background:#addff2;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1999;
    text-align: center;
    padding-top: 10px;
    background: rgba(220, 220, 220, 0);
    color: #addff2;
    font-size: 14px;
  }

  .loading i{
    font-size: 18px;
    font-weight: bold;
    color: #addff2;
  }
</style>
