import Vue from 'vue'
import Vuex from 'vuex'
import { fetchEarPodsStatus } from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        earPodsDeliveryMessage: {}
    },

    actions: {
        FETCH_EARPODS_STATUS: ({ commit, state }) => {
            return fetchEarPodsStatus()
                        .then(deliveryMessage => commit('SET_EARPODS_DELIVERY_MESSAGE', { deliveryMessage }))
        }
    },

    mutations: {
        SET_EARPODS_DELIVERY_MESSAGE: (state, { deliveryMessage }) => {
            state.earPodsDeliveryMessage = deliveryMessage
        }
    },

    getters: {
        earPodsDeliveryOptionMessages(state) {
            if ('MMEF2ZA/A' in state.earPodsDeliveryMessage) {
                return state.earPodsDeliveryMessage['MMEF2ZA/A'].deliveryOptionMessages
            }else{
                return []
            }
        }
    }
})

export default store
