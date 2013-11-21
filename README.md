Infinite Jekyll
===============

[WIP] Infinite scroll for Jekyll based blogs. See it in action at [tobiasahlin.com/blog/](http://tobiasahlin.com/blog).

## Getting Started

Include all files at the root of your Jekyll site. If you're not already using jQuery, open `_layouts/default.html` and add it:

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

In `_layouts/default.html`, add `infinite-jekyll.js` after jQuery:

	<script src="/js/infinite-jekyll.js"></script>

Per default, Jekyll renders links to all of your posts ever made. For lazy loading to make sense, we need to set a limit. Open up `index.html` and find this line:

	{% for post in site.posts %}

And change it to:

	{% for post in site.posts limit: 10 %}	

How fun is it to only see links on the front page? Time to render those posts. Open up `index.html`. Find this line: 

	<li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>

Replace it with this:

	<li>
		<h2>{{ post.title }}</h2>
		<p class="meta">{{ post.date | date_to_string }}</p>
	
		<div class="post">
		{{ post.content }}
		</div>
	</li>

You should now see the 10 latest posts in the entirety on your front page, but no infinite scroll yet. Infinite Jekyll will only try to lazy load posts if there's a spinner visible. At the very end of `index.html`, add the spinner:

	<div class="infinite-spinner"></div>

Open up `css/main.css` and add some styling to our fancy spinner:

	.infinite-spinner {
		margin: 0 auto;
		display: block;
	}

And you're done!
