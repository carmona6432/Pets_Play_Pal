<template>
    <form v-on:submit.prevent="submitForm" class="cardForm">
        <!-- {{ newEvent }} -->
        <div>
            <div id="button" class="button is-info" v-on:click="upload">Upload your event picture!</div><br>
            <img v-bind:src="newEvent.eventImage" alt="pet image" width="300" height="200" v-if="Event.eventImage">
        </div>

        <div class="field">
            <label class="label">Event title</label>
            <div class="control">
                <input class="input" type="text" v-model="newEvent.eventTitle">
            </div>
        </div>

        <div class="field">
            <label class="label">Location</label>
            <div class="control">
                <input class="input is-success" type="text" v-model="newEvent.eventLocation">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Address</label>
            <div class="control">
                <input class="input is-success" type="text" v-model="newEvent.eventAddress">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Maximum pets</label>
            <div class="control">
                <input class="input is-success" type="number" v-model="newEvent.maximumPets">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </div>
        </div>

        <!-- event host should auto populate.  -->

        <div class="field">
            <label class="label">Event Date</label>
            <div class="control">
                <input class="input is-danger" type="date" v-model="newEvent.eventDate">
                <span class="icon is-small is-left">
                 <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                 <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Event Time</label>
            <div class="control">
                <input class="input is-danger" type="time" v-model="newEvent.eventTime">
                <span class="icon is-small is-left">
                 <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Duration (in minutes)</label>
            <div class="control">
                <input class="input is-danger" type="number" placeholder="Type event duration in minutes" v-model="newEvent.eventDuration">
                <span class="icon is-small is-left">
                 <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="Type event description" v-model="newEvent.eventDescription"></textarea>
            </div>
        </div>>
        <div class="field is-grouped">
        <div class="control">
            <button class="button is-link">Submit</button>
        </div>
        <div class="control">
            <button class="button is-link is-light" v-on:click="cancelForm">Cancel</button>
        </div>
        </div>
        

    </form>
</template>

<script>
import eventService from '../services/eventService';

export default {
    name: 'CloudinaryComp',
    props: {
        Event: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            newEvent:{
                id: this.Event.id,
                eventTitle: this.Event.eventTitle,
                eventLocation: this.Event.eventLocation,
                eventAddress: this.Event.eventAddress,
                maximumPets: this.Event.maximumPets,
                eventDate: this.Event.eventDate,
                eventTime: this.Event.eventTime,
                eventDuration: this.Event.eventDuration,
                eventDescription: this.Event.eventDescription,
                eventImage: this.Event.eventImage
            },
            myWidget: {}
            
        };
    },
    methods:{
        //submit form
      submitForm(){
            // console.log('THE ID IS... ' + this.newEvent.id);
            if(this.newEvent.id === 0 || this.newEvent.id === undefined){
                eventService.addEvent(this.newEvent).then(
                    (response) => {
                        if(response.status === 201){
                            //redirect to events page
                        this.$router.push( {name: 'user'});
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }else{
                eventService.updateEvent(this.newEvent.id, this.newEvent).then(
                    (response) => {
                        if(response.status === 200){
                            //redirect to pets page
                        this.$router.push( {name: 'user'});
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        },
//cancel form
        cancelForm(){
            this.$router.push( {name: 'user'});
        },
        upload() {
            this.myWidget.open();
        },

    },
    created(){
        this.newEvent = this.Event;
    },
    mounted() {
    this.myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzksumgzr',
        uploadPreset: 'pdswxfwn'
      },
      (error, result) => { 
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          console.log("Image URL: " + result.info.url);
          this.newEvent.eventImage = result.info.url;
        }
      }

    );
  }
};
</script>

<style scoped>
.cardForm{
    margin: 0 auto;
    width: 50%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
    box-shadow: #ccc 2px 2px 2;
    background-color: white;
}
#button{
  display: flex;
  justify-content: center; 
  align-items: center;
}

</style>