<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
    computed:{
        error(){
            return this.$store.getters.error
        }
    },
    watch:{
        error(e){
            console.log(e.response.data.detail)
            if (e.response.data.detail){
                this.$error(messages[e.response.data.detail])
            }
            else if (e.response.data.username){
                this.$error(messages[e.response.data.username])}
            else if (e.response.data.email){
                this.$error(messages[e.response.data.email])}
            else if (e.response.data.password){
                this.$error(messages[e.response.data.password])}
            else{
                this.$error('Что то пошло не так')}
            }
        }
    }
</script>