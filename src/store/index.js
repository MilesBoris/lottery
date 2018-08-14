import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getter'

Vue.use(Vuex)

let lottos = [];

for(let i = 1; i <= 100; i++) {
  lottos.push(i);
}

let init_state = {
  max: 100,
  min:1,
  number:0,
  repeat: false,
  stats:{
    s9:[],
    a3:[],
    d3:[]
  },
  lottos:lottos,
  includeNumber:[],
  product: 's9',
  awards: {
    s9: {
      name: 'Antminer S9i',
      count: 0,
      hashrate:'14TH/s',
      alg:'SHA256',
      pow:'1320W+10%'
    },
    a3: {
      name: 'Antminer A3',
      count: 0,
      hashrate:'815GH/s',
      alg:'Blake(2b)',
      pow:'1275W + 7%'

    },
    d3: {
      name: 'Antminer D3',
      count: 0,
      hashrate:'17GH/s',
      alg:'X11',
      pow:'970W + 7%'
    }
  }

}

let state=localStorage.state ? JSON.parse(localStorage.getItem('state')) : init_state;
export default new Vuex.Store({
  state,
  mutations,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
