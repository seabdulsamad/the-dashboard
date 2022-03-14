import Vue from 'vue'
import vueMoment from 'vue-moment'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(vueMoment)
Vue.use(VueLodash, { lodash: lodash })
