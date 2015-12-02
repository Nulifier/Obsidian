import React, {PropTypes} from "react";
import BaseField from "./base-field";
import Select from "react-select";

export default class LocationField extends BaseField {
	constructor(props) {
		super(props);
		this.autocomplete = new google.maps.places.AutocompleteService();
	}

	handleInputChange(newValue) {
		// Convert the value to null if it's an empty string
		super.handleInputChange(newValue === "" ? null : newValue);
	}

	loadOptions(input, callback) {
		if (input === "") {
			return callback(null, {options: []});
		}

		navigator.geolocation.getCurrentPosition((position) => {
			const location = new google.maps.LatLng(
				position.coords.latitude,
				position.coords.longitude);

			const req = {
				input,
				location,
				radius: 50000, // m
				types: ["establishment", "geocode"]
			};

			this.autocomplete.getPlacePredictions(req, (predictions, status) => {
				// Check for success
				if (status !== "OK") {
					callback(new Error(`Places API request failed with status: ${status}`));
				}

				// Convert the results to the format react-select likes
				const options = predictions.map((prediction) => {
					return {value: prediction.place_id, label: prediction.description};
				});

				callback(null, {
					options
				});
			});
		}, (err) => {
			callback(err);
		});
	}

	render() {
		return (
			<div className="obs-field">
				<Select
					value={this.props.fieldValue || ""}
					onChange={this.handleInputChange.bind(this)}
					asyncOptions={this.loadOptions.bind(this)}
					placeholder={`Select ${this.props.fieldDesc.type}...`}
					autoload={false} />
			</div>
		);
	}
}