function getpublisheddate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('published');
   var response = requestShopifyAPI();

ss.deleteRows(2,ss.getLastRow()-1);

response.products.sort((a, b) => a.id - b.id);

response.products.forEach(function(product,index){
  ss.getRange(ss.getLastRow()+1,1).setValue(product.id);
  ss.getRange(ss.getLastRow(),2).setValue(product.title);
  ss.getRange(ss.getLastRow(),8).setValue(product.status);
  ss.getRange(ss.getLastRow(),9).setValue(product.images[0].src);

  if (product.published_at !== null && product.published_at !== undefined){
    var publish = product.published_at.substring(0, 10);
    ss.getRange(ss.getLastRow(),4).setValue(publish)};
  if (product.created_at !== null && product.created_at !== undefined){
  var create = product.created_at.substring(0, 10);
  ss.getRange(ss.getLastRow(),5).setValue(create)};
   if (product.updated_at !== null && product.updated_at !== undefined){
  var update = product.updated_at.substring(0, 10);
  ss.getRange(ss.getLastRow(),6).setValue(update)};
  ss.getRange(ss.getLastRow(),3).setValue(product.variants[0].sku);
  ss.getRange(ss.getLastRow(),7).setValue(product.variants[0].price);
} );
}
 
 //API request
 function requestShopifyAPI() {
  var myAPI = myAPI_();
  var API_KEY = myAPI.apiKey;
  var API_PASSWORD = myAPI.apiPass;
  var SHOP_ID = myAPI.shopID;
  var API_VERSION = myAPI.apiVer;
  var REPORT_ID = myAPI.report_id;
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('published');
  
  var encoded = Utilities.base64Encode(API_KEY + ':' + API_PASSWORD);

  var headers = {
      "Content-Type" : "application/json",
      "Authorization": "Basic " + encoded
    };

    var options = {
      "contentType" : "application/json",
      'method' : 'GET',
      'headers' : headers, // This is the important part
      'followRedirects' : true,
    };

  var response = UrlFetchApp.fetch(`https://${SHOP_ID}.myshopify.com/admin/api/${API_VERSION}/products.json?limit=250`, options);
  
  return JSON.parse(response.getContentText());
}

