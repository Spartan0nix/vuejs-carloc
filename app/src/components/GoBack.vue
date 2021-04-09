<template>
  <span class="goBack">
    <b-button variant="warning" size="lg" @click="goBack">Retour</b-button>
  </span>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style></style>
