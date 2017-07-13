



export default {
	get(url) {
		const data = localStorage[url];
		let result = [];

		if (data) {
			result = JSON.parse(localStorage[url])
		}				
		return Promise.resolve(result);
	},

	post(url, obj) {		
		localStorage.setItem(url, JSON.stringify(obj));				
		return Promise.resolve();
	}
}

