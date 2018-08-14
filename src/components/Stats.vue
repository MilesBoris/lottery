<template>
  <div class="page">
    <el-row style="margin-top: 10px">
      <div class="link-btccom">https://pool.btc.com</div>
      <div class="note-btccom">{{ $t('lang.btccom') }}</div>
    </el-row>

    <el-row class="bg-color">
      <div class="main-page">
        <div class="awards-name">{{ $t('lang.wins') }}</div>
        <div class="awards-panel">
          <div v-for="(v,k) in stats" class="awards-row">
            <span class="awards-info" style="">{{ awards[k].name }} ( {{ awards[k].count }} ) :</span>
            <div class="prize-num">
              <span v-for="item in v" class="awards-ids">
                {{ item | foramtNum}}
              </span>
            </div>
          </div>
        </div>
        <div class="persons">
          {{ $t('lang.lottoPersons') }}： {{ max - min + 1 }} {{ $t('lang.people') }}
        </div>
      </div>
    </el-row>

    <el-row class="setting">
      <router-link to="/set" class="link-router btn-link" style="margin-bottom: 10px">{{ $t('lang.setting') }}</router-link>
      <router-link to="/lotto" class="link-router btn-link">{{ $t('lang.goOnLotto') }}</router-link>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "stats",
    data() {
      return {}
    },
    filters: {
      foramtNum(v){
        if(v < 10) {
          v = '00' + v.toString();
        }
        else if(v < 100) {
          v = '0' + v.toString();
        }
        else {
          v = v.toString();
        }
        return v;
      }
    },
    computed: {
      ...mapState({
        awards: state => state.awards,
        max: state => state.max,
        min: state => state.min,
        stats: state => state.stats,
      })
    },
  }


</script>

<style scoped>
  .link-btccom {
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: rgba(243, 226, 88, 1);
    line-height: 33px;
    text-align: center;
    width: 100%;
  }

  .note-btccom {
    margin-top: 3px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: #ffffff;
    line-height: 33px;
  }

  .setting {
    position: absolute;
    bottom: 90px;
    left: 40px;
    width: 180px;
  }

  .bg-color {
    width: 100%;
    height: 450px;
    background: rgba(0, 0, 0, 0.253);
    margin-top: 30px;
  }

  .main-page {
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    color: rgba(235, 230, 195, 1);
    flex-direction: column;
  }

  .awards-name {
    font-size: 30px;
    padding: 25px;
  }

  .persons {
    font-size: 16px;
  }

  .awards-panel {
    width: 850px;
    border: solid 0px red;
    margin: 0 auto;
    text-align: left;
    margin-bottom: 20px;
    /*white-space: nowrap;*/
  }

  .awards-row {
    padding: 5px;
    font-size: 24px;
    margin:11px 0;
    display: flex;
    align-content: flex-start;
  }

  .awards-info {
    width: 255px;
    display: inline-block;
    text-align: left;
    margin-right: 10px;
    white-space: nowrap;
  }

  .awards-ids{
    width:60px;
    display: inline-block;
    margin:0 20px;
    text-align: left;
    font-family: 'Lucida Console', Monaco, monospace;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .prize-num{
    display: inline-block;
    width:680px;
  }

</style>
