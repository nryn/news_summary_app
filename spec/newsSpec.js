function ApiDouble() {
  this.received = {};
};

ApiDouble.prototype.getNews = function(){
  this.received.getNews = true;
  return [{fields : { headline : 'the test headline', bodyText : 'this is the test article body', thumbnail : 'http://ichef.bbci.co.uk/news/976/cpsprodpb/BC93/production/_92457284_newspaper.jpg'}}];
};

var apiDouble = new ApiDouble();
var list = new StoryList(apiDouble);

new Wish("StoryList is defined", list).isDefined();
new Wish("StoryList should ask the Guardian for stories", function(){list.fetchStories()}).expectMessage(function(){return apiDouble.received.getNews})
new Wish("StoryList can show us a list of stories", list.stories[0]).isType("Story");

// new Wish("Day's abbreviation html elements have ids", notebook.printNoteAbbr()[0].id).isEqualTo("note7");

// var time = new Date();
// freezeTime(time);
// unfreezeTime();
