<template>
  <div class="page lotto">

    <div class="bg-color">
      <el-row class="main-page">
        <el-col :span="12" :class="'product-img '+product"></el-col>

        <el-col :span="12" class="product-info">
          <div style="font-size: 36px; margin: 20px 0  30px 0">
            {{ awards[product].name }} - {{ awards[product].hashrate}}
          </div>
          <div>{{ $t('lang.hashrate') }}: {{ awards[product].alg }}</div>
        </el-col>
      </el-row>
    </div>

    <el-row style="margin-top: 50px">
      <div class="link-btccom">https://pool.btc.com</div>
      <div class="note-btccom">{{ $t('lang.btccom') }}</div>
    </el-row>

    <el-row class="lotto-panel">
      <div class="lotto-content">
        <div class="lotto-number iCountUp">
          <IOdometer
            class="iOdometer"
            :value="userNumber"
            :format="format"
            :duration="duration"
            :formatFunction="formatFunction"
            :animation="animation"
          />
        </div>
      </div>
      <div class="start" @click="startLotto" :style="clickBtn=='wait' ? 'background-color:#dcdbce;opacity:0.9':''">
        {{ $t('lang.'+clickBtn) }}
      </div>
    </el-row>


    <el-row class="select-awards">
      <el-select v-model="product" class="awards">
        <el-option
          v-for="(value, key) in awards"
          :key="key"
          :label="value.name"
          :value="key">
        </el-option>
      </el-select>
      <div class="count btn-link">
        {{ awards[product].count }} {{ $t('lang.piece') }}
      </div>
    </el-row>

    <el-row class="setting">
      <router-link to="/set" class="link-router btn-link" style="margin-bottom: 10px">{{ $t('lang.setting') }}
      </router-link>
      <router-link to="/stats" class="link-router btn-link">{{ $t('lang.stats') }}</router-link>
    </el-row>

    <el-dialog
      class="dialog"
      :title="$t('lang.congratulation')"
      :visible.sync="dialogVisible"
      :show-close=false
      :close-on-click-modal=false
      :close-on-press-escape=false
      center
    >
      <div class="no-number">No. {{ formatNumber }}</div>
      <div class="prize">{{ $t('lang.gain') }} {{ $t('lang.platform') }} {{ awards[product].name }}</div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false" class="click-cancel"> {{ $t('lang.invalid') }}</el-button>
         <el-button type="primary" @click="addStore" class="click-confirm">{{ $t('lang.valid') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import ElRow from "element-ui/packages/row/src/row";
  import IOdometer from 'vue-odometer';
  import 'odometer/themes/odometer-theme-default.css';

  let timerInter;

  export default {
    components: {ElRow, IOdometer},
    name: "lotto",
    data() {
      return {
        userNumber: 0,
        format: '',
        duration: 1100,
        animation: '',
        dialogVisible: false,
        formatNumber: 0,
        disableClick: true,
        clickBtn: 'start'
      }
    },
    computed: {
      ...mapState({
        number: state => state.number,
        awards: state => state.awards,
        max: state => state.max,
        min: state => state.min,
        stats: state => state.stats,
        repeat: state => state.repeat,
        lottos:state => state.lottos,
        includeNumber: state => state.includeNumber,
        product: state => state.product,
      }),
      product: {
        get() {
          return this.$store.state.product
        },
        set(value) {
          this.$store.commit('UPDATE_PRODUCT', value);
        }
      }
    },
    methods: {
      formatFunction(v) {
        return foramtNum(v);
      },

      startLotto() {

        if(this.clickBtn == 'start' || this.clickBtn == 'continue') {

          if(!this.disableClick) {return false;}

          if(this.lottos.length == 0) {
            this.$message.error(this.$t('lang.limit'));
            return false;
          }

          this.clickBtn = 'wait';
          this.userNumber = randomNum.call(this);

          setTimeout(() => {this.clickBtn = 'stop';}, 1300)
          timerInter = setInterval(() => {
            this.userNumber = randomNum.call(this);
          }, 900)

        }
        else if(this.clickBtn == 'stop') {

          if(!this.disableClick) {return false;}

          clearInterval(timerInter);

          this.clickBtn = 'wait';
          this.disableClick = false;

          let random=Math.floor(Math.random()*this.lottos.length);
          this.userNumber = this.lottos[random];

          this.formatNumber = foramtNum(this.userNumber);
          this.$store.commit('UPDATE_NUMBER', this.userNumber);

          setTimeout(() => {
            this.clickBtn = 'continue';
          }, 2100)

          setTimeout(() => {
            this.disableClick = true;
            this.dialogVisible = true;
          }, 2300)

        }

        function randomNum() {
          let random = Math.floor(Math.random() * parseInt(parseInt(this.max) + 1 - this.min)) + parseInt(this.min);
          return random;
        }

      },

      addStore() {
        this.dialogVisible = false;
        this.$store.commit('STORE_LOTTO_STATS', [this.number, this.product]);
      },

    },
    created() {
      this.userNumber = this.number;
    }
  }


  function foramtNum(v) {
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
</script>

<style scoped>
  .select-awards {
    position: absolute;
    width: 340px;
    right: 20px;
    top: 20px;
    background-color: inherit;
    color: #fff;
  }

  .count {
    display: inline-block;
    border-radius: 0 5px 5px 0;
    border-left: 0;
    line-height: 36px;
    width: 80px;
  }

  .awards {
    margin-right: -5px;
  }

  .awards >>> .el-input__inner {
    border: 1px solid rgba(255, 255, 255, 1) !important;
    border-radius: 4px 0 0 4px !important;
    outline: none;
    background-color: inherit;
    color: #fff;
    font-weight: 400;
    font-size: inherit;
  }

  .awards >>> .el-icon-arrow-up {
    color: #fff;
  }

  .bg-color {
    width: 100%;
    background: rgba(0, 0, 0, 0.253);
    height: 180px;
    margin-top: 10px;
  }

  .product-img {
    height: 260px;
    margin: -30px;
  }

  .product-info {
    height: 180px;
    text-align: left;
    font-size: 28px;
    line-height: 45px;
    font-family: Arial-Black;
    color: rgba(255, 255, 255, 1);
  }

  .s9 {
    background: url("../assets/img_antminer_s9i@2x.png") 40% 0% no-repeat;
    background-size: auto 260px;
  }

  .a3 {
    background: url("../assets/img_antminer_a3@2x.png") 40% 0% no-repeat;
    background-size: auto 260px;
  }

  .d3 {
    background: url("../assets/img_antminer_d3@2x.png") 40% 0% no-repeat;
    background-size: auto 260px;
  }

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

  .lotto-panel {
    width: 580px;
    height: 310px;
    background: rgba(175, 0, 0, 1);
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .lotto-content {
    width: 500px;
    height: 200px;
    display: flex;
    margin: 0 auto;
    margin-top: 20px;
    justify-content: center;
    align-content: center;
    background: rgba(115, 0, 0, 1);
    border-radius: 20px;
  }

  .lotto-number {
    width: 405px;
    margin: 10px;
    height: 180px;
    border-radius: 15px;
    font-size: 155px;
    padding-left: 72px;
    letter-spacing: 76px;
    line-height: 180px;
    font-family: 'Lucida Console', Monaco, monospace;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    background: url('../assets/bg_number_white@2x.png') no-repeat 0% 50%;
    background-size: 640px auto;
    white-space: nowrap;
    overflow: hidden;
  }

  .start {
    width: 280px;
    height: 60px;
    line-height: 65px;
    background: rgba(243, 226, 88, 1);
    border-radius: 15px;
    font-family: JCHEadA;
    color: rgba(175, 0, 0, 1);
    margin: 0 auto;
    margin-top: 16px;
    font-size: 35px;
    cursor: pointer;
  }

  .start:hover {
    background: rgba(234, 222, 121, 1);
  }

  .start:active {
    width: 277px;
    height: 56px;
    line-height: 63px;
    border: solid 2px rgba(220, 120, 39, 1);
    background: rgba(224, 216, 46, 1);
  }

  .dialog >>> .el-dialog {
    margin-top: 10vh !important;
    padding-top: 240px;
    width: 510px;
    height: 510px;
    background: url('../assets/bg_zhongjiang@2x.png') no-repeat 50% 50%;
    background-size: 500px auto;
    background-color: inherit;
    box-shadow: inherit;
    font-family: PingFangSC-Semibold;
  }

  .dialog >>> .el-dialog__title {
    font-size: 40px;
    color: rgba(235, 230, 195, 1);
    line-height: 59px;
  }

  .no-number {
    width: 100%;
    text-align: center;
    font-size: 80px;
    color: rgba(235, 230, 195, 1);
    line-height: 100px;
    margin-top: -35px;
  }

  .prize {
    width: 100%;
    font-size: 36px;
    text-align: center;
    color: rgba(235, 230, 195, 1);
    line-height: 56px;
  }

  .dialog >>> .el-dialog__footer {
    padding: 0;
    margin-top: 10px;
  }

  .click-cancel {
    width: 230px;
    height: 50px;
    border-radius: 12px;
    color: rgba(136, 136, 136, 1);
    font-size: 26px;
    cursor: pointer;
    border: 0;
  }

  .click-confirm {
    width: 240px;
    height: 50px;
    background: rgba(243, 226, 88, 1);
    border-radius: 12px;
    color: rgba(150, 74, 0, 1);
    font-size: 26px;
    cursor: pointer;
    border: 0;
  }

  .setting {
    position: absolute;
    bottom: 90px;
    left: 40px;
    width: 180px;
  }

</style>


