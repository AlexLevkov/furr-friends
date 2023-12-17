<template>
  <section>
    <div class="map-111222333">
      <GmapMap
        ref="mapRef"
        :center="{ lat: 31, lng: 35 }"
        :zoom="8"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
      <nav class="map-btns">
        <button @click="panTo(31.5, 35.5)">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          reprehenderit eveniet dignissimos blanditiis id quos repudiandae ea
          quisquam officia? Modi autem at quia eos voluptatem, culpa libero
          quidem odio eum.
        </button>
        <button @click="panTo(32, 35)">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, eum.
          Quidem, suscipit quibusdam illo dolorum quae iste molestias
          repudiandae quis! Deserunt mollitia minima corporis non vero et libero
          ad distinctio.
        </button>
        <button @click="panTo(31, 36)">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, eum.
          Quidem, suscipit quibusdam illo dolorum quae iste molestias
          repudiandae quis! Deserunt mollitia minima corporis non vero et libero
          ad distinctio.
        </button>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        { position: { lat: 31.5, lng: 35.5 } },
        { position: { lat: 32, lng: 35 } },
        { position: { lat: 31, lng: 36 } },
      ],
    };
  },
  methods: {
    panTo(lat, lng) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat, lng });
      });
    },
  },
};
</script>