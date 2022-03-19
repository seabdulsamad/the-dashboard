<template>
  <v-layout row wrap>
    <v-img
      src="https://roadsurfer.com/wp-content/uploads/roadsurfing-1.jpg"
      :height="450"
      aspect-ratio="1.33"
    >
      <v-container class="full-height">
        <v-layout row wrap class="full-height" align-center>
          <v-flex sm4>
            <v-card outlined class="pa-4">
              <v-card-title>
                <h1 class="pb-3 font-weight-bold">Station Bookings</h1>
              </v-card-title>
              <v-card-text>
                <select-stations
                  v-model="stationId"
                  outlined
                  label="Station"
                  placeholder="Please choose"
                  persistent-placeholder
                  clearable
                  hint="Type at least 3 characters to search"
                  persistent-hint
                  @input="fetchEvents($event)"
                />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-container class="mt-n10">
      <v-layout row wrap>
        <v-flex sm12>
          <v-card outlined :set="(bookingCount = _.size(bookings))">
            <v-card-text>
              <v-layout row wrap align-center>
                <v-flex shrink>
                  <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  {{ label }}
                  <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex v-if="bookingCount">
                  We have found {{ bookingCount }}
                  {{ bookingCount > 1 ? 'bookings' : 'booking' }} on the
                  specified station
                </v-flex>
                <v-spacer />
                <v-flex shrink>
                  <v-btn-toggle v-model="viewType" mandatory>
                    <v-btn value="week">Week</v-btn>
                    <v-btn value="day">Day</v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-layout>
              <v-calendar
                ref="calendar"
                v-model="currentDate"
                color="primary"
                :events="bookings"
                :type="viewType"
                event-overlap-mode="column"
                @change="onCalendarChange"
                @click:event="($event) => (bookingDetailId = $event.event.id)"
                @click:date="($event) => (viewType = 'day')"
              >
              </v-calendar>
            </v-card-text>
          </v-card>
        </v-flex>
        <booking-detail-drawer
          :booking-id="bookingDetailId"
          :station-id="stationId"
          @onClose="bookingDetailId = null"
        />
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
import bookingDetailDrawer from '~/components/bookingDetailDrawer.vue'
export default {
  name: 'IndexPage',
  components: { bookingDetailDrawer },
  data: () => ({
    stationId: 1,
    loading: false,
    viewType: 'week',
    currentDate: new Date().toISOString().substr(0, 10),
    bookings: [],
    label: null,
    bookingDetailId: null,
  }),
  created() {
    this.fetchEvents(this.stationId)
  },
  methods: {
    onCalendarChange(event) {
      this.label =
        event.start.date === event.end.date
          ? this.$moment(event.start.date).format('LL')
          : this.$moment(event.start.date).format('LL') +
            ' - ' +
            this.$moment(event.end.date).format('LL')
    },
    fetchEvents(stationId) {
      if (stationId) {
        this.$axios.get(`/stations/${stationId}`).then((response) => {
          this.bookings = this._.map(response.data.bookings, (item) => {
            return {
              ...item,
              name: `Ref#${item.id} - ${item.customerName} - ${this.$moment(
                item.startDate
              ).format('hh:mm A')}`,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
              timed: true,
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
