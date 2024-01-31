<script>
	import '../app.pcss';
</script>

<a href="/">
	<img class="w-72 mx-auto" src="/logo.webp" alt="watercolor top down stump labeled with Catherine & AJ in cursive surounded by spring foilage" />
</a>

<header class="container mx-auto px-4 my-4">
	<nav class="flex justify-center gap-4 flex-wrap">
		<a class="link link-hover" href="rsvp">RSVP</a>
		<a class="link link-hover" href="wish-list">Wish List</a>
		<a class="link link-hover" href="parking-and-campsite-details">Parking & Campsite Details</a>
		<a class="link link-hover" href="our-story">Our Story</a>
		<a class="link link-hover" href="weekend-itinerary">Weekend Itinerary</a>
		<a class="link link-hover" href="volunteer">Volunteer</a>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="h-96 bg-repeat-x bg-bottom mt-auto"></footer>

<style>
	footer {
		background-image: url("/trees.webp"); 
		background-size: 40rem;
	}
</style>