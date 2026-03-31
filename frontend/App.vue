<template>

  <router-view/>

</template>

<script>

import CardPage from "./views/CardPage.vue"
import OrderManagementPage from "./views/OrderManagementPage.vue"

export default{

  components:{
    CardPage,
    OrderManagementPage
  }

}

</script>