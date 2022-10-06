async function downloadFile(urlFile) {
	let response = await fetch(urlFile);

	if(response.status != 200) {
		throw new Error("Server Error");
	}

	// read response stream as text
	let text_data = await response.text();

	return text_data;
}
text_data=downloadFile('./dataPropMiner/cacheQueries/cose_tlcodesum_all.txt');
