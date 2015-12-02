import glob		from "glob";
import path		from "path";

// Calls function with the path for each file in a directory
export default function forDirectory(pattern, options, func) {
	// Handle the method signature forDirectory(pattern, func)
	if (typeof options === "function") {
		func = options;
		options = {};
	}

	return new Promise((resolve, reject) => {
		glob(pattern, options, (err, files) => {
			if (err) return reject(err);

			if (typeof func === "function") {
				try {
					files.forEach((file) => {
						file = options.cwd ? path.resolve(options.cwd, file) : path.resolve(file);
						func(file);
					});
				}
				catch (err) {
					//console.log(err);
					return reject(err);
				}
			}

			return resolve(files);
		});
	});
}