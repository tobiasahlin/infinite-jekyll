Infinite Jekyll
===============

Infinite scroll for Jekyll based blogs. See it in action at [tobiasahlin.com/blog/](http://tobiasahlin.com/blog).

## Getting Started

Add the `js` folder and `all-posts.json` to the root of your Jekyll site. If you're not already using jQuery, open `_layouts/default.html` and include it:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

In `_layouts/default.html`, include `infinite-jekyll.js` after jQuery:

```html
<script src="/js/infinite-jekyll.js"></script>
```

### Render posts, not links

How fun is it to only see links? Open up `index.html`. Find this line: 

```html
<li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
```

Remove everything within the `li`. Open up `_layouts/post.html` and copy the markup for single posts. Paste it within the `li`, and replace every instance of `page.` with `post.`. This is how it should look using the default markup:

```html
<li>
	<h2>{{ post.title }}</h2>
	<p class="meta">{{ post.date | date_to_string }}</p>

	<div class="post">
	{{ post.content }}
	</div>
</li>
```

### Limit the number of posts

Per default, Jekyll will render all posts in your entire archive. For lazy loading to make sense, we need to set a limit. Open up `index.html` and find this line:

	{% for post in site.posts %}

Change it to:

	{% for post in site.posts limit: 10 %}	

You can change `10` to whatever number you like. The same number will be used for lazy loading new posts, so `10` will render 10 static post, and then fetch another 10 posts every time you get near the bottom of the page.

### Add the spinner

You should see your 10 latest posts on the front page, but no infinite scroll yet. Infinite Jekyll will only try to lazy load posts if there's a spinner present. At the very end of `index.html`, add the spinner:

```html
<div class="infinite-spinner"></div>
```

`spinner.css` contains a simple CSS spinner that works in most modern browsers. Open up `css/main.css`, and at the very end, paste everything from `spinner.css`. 

And you're done. Happy scrolling!
