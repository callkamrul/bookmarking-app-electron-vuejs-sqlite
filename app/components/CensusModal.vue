<template>
<div>
	<div id="addcat-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Add a new census
		</div>
		<div class="content">

			<form class="ui form addcatform" @submit.prevent="addCensus">
				<div class="field">
					<label>Census name</label>
					<input v-model="catName" type="text" data-rules="required" placeholder="Enter a Census name...">
				</div>
				<div class="field">
					<label>Census Color</label>
					<select v-model="catColor" data-rules="required" class="ui simple dropdown">
						<option value="">Select a color</option>
						<option v-for="color in CensusColors">
							{{color}}
						</option>
					</select>
				</div>
				<div class="">
					<button type="submit" class="ui purple inverted button">Save</button>
				</div>
			</form>
		</div>

	</div>
		<div id="editcat-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Edit a Census
		</div>
		<div class="content">
			<form class="ui form editcatform" @submit.prevent="editCensus(catId)">
				<div class="field">
					<label>Census name</label>
					<input v-model="catName" data-rules="required" type="text" placeholder="Enter a Census name...">
				</div>
				<div class="field">
					<label>Census Color</label>
					<select v-model="catColor" data-rules="required" class="ui simple dropdown">
						<option value="">Select a color</option>
						<option v-for="color in CensusColors">
							{{color}}
						</option>
					</select>
				</div>
				<div class="">
					<button type="submit" class="ui purple inverted button">Save</button>
				</div>
			</form>
		</div>

	</div>
</div>	
</template>

<script>
import Vue from "vue";

import store from "../store";
import eventHub from "../shared/EventHub";

export default {
  data() {
    return {
      catId: 0,
      catName: "",
      catColor: "",
      CensusColors: [
        "red",
        "orange",
        "yellow",
        "olive",
        "green",
        "teal",
        "blue",
        "violet",
        "purple",
        "pink",
        "brown",
        "grey",
        "black"
      ]
    };
  },

  methods: {
    addCensus() {
      var newCensus = {
        catName: this.catName,
        catColor: this.catColor
      };

      store.addCensus(newCensus);
      $("#addcat-modal").modal("hide");
    },
    addCensusForm: function() {
      this.catName = this.catColor = "";

      $("#addcat-modal").modal("show");
    },

    editCensus() {
      var newCensus = {
        catName: this.catName,
        catColor: this.catColor
      };
      store.editCensus(this.catId, newCensus);
      $("#editcat-modal").modal("hide");
    },
    editCensusForm: function(catId) {
      store.getCensus(catId, (err, Census) => {
        if (err) {
        } else {
          this.catId = Census.id;
          this.catName = Census.catName;
          this.catColor = Census.catColor;
          $("#editcat-modal").modal("show");
        }
      });
    }
  },

  mounted: function() {
    eventHub.$on("add-Census", this.addCensusForm);
    eventHub.$on("edit-Census", this.editCensusForm);
  },

  beforeDestroy: function() {
    eventHub.$off("add-Census", this.addCensusForm);
    eventHub.$off("edit-Census", this.editCensusForm);
  }
};
</script>
