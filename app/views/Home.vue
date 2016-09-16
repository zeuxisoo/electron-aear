<template>
    <div class="home">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 block-messages">
                    <div class="panel panel-default">
                        <div class="panel-heading">Delivery Option Messages</div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12" v-for="optionMessage in earPodsDeliveryOptionMessages">
                                    {{ optionMessage }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 block-logger">
                    <div class="panel panel-default">
                        <div class="panel-heading" v-on:click="clearLog">Logger</div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="logger">
                                        <p v-for="log in logList">{{ log }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.block-logger .logger {
    border: 1px solid #999999;
    height: 130px;
    max-height: 130px;
    overflow-y: auto;
}
</style>

<script>
import { sound } from '../helper'
import moment from 'moment'

export default {

    beforeMount() {
        this.fetchEarPodsStatus()
        this.checkEarPodsStatus()

        setInterval(() => {
            this.fetchEarPodsStatus()
            this.checkEarPodsStatus()
        }, 5000)

        setInterval(() => {
            let loggerTextarea = jQuery(".block-logger .logger")

            loggerTextarea.animate({
              scrollTop: loggerTextarea[0].scrollHeight - loggerTextarea[0].clientHeight
            }, 1000)
        }, 5100)
    },

    data() {
        return {
            logList: []
        }
    },

    computed: {
        earPodsDeliveryOptionMessages() {
            return this.$store.getters.earPodsDeliveryOptionMessages
        }
    },

    methods: {
        fetchEarPodsStatus() {
            this.addLog('fetchEarPodsStatus', 'Fetching new json file')

            this.$store.dispatch('FETCH_EARPODS_STATUS')
        },

        checkEarPodsStatus() {
            this.addLog('checkEarPodsStatus', 'Chceking delivery option messages')

            let playAvailableSound = false

            this.earPodsDeliveryOptionMessages.forEach(optionMessage => {
                if (optionMessage.toLowerCase() != 'Currently unavailable'.toLowerCase()) {
                    playAvailableSound = true
                }
            })

            if (playAvailableSound === true) {
                this.addLog('checkEarPodsStatus', '!!! Found')

                sound.playAvailableSound()
            }
        },

        clearLog() {
            this.logList = []
        },

        addLog(method, message) {
            let currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')

            this.logList.push(`[${currentDateTime}] [${method}] [${message}]`)
        }
    }

}
</script>
