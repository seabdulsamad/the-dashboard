<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app dense>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer> &copy; {{ new Date().getFullYear() }} </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    title: 'The Dashboard',
  }),
}
</script>
