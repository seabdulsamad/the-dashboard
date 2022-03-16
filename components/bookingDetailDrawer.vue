<template>
  <v-navigation-drawer v-model="drawer" right temporary app :width="500">
    <v-app-bar dark color="primary" dense>
      Booking Ref#{{ bookingId }}
    </v-app-bar>
    <v-flex v-if="loading">
      <v-progress-circular indeterminate />
    </v-flex>
    <v-flex v-if="detail" sm12>
      <v-list>
        <template v-for="(item, index) in detail">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-list-item-subtitle class="overline">
                {{ _.startCase(index) }}
              </v-list-item-subtitle>
              <v-list-item-title class="pt-2">
                <template v-if="_.includes(['startDate', 'endDate'], index)">
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
    <v-flex v-else-if="!loading && !detail">
      Booking details not available.
    </v-flex>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'BookingDetail',
  props: {
    bookingId: { type: String, default: null },
    stationId: { type: Number, default: null },
  },
  data: () => ({
    drawer: false,
    detail: null,
    loading: false,
  }),
  watch: {
    bookingId: {
      immediate: true,
      handler() {
        if (this.bookingId) {
          this.fetchBookingDetails()
          this.drawer = true
        }
      },
    },
    drawer() {
      if (!this.drawer) {
        this.$emit('onClose')
        this.detail = null
      }
    },
  },
  methods: {
    fetchBookingDetails() {
      this.loading = true
      this.$axios
        .get(`/stations/${this.stationId}/bookings/${this.bookingId}`)
        .then((response) => {
          this.loading = false
          this.detail = response.data
        })
    },
  },
}
</script>
