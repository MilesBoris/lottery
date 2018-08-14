<template>
  <div class="page main-page">
    <div class="title">{{ $t('lang.lottoSetting') }}</div>
    <div class="range">
      <span style="display: inline-block;width: 190px; text-align: left">{{ $t('lang.lottoRange') }}</span>
      <div style="margin-right: 40px">
        <el-input v-model="min" type="number" class="input-number"></el-input>
        <span style="padding:0 24px">-</span>
        <el-input v-model="max" type="number" class="input-number"></el-input>
      </div>
      <span style="margin-right: 40px">{{ $t('lang.range') }}： {{ min }} - {{ max }}</span>
      <span>{{ $t('lang.lottoPersons') }}：{{ max - min + 1 }}</span>
    </div>
    <div class="range" style="justify-content: flex-start">
      <span style="display: inline-block;width: 190px; text-align: left">{{ $t('lang.lottoType') }}</span>
      <el-radio-group v-model="repeat" class="radio-repeat">
        <el-radio :label="false">{{ $t('lang.noRepeat') }}</el-radio>
        <el-radio :label="true">{{ $t('lang.repeat') }}</el-radio>
      </el-radio-group>
    </div>

    <div class="range" style="justify-content: flex-start;margin-top: 20px">
      <router-link
        class="btn-link"
        style="width:160px; margin-right: 90px; font-size: 16px"
        to="/lotto"
      >
        {{ $t('lang.continueLotto') }}
      </router-link>
      <button
        class="btn-link"
        style="width:160px; font-size: 16px; height:40px"
        @click="initState"
      >
        {{ $t('lang.newLotto') }}
      </button>
    </div>
    <el-row class="setting">
      <router-link to="/stats" class="link-router btn-link" style="margin-bottom: 10px">{{ $t('lang.stats') }}</router-link>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: "set-page",
    data() {
      return {}
    },

    computed: {
      min: {
        get() {
          return this.$store.state.min
        },
        set(value) {
          if(value==''){
            this.$store.commit('UPDATE_MIN', 0);
          }
          else{
            this.$store.commit('UPDATE_MIN', value);
          }

        }
      },
      max: {
        get() {
          return this.$store.state.max
        },
        set(value) {
          if(value==''){
            this.$store.commit('UPDATE_MAX', 0);
          }
          else{
            this.$store.commit('UPDATE_MAX', value);
          }
        }
      },

      repeat: {
        get() {
          return this.$store.state.repeat
        },
        set(value) {
          this.$store.commit('UPDATE_REPEAT', value)
        }
      }
    },
    methods: {
      initState() {

        if(this.min<=0 || this.max>999){
          this.$message.error(this.$t('lang.error'));
          return false;
        }
        this.$confirm(this.$t('lang.warn_new_lotto_info'), this.$t('lang.warn_start_new_lotto'), {
          confirmButtonText: this.$t('lang.confirm'),
          cancelButtonText: this.$t('lang.cancel'),
          type: 'warning'
        }).then(() => {
          this.$store.commit('INIT_STATE');
          this.$router.push({
            path: '/lotto'
          })
        }).catch(() => {

        });
      }
    }
  }
</script>

<style scoped>
  .page {
    padding-top: 20px;
    color: #fff;
    display: block;
  }

  .title {
    font-size: 26px;
    margin-bottom: 30px;
    text-align: left;
  }

  .range {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-content: center;
    height: 100px;
    line-height: 100px;
    width: 100%;

  }

  .input-number {
    width: 100px;
  }

  .input-number >>> .el-input__inner {
    background-color: inherit;
    color: #fff;
    border:solid 1px #fff!important;
  }

  .radio-repeat {
    width: 70%;
    font-size: 24px;
    color: #fff;
    line-height: 100px;
    text-align: left;
  }

  .range >>> .el-radio__label {
    font-size: 16px;
    color: #fff
  }

  .setting {
    position: absolute;
    bottom: 90px;
    left: 40px;
    width: 180px;
    z-index:999;
  }
</style>
