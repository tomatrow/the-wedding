<a href="/">
	<img
		class="mx-auto w-72 select-none"
		src="/logo.webp"
		alt="watercolor top down stump labeled with Catherine & AJ in cursive surounded by spring foilage"
	/>
</a>

<header class="container mx-auto my-4 px-4">
	<nav class="flex flex-wrap justify-center gap-4">
		<a class="link-hover link" href="/">Home</a>
		<a class="link-hover link" href="rsvp">RSVP</a>
		<a class="link-hover link" href="wish-list">Wish List</a>
		<a class="link-hover link" href="parking-and-campsite-details">Parking & Campsite Details</a>
		<a class="link-hover link" href="our-story">Our Story</a>
		<a class="link-hover link" href="weekend-itinerary">Weekend Itinerary</a>
		<a class="link-hover link" href="volunteer">Volunteer</a>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="mt-auto h-96 bg-bottom bg-repeat-x"></footer>

<style>
	footer {
		background-image: url('/trees.webp');
		background-size: 40rem;
	}
</style>
