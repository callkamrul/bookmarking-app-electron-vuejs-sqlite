<template>
	<div>
		<div class="ui visible" id="censuses">
			<div class="container">
				<h2>
					Economic Census Information
					<span class="clickable right-float">
						<i @click="addCensus" class="add icon"></i>
					</span>
				</h2>
				
				<div class="ui list">
					<div class="item clickable">
						<div class="content">
							<a class="ui grey empty circular label"></a>
							<span @click="CensusSelected('')">All</span>
						</div>
					</div>
					<table class="ui celled table">
						<thead>
						<tr>
							<th>Economic Unit / Company</th>
							<th>Unit Type</th>
							<th>Year of Inception</th>
							<th>Is Registered</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(Census, id) in censuses">
							<td>{{Census.catName}}</td>
							<td>{{Census.catColor}}</td>
							<td><a v-bind:class="'ui ' + Census.catColor + ' empty circular label'"></a></td>
							<td></td>
							<td>
								<button @click="editCensus(id)" class="ui button"><i class="edit fa fa-edit" ></i> Edit</button>
								<button @click="deleteCensus(id)" class="ui button"><i class="remove fa fa-trash" ></i> Delete</button>
							</td>

						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<Census-modal></Census-modal>
	</div>
</template>

<script>
import store from "../store";
import CensusModal from "./CensusModal.vue";
import eventHub from "../shared/EventHub";

export default {
  data() {
    return {
      selectedCensus: ""
    };
  },

  props: ["censuses"],
  components: {
    CensusModal
  },

  methods: {
    addCensus() {
      eventHub.$emit("add-Census");
    },

    editCensus(CensusId) {
      eventHub.$emit("edit-Census", CensusId);
    },

    deleteCensus(CensusId) {
      if (confirm("Are you sure to delete this Census?")) {
        store.deleteCensus(CensusId);
      }
    }
  }
};
</script>
