function lineBreakEverySentence(text){
  return text.replace(/\.\ /g, ". <br><br>")
};

function NewsApi(baseUrl) {
  this.baseUrl = baseUrl;
};
var guardianApi = new NewsApi('http://content.guardianapis.com/search?section=politics&show-fields=headline%2CbodyText%2Cthumbnail&api-key=');

NewsApi.prototype.apiCall = function() {
  if (!apiKey) {throw new Error("no api key defined")}
  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.baseUrl + apiKey, false);
  xhr.send();
  return JSON.parse(xhr.response);
};

NewsApi.prototype.getNews = function() {
  var data = this.apiCall();
  return data.response.results;
};

function StoryList(api = guardianApi) {
  this.stories = [];
  this.api = api;
};

StoryList.prototype.fetchStories = function() {
  var list = this;
  this.api.getNews().forEach(function(obj){
    var title = obj.fields.headline;
    var bodyText = lineBreakEverySentence(obj.fields.bodyText);
    var picture = obj.fields.thumbnail;
    list.stories.push(new Story(title, bodyText, picture));
  });
};

function Story(title, bodyText, picture) {
  this.title = title;
  this.bodyText = bodyText;
  this.picture = picture;
};
