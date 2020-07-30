<template>
    <div class="app-main-layout">
        <Navbar/>
        <router-view/>
    </div>
</template>

<script>

import Navbar from '@/components/Navbar'
export default {

  components:{
    Navbar
  }
  
}
</script>