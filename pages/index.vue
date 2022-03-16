<template>
  <v-layout row wrap>
    <v-flex sm12>
      <v-card outlined>
        <v-card-title>Station</v-card-title>
        <v-card-text>
          <select-stations
            v-model="station"
            label="Station"
            placeholder="Please choose"
            persistent-placeholder
            clearable
            solo
            hint="Type at least 3 characters to search"
            @input="fetchEvents($event)"
          />
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex sm12>
      <v-card outlined>
        <v-card-text>
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          {{ label }}
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-calendar
            ref="calendar"
            v-model="currentDate"
            color="primary"
            :events="bookings"
            type="week"
            @change="onCalendarChange"
            @click:event="($event) => (bookingDetail = $event.event)"
          >
          </v-calendar>
        </v-card-text>
      </v-card>
    </v-flex>
    <event-detail-drawer
      :booking="bookingDetail"
      @onClose="bookingDetail = null"
    />
  </v-layout>
</template>
<script>
import eventDetailDrawer from '@/components/eventDetailDrawer.vue'
export default {
  name: 'IndexPage',
  components: { eventDetailDrawer },
  data: () => ({
    station: null,
    loading: false,
    currentDate: new Date().toISOString().substr(0, 10),
    bookings: [],
    label: null,
    bookingDetail: null,
  }),
  created() {
    this.fetchEvents(1)
  },
  methods: {
    onCalendarChange(event) {
      this.label =
        this.$moment(event.start.date).format('LL') +
        ' - ' +
        this.$moment(event.end.date).format('LL')
    },
    fetchEvents(stationId) {
      if (stationId) {
        this.$axios.get(`/stations/${stationId}`).then((response) => {
          this.bookings = this._.map(response.data.bookings, (item) => {
            return {
              ...item,
              name: `Ref#${item.id} - ${item.customerName}`,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
            }
          })
        })
      } else {
        this.bookings = []
      }
    },
  },
}
</script>
