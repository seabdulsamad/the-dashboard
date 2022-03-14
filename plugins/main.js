import Vue from 'vue'
import vueMoment from 'vue-moment'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import selectStations from '@/components/selectStations'

Vue.use(vueMoment)
Vue.use(VueLodash, { lodash })

Vue.component(selectStations)
