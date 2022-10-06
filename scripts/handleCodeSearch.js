urlOnlineDomain='https://pdhung3012.github.io/prop.github.io/'
async function downloadFile(urlFile) {
	let response = await fetch(urlFile);

	if(response.status != 200) {
		throw new Error("Server Error");
	}

	// read response stream as text
	let text_data = await response.text();
    // console.log(text_data);
	return text_data;
}
let promiseAllText=''
let promiseAllP1=''
let promiseAllRealId=''
let arrTexts=[]
let arrP1s=[]
let arrRealIds=[]
async function loadString(){
    [promiseAllText,promiseAllP1,promiseAllRealId]=[await downloadFile(urlOnlineDomain+'dataPropMiner/cacheQueries/cose_tlcodesum_all.txt'),await downloadFile(urlOnlineDomain+'dataPropMiner/cacheQueries/cose_tlcodesum_p1.all.txt'),await downloadFile(urlOnlineDomain+'dataPropMiner/cacheQueries/cose_tlcodesum_realId.all.txt')];
    // promiseAllP1=;
    // promiseAllRealId=;
    [arrTexts,arrP1s,arrRealIds]=[await promiseAllText.split('\n'),await promiseAllP1.split('\n'),await promiseAllRealId.split('\n')]
    // let arrP1s=await promiseAllP1.split('\n')
    // let arrRealIds=await promiseAllP1.split('\n')
    console.log(arrRealIds.length);
    lstTextWon=[]
    lstTextLost=[]
    // var selectWon = document.getElementById('selectWon');
    // var selectLost = document.getElementById('selectLost');
    // for (let step = 0; step < await arrRealIds.length; step++) {
      // Runs 5 times, with values of step 0 through 4.
      // console.log(arrRealIds[step])
      // if (arrRealIds[step]>0){
      //     strDisplay=await '<option value=' + arrRealIds[step] + '>' +arrRealIds[step] + '</option>'
      //     // console.log(strDisplay)
      //     selectWon.innerHTML=await selectWon.innerHTML+strDisplay;
      //
      // } else if (arrRealIds[step]<0) {
      //     strDisplay='<option value=' + arrRealIds[step] + '>'  + '</option>'
      //     selectLost.innerHTML=selectLost.innerHTML+strDisplay;
      // }
    // }
}
function loadBody2(){
    // console.log(datacose['realIds'][0]);
    arrTexts=datacose['realIds']
    arrP1s=datacose['textP1']
    arrRealIds=datacose['realIds']
    arrDistances=datacose['distance']
    var selectWon = document.getElementById('selectWon');
    var selectLost = document.getElementById('selectLost');
    for (let step = 0; step < arrRealIds.length; step++) {
      // Runs 5 times, with values of step 0 through 4.
      // console.log(arrRealIds[step])
      if (arrDistances[step]>0){
          strDisplay='<option value=' + arrRealIds[step] + '>' +arrP1s[step] + '</option>'
          // console.log(strDisplay)
          selectWon.innerHTML= selectWon.innerHTML+strDisplay;

      } else if (arrDistances[step]<0) {
          strDisplay='<option value=' + arrRealIds[step] + '>'+arrP1s[step]  + '</option>'
          selectLost.innerHTML=selectLost.innerHTML+strDisplay;
      }
    }

}

// console.log(promiseAllRealId);

// loadString();
// function loadSelectBox(){
//     var selectWon = document.getElementById('selectWon');
//     var selectLost = document.getElementById('selectLost');
//     for (let step = 0; step < await arrRealIds.length; step++) {
//       // Runs 5 times, with values of step 0 through 4.
//       console.log(arrRealIds[step])
//       if (arrRealIds[step]>0){
//           strDisplay=await '<option value=' + arrRealIds[step] + '>' +arrRealIds[step] + '</option>'
//           // console.log(strDisplay)
//           selectWon.innerHTML=await selectWon.innerHTML+strDisplay;
//
//       } else if (arrRealIds[step]<0) {
//           strDisplay='<option value=' + arrRealIds[step] + '>'  + '</option>'
//           selectLost.innerHTML=selectLost.innerHTML+strDisplay;
//       }
//     }
// }
