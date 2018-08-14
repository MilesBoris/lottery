const STORE_LOTTO_STATS = 'STORE_LOTTO_STATS';
const UPDATE_MIN = 'UPDATE_MIN';
const UPDATE_MAX = 'UPDATE_MAX';
const UPDATE_REPEAT = 'UPDATE_REPEAT';
const UPDATE_NUMBER = 'UPDATE_NUMBER';
const INIT_STATE = 'INIT_STATE';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export default {

  [INIT_STATE](state) {
    let lottos = [];

    for(let i = state.min; i <= state.max; i++) {
      lottos.push(i);
    }


    state.stats = {
      s9: [],
      a3: [],
      d3: []
    };
    state.number = 0;
    state.includeNumber = [];
    state.product = 's9';
    state.lottos = lottos,
      state.awards = {
        s9: {
          name: 'Antminer S9i',
          count: 0,
          hashrate: '14TH/s',
          alg: 'SHA256',
          pow: '1320W+10%'
        },
        a3: {
          name: 'Antminer A3',
          count: 0,
          hashrate: '815GH/s',
          alg: 'Blake(2b)',
          pow: '1275W + 7%'

        },
        d3: {
          name: 'Antminer D3',
          count: 0,
          hashrate: '17GH/s',
          alg: 'X11',
          pow: '970W + 7%'
        }
      }
    localStorage.setItem('state', JSON.stringify(state))
  },

//存储中奖信息
  [STORE_LOTTO_STATS](state, payload) {
    let [number, version] = payload;
    state.stats[version].push(number);
    state.includeNumber.push(number);
    if(!state.repeat){
      state.lottos.removeByValue(number);
    }
    state.awards[version].count++;
    localStorage.setItem('state', JSON.stringify(state))
  }
  ,

  [UPDATE_MIN](state, payload) {
    state.min = payload;
    localStorage.setItem('state', JSON.stringify(state))
  }
  ,

  [UPDATE_MAX](state, payload) {
    state.max = payload;
    localStorage.setItem('state', JSON.stringify(state))
  }
  ,

  [UPDATE_REPEAT](state, payload) {
    state.repeat = payload;
    localStorage.setItem('state', JSON.stringify(state))
  }
  ,

  [UPDATE_NUMBER](state, payload) {
    state.number = payload;
    localStorage.setItem('state', JSON.stringify(state))
  },

  [UPDATE_PRODUCT](state, payload) {
    state.product = payload;
    localStorage.setItem('state', JSON.stringify(state))
  }
}


Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
