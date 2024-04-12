<script lang="ts">
	import Timeline from './Timeline.svelte'
	import TimelineSegment from './TimelineSegment.svelte'
</script>

<article class="container prose mx-auto px-4">
	<h1>Weekend Itinerary</h1>

	<section class="mt-8">
		<h2>Map</h2>

		<img class="rounded" alt="palomar mountain doane valley map" src="/palomar_mountain_doane_valley_map.jpg" />

		<ul>
			<li>Fun & Games: 31</li>
			<li>Lentil: 8</li>
			<li>Stew: 4</li>
			<li>Sides: 6 & 7</li>
			<li>Bridal tent: 28 & 29</li>
			<li>Guest camping: 1, 2, 3, 9, and 10.</li>
		</ul>
	</section>

	<section>
		<h2>Friday:</h2>
		<p>
			The check-in time for camping is <time>2 PM</time>, but you may arrive early to hike the many beautiful trails or
			help with set-up.
		</p>
	</section>

	<section>
		<h2>Saturday:</h2>

		<Timeline class="not-prose">
			<TimelineSegment time="2:30 PM" title="The Beginning">
				The official wedding start time is <time>2:30 PM</time>, but you are welcome to arrive earlier. You may enjoy a
				hike or simply bask in the beauty of the forest.
			</TimelineSegment>

			<TimelineSegment time="2:45 PM" title="Ceremony">
				Follow the signs to the ceremony site along Thunder Spring Trail (a leisurely 15-minute walk from the parking
				lot).
			</TimelineSegment>

			<TimelineSegment time="3:15 PM" title="Fun & Games">
				After the ceremony, return to the campground to enjoy a light snack and games at campsite 31.
			</TimelineSegment>

			<TimelineSegment time="5:00 PM" title="Dinner">
				Time for dinner! Retrieve your bowl and small plate from the table and line up for a ladle of stew with sides at
				campsites 4, 6, 7, and 8.
			</TimelineSegment>

			<TimelineSegment time="5:00 PM" title="Speeches">
				Once everyone has been seated, enjoy (or suffer) a few speeches.
			</TimelineSegment>

			<TimelineSegment time="7:00 PM" title="Wilderness Wandering">Let’s embark on a scavenger hunt!</TimelineSegment>

			<TimelineSegment time="8:00 PM" title="Dessert">
				Come back to the table and eat some delicious dessert.
			</TimelineSegment>

			<TimelineSegment time="8:30 PM" title="Fireside Chats">
				The wedding celebration has ended, but you are welcome to sit around a campfire and chat.
			</TimelineSegment>

			<TimelineSegment time="10:00 PM" title="Quiet Hours">Lights out, time for sleep.</TimelineSegment>
		</Timeline>
	</section>

	<section>
		<h2>Sunday:</h2>
		<p>Check out of your campsite by <time>12 noon</time>.</p>
	</section>
</article>
