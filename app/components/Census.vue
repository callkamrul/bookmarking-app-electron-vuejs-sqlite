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
				<div>
					<table class="ui celled green table single line ">
						<thead>
						<tr>
							<th>Serial No.</th>
							<th>Economic Unit / Company</th>
							<th>Unit Type</th>
							<th>Year of Inception</th>
							<th>Is Registered</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
							<tr v-for="(Census, id) in censuses">
								<td>{{Census.serial_no_unit}}</td>
								<td>{{Census.name_of_unit}}</td>
								<td></td>
								<td></td>
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
		
		<div id="census-modal" class="ui small modal">
			<i class="close icon"></i>
			<div class="header">
				{{census.id > 0 ? 'Edit census' : 'Add a new census' }}
			</div>

			<div class="content">

				<form class="ui form" @submit.prevent="saveCensus">

					<div class="field">
						<label>Serial No.</label>
						<input v-model="census.serial_no_unit" type="text" data-rules="required">
					</div>

					<div class="field">
						<label>Name of Unit</label>
						<input v-model="census.name_of_unit" type="text" data-rules="required">
					</div>

					<div class="field">
						<label>Name of Mahallah</label>
						<input v-model="census.name_of_mahallah" type="text" data-rules="required">
					</div>		

					<div class="field">
						<label>Division</label>
						<select v-model="census.division_id" data-rules="required" class="ui simple dropdown">
							<option value="">Select a division</option>
							<option v-for="division in divisions" :value="division.id">{{division.name}}</option>
						</select>
					</div>

					<div class="field">
						<label>District</label>
						<select v-model="census.district_id" data-rules="required" class="ui simple dropdown">
							<option value="">Select a district</option>
							<option v-for="district in districtsByDivision" :value="district.id">{{district.name}}</option>
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
import store from "../store";
import eventHub from "../shared/EventHub";

export default {
  data() {
    return {
			selectedCensus: "",
			census:{
        id : 0,
        division_id : 0, 
        district_id : 0, 
        serial_no_unit : 0, 
        name_of_unit : '', 
        name_of_mahallah : '' ,
      },
      divisions:[
        {id:1, name:'Dhaka'},
        {id:2, name:'Rajshahi'},
        {id:3, name:'Chittagong'},
      ],
      districts:[
        {id:1, division_id: 1, name: 'Faridfur'},
        {id:2, division_id: 1, name:'Gazipur'},
        {id:3, division_id: 2, name: 'Naogaon'},
        {id:4, division_id: 2, name:'Chapai Nawabganj'},
        {id:5, division_id: 3, name: 'Comilla'},
        {id:6, division_id: 3, name:'Cox\'s Bazar'},
        {id:7, division_id: 3, name:'Bandarban'},

      ]
    };
  },

	props: ["censuses"],
	
	filters: {
		//filterDistrictsByDivision: function (division_id) {
		//	var division_id = division_id || this.census.division_id;
		//	return this.districts.filter(district => district.division_id == division_id);
		//}
	},

	computed: {
		districtsByDivision: function () {
			var division_id = this.census.division_id;
			return this.districts.filter(district => district.division_id == division_id);
		}
	},

  methods: {
    addCensus() {
      this.census = {
        id : 0,
        division_id : 0, 
        district_id : 0, 
        serial_no_unit : 0, 
        name_of_unit : '', 
        name_of_mahallah : '' ,
      }
      
      $("#census-modal").modal("show");
    },

    editCensus(CensusId) {
      store.getCensus(CensusId, (err, Census) => {
        if (err) {
        } else {
          this.census = Census;
          $("#census-modal").modal("show");
        }
      });
    },

		saveCensus() {
      if (this.census.id > 0){
        store.editCensus(this.census.id, this.census);
      }  else {
        store.addCensus(this.census);
      }

      $("#census-modal").modal("hide");
    },
   
    deleteCensus(CensusId) {
      if (confirm("Are you sure to delete this Census?")) {
        store.deleteCensus(CensusId);
      }
    }
  }
};
</script>

<style>
</style>
