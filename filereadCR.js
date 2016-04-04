var fs=require('fs');

var Converter= require('csvtojson').Converter;
var converter=new Converter({});

converter.fromFile("Production-Department_of_Agriculture_and_Cooperation_1.csv", function(err,data){

var len=data.length;
var commercial=[];
var resultOfRiceYield=[];

var save=data[0];
var keys=Object.keys(save);

for(var j in keys){
var rice=new Array();
for(var i=0; i<len; i++){
  obj=data[i];
  if(obj.Particulars== "Agricultural Production Foodgrains Rice Yield Andhra Pradesh" ||
    obj.Particulars== "Agricultural Production Foodgrains Rice Yield Karnataka" ||
    obj.Particulars== "Agricultural Production Foodgrains Rice Yield Kerala" ||
    obj.Particulars== "Agricultural Production Foodgrains Rice Yield Tamil Nadu"){

      if(keys[j]!== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency"){
        if(obj[keys[j]] == "NA"){
          //console.log(obj[keys[j]]);
          rice.push(0);

        }
        else {
          rice.push(obj[keys[j]]);
        }
      }
    }
  }
  if(keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency"){
    resultOfRiceYield.push({
      "Year": keys[j],
      "Andhra Pardesh": rice[0],
      "Karnataka": rice[1],
      "Kerala": rice[2],
      "Tamil Nadu": rice[3]
    });
}
}


for(var j in keys){

  var sum=0;

  for(var i=0;i<len;i++){
    obj=data[i];
  if(data[i].Particulars== "Agricultural Production Commercial Crops Cotton" ||
    data[i].Particulars== "Agricultural Production Commercial Crops Jute" ||
    data[i].Particulars== "Agricultural Production Commercial Crops Mesta" ||
    data[i].Particulars== "Agricultural Production Commercial Crops Jute and Mesta" ||
    data[i].Particulars== "Agricultural Production Commercial Crops Sugarcane"){
      if(keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency"){
        if(obj[keys[j]] !== "NA"){
          sum+= parseFloat(obj[keys[j]]);
        }
      }
    }

}// end of for
if(keys[j] !== "Particulars" && keys[j] !== "Unit" && keys[j] !== "Frequency"){
  commercial.push({
    "Year": keys[j],
    "Production": sum
  });
}
}

fs.writeFile("riceYield.json",JSON.stringify(resultOfRiceYield));
fs.writeFile("commercial.json",JSON.stringify(commercial));
});
