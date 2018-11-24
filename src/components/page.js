export function pagging(array1,array2,curPage,maxSize){
  // array2 = []
  for(let j= curPage*maxSize-maxSize;j<curPage*maxSize; j++){
    if(array1[j]!=null && array1[j]!=undefined){
      array2.push(array1[j])
    }
  }
  return array2
}