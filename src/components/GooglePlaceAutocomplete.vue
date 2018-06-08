<template>
  <div class="field">
      <label v-if="label" :for="id">{{label}}</label>
      <input
          ref="autocomplete"
          type="text"
          :class="classname"
          :id="id"
          v-model="autocompleteText"
          @focus="onFocus()"
          @blur="onBlur"
          @change="onChange"
          @keypress="onKeyPress"
          placeholder="Local ou pessoa..."
      />
  </div>
</template>

<script>
import VueScript2 from "vue-script2";
export default {
  name: "VueGoogleAutocomplete",

  props: {
    value: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },

    classname: String,

    label: {
      type: String
    },

    types: {
      type: String,
      default: "establishment"
    },

    country: {
      type: [String, Array],
      default: null
    },

    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      /**
       * The Autocomplete object.
       *
       * @type {Autocomplete}
       * @link https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
       */
      autocomplete: null
    };
  },

  computed: {
    autocompleteText: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  mounted: function() {
    VueScript2.load(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwH-VO2mJrTH1ztauPOzeXDVEJEREvaP4&libraries=places"
    )
      .then(() => {
        console.log("google scrpit.loaded");
        const options = {};
        if (this.types) {
          options.types = [this.types];
        }
        if (this.country) {
          options.componentRestrictions = {
            country: this.country
          };
        }
        this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById(this.id),
          options
        );

        if (this.enableGeolocation) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              let geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              let circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
              });
              this.autocomplete.setBounds(circle.getBounds());
            });
          }
        }
        this.autocomplete.addListener("place_changed", () => {
          let place = this.autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            this.$emit("no-results-found", place);
            return;
          }
          let addressComponents = {
            street_number: "short_name",
            route: "long_name",
            locality: "long_name",
            administrative_area_level_1: "short_name",
            country: "long_name",
            postal_code: "short_name"
          };
          let returnData = {};
          if (place.address_components !== undefined) {
            // Get each component of the address from the place details
            for (let i = 0; i < place.address_components.length; i++) {
              let addressType = place.address_components[i].types[0];

              if (addressComponents[addressType]) {
                let val =
                  place.address_components[i][addressComponents[addressType]];
                returnData[addressType] = val;
              }
            }

            returnData["latitude"] = place.geometry.location.lat();
            returnData["longitude"] = place.geometry.location.lng();

            // return returnData object and PlaceResult object
            this.autocompleteText = place.name;
            this.$emit("placechanged", returnData, place, this.id);
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    /**
     * When the input gets focus
     */
    onFocus() {
      //this.geolocate();
      this.$emit("focus");
    },

    /**
     * When the input loses focus
     */
    onBlur(ev) {
      this.$emit("blur", ev.target.value);
    },

    /**
     * When the input got changed
     */
    onChange() {
      this.$emit("change", this.autocompleteText);
    },

    /**
     * When a key gets pressed
     * @param  {Event} event A keypress event
     */
    onKeyPress(event) {
      this.$emit("keypress", event);
    },

    /**
     * Clear the input
     */
    clear() {
      this.autocompleteText = "";
    },

    /**
     * Focus the input
     */
    focus() {
      this.$refs.autocomplete.focus();
    },

    /**
     * Blur the input
     */
    blur() {
      this.$refs.autocomplete.blur();
    }
  }
};
</script>