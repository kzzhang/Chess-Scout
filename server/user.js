//template for user class

'use strict';

module.exports = class user {
	constructor(argMap) {
		if ('email' in argMap) {
			this.email = argMap['email'];
		} else {
			this.email = null;
		}
		if ('username' in argMap) {
			this.username = argMap['username'];
		} else {
			this.username = null;
		}
		if ('openings' in argMap) {
			this.openings = argMap['openings'];
		} else {
			this.openings = null;
		}
	}

	assert() {
		return (this.email != null && this.email != undefined 
			&& this.username != null && this.username != undefined);
	}
};