import {
	setSearchFocus,
	showClearTextButton,
	clearSearchText,
	clearPushListener,
} from "./searchBar.js";
import {
	deleteSearchResults,
	buildSearchResults,
	clearStatsLine,
	setStatsLine,
} from "./searchResults.js";
import { getSearchTerm, getSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		initApp();
	}
});

// starts the app
const initApp = () => {
	setSearchFocus();
	const search = document.getElementById("search");
	search.addEventListener("input", showClearTextButton);
	const clear = document.getElementById("clear");
	clear.addEventListener("click", clearSearchText);
	clear.addEventListener("keydown", clearPushListener);
	const form = document.getElementById("searchBar");
	form.addEventListener("submit", submitSearch);
};

//prevents form from refreshing the page
const submitSearch = (event) => {
	event.preventDefault();
	deleteSearchResults();
	processSearch();
	setSearchFocus();
};

//async function for the wiki api
const processSearch = async () => {
	clearStatsLine();
	const searchTerm = getSearchTerm();
	if (searchTerm === "") return;
	const resultArray = await getSearchResults(searchTerm);
	if (resultArray.length) buildSearchResults(resultArray);
	setStatsLine(resultArray.length);
};
