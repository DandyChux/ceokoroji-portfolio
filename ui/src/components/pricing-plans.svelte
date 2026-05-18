<script lang="ts">
	import { Button } from "./ui/button";
	import { Badge } from "./ui/badge";
	import * as Card from "./ui/card";
	import { basePlan, addOns } from "$lib/config/pricing";

	// Reactive state to track which add-ons the user has clicked
	let selectedAddons = $state<string[]>([]);

	// Automatically calculate totals whenever selectedAddons changes
	let oneTimeTotal = $derived(
		basePlan.price +
			addOns
				.filter(
					(a) =>
						selectedAddons.includes(a.id) && a.type === "one-time",
				)
				.reduce((sum, a) => sum + a.price, 0),
	);

	let recurringTotal = $derived(
		addOns
			.filter(
				(a) => selectedAddons.includes(a.id) && a.type === "recurring",
			)
			.reduce((sum, a) => sum + a.price, 0),
	);

	function toggleAddon(id: string) {
		if (selectedAddons.includes(id)) {
			selectedAddons = selectedAddons.filter((a) => a !== id);
		} else {
			selectedAddons = [...selectedAddons, id];
		}
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);
	};
</script>

<div class="flex flex-col gap-16 py-16 mx-auto max-w-7xl px-4 md:px-8 mb-24">
	<!-- Discovery Phase Banner -->
	<div
		class="bg-muted/50 border border-border rounded-xl p-6 text-center max-w-3xl mx-auto mb-4"
	>
		<h3 class="text-lg font-semibold mb-2">Not sure what you need?</h3>
		<p class="text-muted-foreground text-sm">
			Start with a <strong>$500 Discovery & Roadmapping Phase</strong>.
			We'll map out your exact architecture, and if you hire me for the
			build, the $500 is credited toward your Base Plan.
		</p>
	</div>

	<!-- Base Plan Section -->
	<section class="flex flex-col items-center space-y-8">
		<div class="text-center space-y-4">
			<h2 class="text-3xl md:text-4xl font-bold tracking-tight">
				Base Development
			</h2>
			<p class="text-muted-foreground max-w-2xl mx-auto">
				Start with a rock-solid foundation, then add only what you need.
			</p>
		</div>

		<Card.Root
			class="w-full max-w-lg relative border-primary shadow-lg dark:border-primary/50"
		>
			<Badge
				class="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 text-sm px-3 py-1"
				>The Baseline</Badge
			>
			<Card.Header class="text-center pb-8 pt-8">
				<Card.Title class="text-2xl">{basePlan.name}</Card.Title>
				<Card.Description class="pt-2 text-base"
					>{basePlan.description}</Card.Description
				>
				<div
					class="mt-6 flex items-baseline justify-center text-5xl font-extrabold"
				>
					{basePlan.displayPrice}
				</div>
			</Card.Header>
			<Card.Content>
				<ul class="space-y-4 px-4">
					{#each basePlan.features as feature}
						<li class="flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-5 h-5 text-primary shrink-0"
								><polyline points="20 6 9 17 4 12"
								></polyline></svg
							>
							<span class="text-base">{feature}</span>
						</li>
					{/each}
				</ul>
			</Card.Content>
			<Card.Footer class="pt-6">
				<!-- Passing plan=base to handle the scenario where they don't want add-ons -->
				<Button href="/contact?plan=base" class="w-full text-lg h-12"
					>Start Project</Button
				>
			</Card.Footer>
		</Card.Root>
	</section>

	<!-- Add-ons Section -->
	<section class="flex flex-col space-y-8 mt-8">
		<div class="text-center space-y-4">
			<h2 class="text-3xl md:text-4xl font-bold tracking-tight">
				Modular Add-Ons
			</h2>
			<p class="text-muted-foreground max-w-2xl mx-auto">
				Customize your project scope with predictable, a-la-carte
				pricing.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each addOns as addon}
				<Card.Root
					class="flex flex-col transition-all duration-300 cursor-pointer bg-background text-foreground h-full relative overflow-hidden {selectedAddons.includes(
						addon.id,
					)
						? 'border-primary ring-1 ring-primary shadow-md'
						: 'hover:border-primary/50 motion-safe:hover:scale-[1.02]'}"
					onclick={() => toggleAddon(addon.id)}
				>
					{#if selectedAddons.includes(addon.id)}
						<div
							class="absolute top-0 right-0 bg-primary text-primary-foreground p-1 rounded-bl-lg"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								><polyline points="20 6 9 17 4 12"
								></polyline></svg
							>
						</div>
					{/if}

					<Card.Header>
						<Card.Title>{addon.name}</Card.Title>
						<Card.Description class="pt-2"
							>{addon.description}</Card.Description
						>
					</Card.Header>
					<Card.Content class="flex-grow">
						<div
							class="text-3xl font-bold mb-6 {selectedAddons.includes(
								addon.id,
							)
								? 'text-primary'
								: ''}"
						>
							{addon.displayPrice}
						</div>
						<ul class="space-y-3 text-sm text-muted-foreground">
							{#each addon.features as feature}
								<li class="flex items-start gap-2">
									<div
										class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"
									></div>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer>
						<Button
							variant={selectedAddons.includes(addon.id)
								? "secondary"
								: "outline"}
							class="w-full"
						>
							{selectedAddons.includes(addon.id)
								? "Remove"
								: "Add to Scope"}
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</section>
</div>

<!-- Sticky Footer Summary -->
{#if selectedAddons.length > 0}
	<div
		class="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-full duration-300"
	>
		<div
			class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
		>
			<div
				class="flex items-center gap-6 md:gap-12 w-full sm:w-auto justify-center sm:justify-start"
			>
				<div>
					<p
						class="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold"
					>
						Estimated Build
					</p>
					<p class="text-2xl md:text-3xl font-bold text-primary">
						{formatCurrency(oneTimeTotal)}
					</p>
				</div>

				{#if recurringTotal > 0}
					<div class="h-10 w-px bg-border hidden sm:block"></div>
					<div>
						<p
							class="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold"
						>
							Maintenance
						</p>
						<p class="text-2xl md:text-3xl font-bold">
							{formatCurrency(recurringTotal)}<span
								class="text-sm font-normal text-muted-foreground"
							>
								/mo</span
							>
						</p>
					</div>
				{/if}
			</div>
			<!-- Dynamically append selected add-ons to the URL -->
			<Button
				href="/contact?addons={selectedAddons.join(',')}"
				size="lg"
				class="w-full sm:w-auto text-base md:text-lg h-12 md:h-14 px-8"
			>
				Request This Build
			</Button>
		</div>
	</div>
{/if}
