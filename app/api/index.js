import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

export function fetchEarPodsStatus() {
    return Vue.http
        .get("http://www.apple.com/hk/shop/delivery-message", {
            params: {
                'parts.0': 'MMEF2ZA/A',
                '_'      : new Date().getTime()
            },
        })
        .then(response => response.json())
        .then(data => data.body.content.deliveryMessage)
}
