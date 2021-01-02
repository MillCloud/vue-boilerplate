<template>
  <v-main class="d-flex align-center justify-center">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h6 class="text-h6 text-center">404 Not Found</h6>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn @click="handleGoBack">{{ $t('hint.back') }}</v-btn>
          <v-btn class="mx-2" @click="handleToIndex">
            {{ $t('hint.index') }}
          </v-btn>
          <v-btn @click="handleToHome">{{ $t('hint.home') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  methods: {
    handleGoBack() {
      this.$router.go(-1);
    },
    handleToIndex() {
      this.$router.replace({ name: 'Index' });
    },
    handleToHome() {
      this.$router.replace({ name: 'Home' });
    },
  },
};
</script>
