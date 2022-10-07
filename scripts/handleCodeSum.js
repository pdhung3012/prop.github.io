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

let arrTexts=[]
let arrP1s=[]
let arrRealIds=[]
let arrDistances=[]
let currentIndexQuery=-1
// async function loadString(){
//     [promiseAllText,promiseAllP1,promiseAllRealId]=[await downloadFile(urlOnlineDomain+'dataPropMiner/cacheQueries/cosum_tlcodesum_all.txt'),await downloadFile(urlOnlineDomain+'dataPropMiner/cacheQueries/cosum_tlcodesum_p1.all.txt'),await downloadFile(urlOnlineDomain+'dataPropMiner/cacheQueries/cosum_tlcodesum_realId.all.txt')];
//     // promiseAllP1=;
//     // promiseAllRealId=;
//     [arrTexts,arrP1s,arrRealIds]=[await promiseAllText.split('\n'),await promiseAllP1.split('\n'),await promiseAllRealId.split('\n')]
//     // let arrP1s=await promiseAllP1.split('\n')
//     // let arrRealIds=await promiseAllP1.split('\n')
//     console.log(arrRealIds.length);
//     lstTextWon=[]
//     lstTextLost=[]
// }
function showCaseWon(){
    // [promiseResult]=[await downloadFile(urlOnlineDomain+'dataPropMiner/cosum_print/0.txt')];
    // promiseAllP1=;
    // promiseAllRealId=;
    // console.log(promiseResult)
        // let arrP1s=await promiseAllP1.split('\n')
    // let arrRealIds=await promiseAllP1.split('\n')
    var selectWon = document.getElementById('selectWon');
    var optionWon = selectWon.options[selectWon.selectedIndex];
    currentIndexQuery=optionWon.value;

    document.getElementById('iframeResult').src=urlOnlineDomain+'dataPropMiner/cosum_print/'+currentIndexQuery+'.txt';
    // document.getElementById('iframeResult').setStyles({ 'overflow': 'auto' });
    document.getElementById('txtInputQuery').value=optionWon.text;
    // promiseResult.then(document.getElementById('iframeResult').value)
    // document.getElementById('text').value =await promiseResult;
}

function showCaseLost(){
    // [promiseResult]=[await downloadFile(urlOnlineDomain+'dataPropMiner/cosum_print/0.txt')];
    // promiseAllP1=;
    // promiseAllRealId=;
    // console.log(promiseResult)
        // let arrP1s=await promiseAllP1.split('\n')
    // let arrRealIds=await promiseAllP1.split('\n')
    var selectLost = document.getElementById('selectLost');
    var optionLost = selectLost.options[selectLost.selectedIndex];
    currentIndexQuery=optionLost.value;

    document.getElementById('iframeResult').src=urlOnlineDomain+'dataPropMiner/cosum_print/'+currentIndexQuery+'.txt';
    // document.getElementById('iframeResult').setStyles({ 'overflow': 'auto' });
    document.getElementById('txtInputQuery').value=optionLost.text;
    // promiseResult.then(document.getElementById('iframeResult').value)
    // document.getElementById('text').value =await promiseResult;
}

function performSearch(){
    strInputQuery=document.getElementById('txtInputQuery').value;
    maxSim=0;
    for(let index=0;index<arrRealIds.length;index++){
        currentSim=similarity(strInputQuery,arrP1s[index])
        if(currentSim>maxSim){
            maxSim=currentSim;
            currentIndexQuery=index;
        }
    }
    document.getElementById('iframeResult').src=urlOnlineDomain+'dataPropMiner/cosum_print/'+currentIndexQuery+'.txt';
    // document.getElementById('iframeResult').setStyles({ 'overflow': 'auto' });
    // document.getElementById('txtInputQuery').value=optionLost.text;

}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}



function loadBody2(){
    // console.log(datacosum['realIds'][0]);
    arrTexts=datacosum['realIds']
    arrP1s=datacosum['textP1']
    arrRealIds=datacosum['realIds']
    arrDistances=datacosum['distance']
    var selectWon = document.getElementById('selectWon');
    var selectLost = document.getElementById('selectLost');
    strDisplayWon='';
    strDisplayLost='';
    for (let step = 0; step < arrRealIds.length; step++) {
      // Runs 5 times, with values of step 0 through 4.
      // console.log(arrRealIds[step])
      if (arrDistances[step]>0){
          strDisplayWon+='<option value=' + step + '>' +arrP1s[step] + '</option>'
          // console.log(strDisplay)
          // selectWon.innerHTML= selectWon.innerHTML+strDisplay;

      } else if (arrDistances[step]<0) {
          strDisplayLost+='<option value=' + step + '>'+arrP1s[step]  + '</option>'
          // selectLost.innerHTML=selectLost.innerHTML+strDisplay;
      }
    }
    selectWon.innerHTML= strDisplayWon;
    selectLost.innerHTML=strDisplayLost;

    // txtResultGuide
    strDisplayInstruction="Query and best candidates' information\nResults in Top-K";
    strDisplayInstruction+="\nStep 1 (get nl-pl embbedding (like GraphCodeBERT) of query and candidates with dimensions = 768)"
    strDisplayInstruction+="\nStep 2.1. (Get tree representation of query)"
    strDisplayInstruction+="\nStep 2.2. (Get expected properties from tree representation of query)"
    strDisplayInstruction+="\nStep 3.1. (Get fastText representation of candidates - dimensions = 100 )"
    strDisplayInstruction+="\nStep 3.2. (PropMiner predict properties - dimensions = 10)"
    strDisplayInstruction+="\nStep 4. (Augment nl-pl embedding of query with expected properties; Augment nl-pl embedding of candidates with predicted properties; Compare by euclid distance)";
    document.getElementById('txtResultGuide').value=strDisplayInstruction;


    // document.getElementById('iframeResult').setStyles({ 'overflow': 'auto' });


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
