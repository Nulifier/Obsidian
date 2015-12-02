import {forEach, mapValues}		from "lodash";
import {sendSuccess}			from "./jsend";

// Respond with all the content types and their editable fields
export default function describeApi(req, res) {
	const lists = this.lists;

	const listDescriptions = mapValues(lists, (list) => {
		return {
			fields: mapValues(list.schemaFields, (field) => {
				return {
					type: field.getFieldName(),
					options: field.options
				};
			}),
			uiElements: list.uiElements
		};
	});

	sendSuccess(res, listDescriptions);
}