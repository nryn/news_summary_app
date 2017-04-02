var list = new StoryList();

function injectStories() {
  list.fetchStories();
  printStories();
};

function printStories(){
  list.stories.forEach(function(story, index) {
    var storyList = document.getElementById('stories')
    var storyListItem = document.createElement('li')
    var storyPic = document.createElement('img')
    var storyTitle = document.createElement('p')

    storyListItem.id = "story_" + (index + 1);
    storyListItem.className = "title";
    storyListItem.setAttribute('onClick',"toggleAbbr(this.id);")
    storyPic.setAttribute('src',story.picture)
    storyTitle.textContent = story.title;
    storyList.appendChild(storyListItem);

    var story = document.getElementById("story_" + (index + 1));
    story.appendChild(storyPic);
    story.appendChild(storyTitle);
  });
};

function toggleAbbr(id) {
  var story = document.getElementById(id);
  if (story.className == "title") {
    injectAbbr(id);
    story.className = "abbr";
  } else {
    injectTitle(id);
    story.className = "title";
  }
};

function injectAbbr(id) {
  document.getElementById(id).getElementsByTagName('p')[0].innerHTML = getStoryFromId(id).bodyText;
};

function injectTitle(id) {
  document.getElementById(id).getElementsByTagName('p')[0].textContent = getStoryFromId(id).title;
};

function getStoryFromId(id) {
  var storyIndex = parseInt(id.substr(6)) - 1
  return list.stories[storyIndex]
};

injectStories();
