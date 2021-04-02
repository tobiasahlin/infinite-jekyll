Infinite Jekyll - 2021
===============

Infinite scroll for Jekyll based blogs. [See it in action](https://the-mvm.github.io/archive/).

Created by [Tobias Ahlin](https://github.com/tobiasahlin), [original repository](https://github.com/tobiasahlin/infinite-jekyll)
Updated for 2021 by [Armando Maynez](https://github.com/amaynez)

The basic functionality for infinite scroll across ALL SITE POSTS is maintained and additional functionality for infinite scroll using a subset of posts filtered by tag ([see it in action here](https://the-mvm.github.io/tag/?tag=Coding)) was developed. This can be modified to work for categories as well.

The installation process is therefore divided in two parts accordingly:

## Getting Started - Basic Functionality (scroll across ALL SITE POSTS)

### Step 1 - copy files
Copy the `infinite-jekyll.js` and `jquery-3.2.1.min.js` files to your `/assets/js/` folder and `all-posts.json` to the root of your Jekyll site.

### Step 2 - include js files in HTML
Add the following HTML tags to the `/_layouts/head.html` (or `/_layouts/default.html`) file to ensure jquery and infinite jekyll are loaded:
```html
<script src="{{site.baseurl}}/assets/js/jquery-3.2.1.min.js"></script>
<script src="{{site.baseurl}}/assets/js/infinite-jekyll.js"></script>
```

### Step 3 - prepare HTML where scrolling will take place

In `index.html` or in any file where you want the infinite scrolling to happen make sure you have this code:

```html
<div class="archive tag-master">
	<div class="post-list">
	{% for post in site.posts limit: 3 %}
		<div class="post">
			<a class="post-list-title" href="{{ post.url }}">{{ post.title }}</a>
			{% include post_meta.html type="post-card-meta" %}
			<div class="post-excerpt">
				{{ post.content | markdownify | strip_newlines | truncatewords: 100 }}<a class="read-more" href="{{ post.url }}"> read more</a>
			</div>
		</div>
	{% endfor %}
	</div>
</div>
<div class="infinite-spinner"></div>
```
Please note that some element classes are important and without them the script will not work. In particular `tag-master` and  `post-list` must be kept exactly as they are. The rest are just for styling.

This code will render excerpts of 100 words per post, and if you click either on the title or on "read more" there is a link to the full article. If you however want to scroll over full articles, then replace this:
```html
        <div class="post-excerpt">
            {{ post.content | markdownify | strip_newlines | truncatewords: 100 }}<a class="read-more" href="{{ post.url }}"> read more</a>
        </div>
```
with this:
```html
        <div class="post-content">
            {{ post.content | markdownify }}
        </div>
```

### Step 4 - Add the spinner styling

`/spinner.css` contains a simple CSS spinner that works in most modern browsers. Open up `css/main.css`, and at the very end, paste everything from `spinner.css`. 

### Step 5 - Optional - Add CSS for the list elements
`/optional.css` contains an example of styles for the list to render properly, copy them into your `css/main.css` file as required.

**And you're done. Happy scrolling!**

## Setting up scroll over filtered posts

If you already did the above, and you have the basic functionality working fine the next steps are:

### Step 1 - create the html file to show the filtered posts
Copy `/_pages/tag.html` file into your own site's `/_pages/` directory.

This page renders an HTML file with ALL the posts per tag, the trick is to hide them all, and only show the ones we want to scroll on, therefore we must add the following CSS to your `main.css` file:
```css
.hidden{display:none}
```

### Step 2 - create the links to the page
Whether you have a tags page or show the tags on your posts, you will need to link those to your new `tag.html` file properly for it to work.

The liquid code for the link is:
```html
<a href="{{ site.url }}/tag/?tag={{ tag | url_encode }}" class="tag">{{ tag }}</a>
```
And here is the full code to create a tags list, with number of posts per tag and the links already created:
```html
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tag_words = site_tags | split:',' | sort %}
<div class="tag-cloud">
    <ul class="tags">
        {% for item in (0..site.tags.size) %}{% unless forloop.last %}
            {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
            <li><a href="{{ site.url }}/tag/?tag={{ this_word | url_encode }}" class="tag">{{ this_word }} <span>({{ site.tags[this_word].size }})</span></a></li>
        {% endunless %}{% endfor %}
    </ul>
</div>
```
**And you are all set!**