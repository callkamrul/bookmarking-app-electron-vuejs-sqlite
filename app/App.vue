<template>
	<!-- The HTML template for our component -->
	<div id="app">
		<CensusList :censuses="censuses">
		</CensusList>
	</div>
</template>

<script>
// the Javascript for our component
// We will export a Vue component options object here
import store from "./store";
import CensusList from "./components/CensusList.vue";
import eventHub from "./shared/EventHub";

export default {
  components: {
    CensusList
  },

  data() {
    return {
      censuses: {},
      selectedCensus: ""
    };
  },
  beforeMount() {
    this.updateListings();
  },
  mounted() {
    store.on("data-updated", this.updateListings);
    eventHub.$on("filter-by-title", this.filterByTitle);
  },
  methods: {
    updateListings() {
      store.getCensuses((err, censuses) => {
        if (err) {
        } else {
          this.censuses = censuses;
        }
      });
    }
  }
};
</script>
