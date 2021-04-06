$(function() {
  
  var postURLs,
      isFetchingPosts = false,
      shouldFetchPosts = true;

  // Load the JSON file containing all URLs
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // If a tag was passed as a url parameter then use it to filter the urls
  if (urlParams.has('tag')){
    const tag = urlParams.get('tag');
    document.getElementById(tag).classList.toggle('hidden');
    $.getJSON('/posts-by-tag.json', function(data) {
        let tag_item = data.find(el => el.tag === tag);
        postURLs = tag_item["posts"];
        // If there aren't any more posts available to load than already visible, disable fetching
        if (postURLs.length <= postsToLoad)
        disableFetching();
    });
  } else {
      $.getJSON('/all-posts.json', function(data) {
        postURLs = data["posts"];
        // If there aren't any more posts available to load than already visible, disable fetching
        if (postURLs.length <= postsToLoad)
          disableFetching();
      });
  }

  var postsToLoad = $(".tag-master:not(.hidden) .post-list").children().length,
      loadNewPostsThreshold = 10;

  // If there's no spinner, it's not a page where posts should be fetched
  if ($(".infinite-spinner").length < 1)
    shouldFetchPosts = false;

  // Are we close to the end of the page? If we are, load more posts
  $(window).scroll(function(e){
    if (!shouldFetchPosts || isFetchingPosts) return;

    var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();

    // If we've scrolled past the loadNewPostsThreshold, fetch posts
    if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
      fetchPosts();
    }
  });

  // Fetch a chunk of posts
  function fetchPosts() {
    // Exit if postURLs haven't been loaded
    if (!postURLs) return;

    isFetchingPosts = true;

    // Load as many posts as there were present on the page when it loaded
    // After successfully loading a post, load the next one
    var loadedPosts = 0,
        postCount = $(".tag-master:not(.hidden) .post-list").children().length,
        callback = function() {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;

          if (postIndex > postURLs.length-1) {
            disableFetching();
            return;
          }

          if (loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };

    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function fetchPostWithIndex(index, callback) {
    var postURL = postURLs[index];

    $.get(postURL, function(data) {
      $(data).find(".post").appendTo(".tag-master:not(.hidden) .post-list");
      callback();
    });
  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }
	
});
