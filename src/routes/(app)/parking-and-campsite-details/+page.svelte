<script lang="ts">
	interface Vehicle {
		isTrailer: boolean
	}

	interface Data {
		name: string
		partySize: number
		vehicles: Vehicle[]
		sharing: boolean
		tentSize: {
			width: number
			height: number
		}
	}

	const data = $state<Data>({
		name: '',
		partySize: 1,
		vehicles: [],
		sharing: false,
		tentSize: {
			height: 0,
			width: 0
		}
	})
</script>

<article class="container prose mx-auto px-4">
	<h1>Parking and Campsite Details</h1>

	<section>
		<h2>Campsites Reservation</h2>
		<p>
			We have reserved <strong>12 campsites</strong> for Friday and Saturday. If you want to camp, please enter your
			name, the number of people in your party, and how many vehicles you will bring. If you are bringing a trailer,
			please check that box and note that the maximum allowed trailer length is <strong>24ft</strong>. Are you willing
			to share a campsite with other guests? If so, what size is your tent?
		</p>
		<p>If you want to extend your stay, contact us, and we may be able to add additional days to your campsite.</p>
		<p>
			Based on these responses, we will assign a campsite to you or inform you that we’re out of space shortly after <strong
				>April 18</strong
			>.
		</p>

		<!-- <form>
			<input type="text" bind:value={data.name} />
			<input type="number" bind:value={data.partySize} />
			{#each data.vehicles as _, index}
				<div>
					<input type="checkbox" bind:checked={data.vehicles[index].isTrailer} />
				</div>
			{/each}

			<input type="checkbox" bind:checked={data.sharing} />
			{#if data.sharing}
				<input type="number" bind:value={data.tentSize.width} />
				<input type="number" bind:value={data.tentSize.height} />
			{/if}
		</form> -->
		
		<i>form coming soon</i>
	</section>

	<section>
		<h2>Parking</h2>
		<p>If you are camping, please park in your assigned campsite. Otherwise, you may route to</p>
		<address>Doane Pond Day Use Area, Palomar Mountain, CA 92060</address>
		<p>
			This address will take you to a parking lot adjacent to the campground. Please be aware that this public parking
			lot may fill up. If it is full when you arrive, you may park at the Silvercrest Picnic Area, about 10 minutes from
			the pond. We will arrange for someone to ferry anyone who must park at Silvercrest.
		</p>
		<p>Because of limited parking spots, we ask that you carpool with other guests as much as possible.</p>
	</section>

	<section>
		<h2>Accessibility</h2>
		<p>
			If your mobility is hindered, please note that the ceremony area is approximately a 3/4 mile hike from the parking
			lot. Please contact us if you need an escort; we can bring a wheelchair.
		</p>
	</section>
</article>
