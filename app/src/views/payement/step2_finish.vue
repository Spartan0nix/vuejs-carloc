<template>
  <div id="container">
      <div>
        {{message}}
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return{}
    },
    props: {
      message: {
        type: String,
        required: true
      }
    },
    mounted() {
        if(!this.status || this.status === '') {
            this.$router.push("/location");
        }
    },
    computed: {
        status() {
            return this.message;
        }
    }
}
</script>

<style scoped>
*{
   margin: 0; 
   padding: 0;
}
#container {
    margin: 15% 0;
}
</style>