var fs=require("fs");
var arr,flag=true,lineArray;
var index1,index2;
var obj;
var oilseedsArray=[];
var foodgrainArray=[];
var csv = fs.readFile("Production-Department_of_Agriculture_and_Cooperation_1.csv",function(err,data){
    if(err){
        console.log(err);
    }

    else{
         arr = data.toString().split("\n");

         for(var i=0;i<arr.length;i++){
           lineArray=arr[i].toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

           if(flag==true){

              for(var i=0;i<lineArray.length;i++){
              //  console.log(lineArray[i]);
                  if(lineArray[i]=="Particulars"){
                    index1=i;
                  }else if(lineArray[i]==" 3-2013"){
                      index2=i;
                  }
                }//end loop
              //  console.log(index1+"    "+index2);
                flag=false;
            }//end if
            else{
              //console.log("insite else");
                 obj=new Object();
                 var numO=lineArray[index1].indexOf("Oilseeds");
                  var numF=lineArray[index1].indexOf("Foodgrains");
                 //console.log(num);
                 if(numO!=-1){
                    if(lineArray[index2]!=0){
                      obj.Production=lineArray[index1];
                      obj.Value=lineArray[index2];
                      oilseedsArray.push(obj);
                      //console.log(obj.firstData+"    "+obj.secondData);
                    }// end if
                  }
                if(numF!=-1){
                   if(lineArray[index2]!=0){
                     obj.Production=lineArray[index1];
                     obj.Value=lineArray[index2];
                     foodgrainArray.push(obj);
                     //console.log(obj.firstData+"    "+obj.secondData);
                   }// end if
                    fs.writeFile('oilseeds.json',JSON.stringify(oilseedsArray));
                    fs.writeFile('foodgrain.json',JSON.stringify(foodgrainArray));
                 }//end of outer if

            }//end of else

          }//end loop

        }

});
