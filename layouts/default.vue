<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app>
      <div>
        <v-img
          src="https://roadsurfer.com/wp-content/themes/roadsurfer/_/img/logo-text.svg"
          :height="30"
          contain
        />
      </div>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid grid-list-lg class="pa-0">
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
