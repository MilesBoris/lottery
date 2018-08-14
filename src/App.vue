<template>
  <div id="app">
    <div class="logo-bitmain"></div>
    <div class="lang">
      <div class="lang-panel">
        <el-select class="lang-select" v-model="$i18n.locale">
          <el-option value="zh-CN" label="中文">中文</el-option>
          <el-option value="en-US" label="English">English</el-option>
        </el-select>
      </div>

    </div>
    <router-view></router-view>
    <div class="logo-btccom"></div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    mounted() {
      document.title = this.$t('lang.title');
    }
  }
</script>

<style>
  body {
    margin: 0;
    background: url("./assets/bg@2x.png") 50% 50% no-repeat;
    background-color: #352a4f;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    height: 1000px;
    background: url("./assets/bg@2x.png") 50% 0% no-repeat;
    background-size: cover;
    position: relative;
  }

  .logo-bitmain {
    width: 100%;
    height: 150px;
    background: url("./assets/logo_bitmain@2x.png") 50% 50% no-repeat;
    background-size: 300px auto;
  }

  .logo-btccom {
    position: absolute;
    bottom: 20px;
    width: 100%;
    height: 50px;
    background: url("./assets/BTC.com_white@2x.png") 50% 90% no-repeat;
    background-size: 150px auto;
  }

  .main-page {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .btn-link {
    margin-top: 10px;
    display: inline-block;
    background-color: inherit;
    height: 38px;
    text-align: center;
    width: 150px;
    line-height: 37px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 1);
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }

  .lang {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    top: 30px;
  }

  .lang-panel {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
  }

  .lang-select {
    outline: none;
    width: 110px;
  }

  .el-input__inner {
    border: 1px solid rgba(255, 255, 255, 1) !important;
    outline: none;
    background-color: inherit !important;
    color: #fff !important;
    font-weight: 600;
    /*border: 0 !important;*/
    font-size: 16px;
  }

  .el-icon-arrow-up {
    color: #fff !important;
  }
</style>
