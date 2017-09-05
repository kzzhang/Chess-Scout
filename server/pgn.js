'use strict';

module.exports = class Pgn {
	constructor(argMap) {
		if ('Event' in argMap) {
			this.Event = argMap['Event'];
		} else {
			this.Event = undefined;
		}
		if ('Site' in argMap) {
			this.Site = argMap['Site'];
		} else {
			this.Site = undefined;
		}
		if ('Date' in argMap) {
			this.Date = argMap['Date'];
		} else {
			this.Date = undefined;
		}
		if ('Round' in argMap) {
			this.Round = argMap['Round'];
		} else {
			this.Round = undefined;
		}
		if ('White' in argMap) {
			this.White = argMap['White'];
		} else {
			this.White = undefined;
		}
		if ('Black' in argMap) {
			this.Black = argMap['Black'];
		} else {
			this.Black = undefined;
		}
		if ('Result' in argMap) {
			this.Result = argMap['Result'];
		} else {
			this.Result = undefined;
		}
		if ('WhiteTitle' in argMap) {
			this.WhiteTitle = argMap['WhiteTitle'];
		} else {
			this.WhiteTitle = undefined;
		}
		if ('BlackTitle' in argMap) {
			this.BlackTitle = argMap['BlackTitle'];
		} else {
			this.BlackTitle = undefined;
		}
		if ('WhiteElo' in argMap) {
			this.WhiteElo = argMap['WhiteElo'];
		} else {
			this.WhiteElo = undefined;
		}
		if ('BlackElo' in argMap) {
			this.BlackElo = argMap['BlackElo'];
		} else {
			this.BlackElo = undefined;
		}
		if ('ECO' in argMap) {
			this.ECO = argMap['ECO'];
		} else {
			this.ECO = undefined;
		}
		if ('Opening' in argMap) {
			this.Opening = argMap['Opening'];
		} else {
			this.Opening = undefined;
		}
		if ('Variation' in argMap) {
			this.Variation = argMap['Variation'];
		} else {
			this.Variation = undefined;
		}
		if ('WhiteFideId' in argMap) {
			this.WhiteFideId = argMap['WhiteFideId'];
		} else {
			this.WhiteFideId = undefined;
		}
		if ('BlackFideId' in argMap) {
			this.BlackFideId = argMap['BlackFideId'];
		} else {
			this.BlackFideId = undefined;
		}
		if ('EventDate' in argMap) {
			this.EventDate = argMap['EventDate'];
		} else {
			this.EventDate = undefined;
		}
		if ('Moves' in argMap) {
			this.Moves = argMap['Moves'];
		} else {
			this.Moves = undefined;
		}
	}
};