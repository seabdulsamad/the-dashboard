<template>
  <v-layout row wrap>
    <v-flex sm12>
      <v-card outlined>
        <v-card-title>Station</v-card-title>
        <v-card-text>
          <select-stations
            v-model="model"
            label="Station"
            placeholder="Please choose"
            persistent-placeholder
            clearable
            solo
            hint="Type at least 3 characters to search"
          />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'IndexPage',
  data: () => ({
    model: null,
  }),
}
</script>
