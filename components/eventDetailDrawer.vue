<template>
  <v-navigation-drawer v-model="drawer" right temporary app :width="500">
    <template v-if="booking">
      <v-app-bar dark color="primary" :height="50">
        Booking Ref#{{ booking.id }}
      </v-app-bar>
      <v-flex sm12>
        <v-list>
          <template v-for="(item, index) in booking">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-subtitle class="overline">
                  {{ _.startCase(index) }}
                </v-list-item-subtitle>
                <v-list-item-title class="pt-2">
                  <template
                    v-if="
                      _.includes(
                        ['start', 'end', 'startDate', 'endDate'],
                        index
                      )
                    "
                  >
                    {{ item | moment('LLLL') }}
                  </template>
                  <template v-else>
                    {{ item }}
                  </template>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="`divider${index}`"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'EventDetail',
  props: {
    booking: { type: Object, default: null },
  },
  watch: {
    booking: {
      immediate: true,
      handler() {
        if (this.booking) this.drawer = true
      },
    },
    drawer() {
      if (!this.drawer) this.$emit('onClose')
    },
  },
  data: () => ({
    drawer: false,
  }),
}
</script>
