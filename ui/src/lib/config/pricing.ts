export const basePlan = {
	name: "Core Foundation",
	price: 1500,
	displayPrice: "$1,500",
	description:
		"The essential building blocks for a high-performance web presence.",
	features: [
		"Custom Project Architecture",
		"Up to 5 Core Pages",
		"Mobile-Responsive Design",
		"Basic Technical SEO",
		"Speed & Performance Optimization",
		"Launch & Deployment",
	],
};

export const addOns = [
	{
		id: "ecommerce",
		name: "E-Commerce Module",
		price: 750,
		displayPrice: "+ $750",
		type: "one-time",
		description: "Full shopping experience with secure payments.",
		features: [
			"Stripe/PayPal Integration",
			"Shopping Cart & Checkout",
			"Product Catalog",
		],
	},
	{
		id: "cms",
		name: "Content Management",
		price: 300,
		displayPrice: "+ $300",
		type: "one-time",
		description: "Take control of your content without coding.",
		features: [
			"Headless CMS Setup",
			"Custom Content Types",
			"Editor Training",
		],
	},
	{
		id: "auth",
		name: "User Authentication",
		price: 500,
		displayPrice: "+ $500",
		type: "one-time",
		description: "Secure login and user-specific features.",
		features: [
			"Login / Sign Up",
			"Password Reset Flow",
			"Protected Routes",
		],
	},
	{
		id: "maintenance",
		name: "Maintenance Retainer",
		price: 200,
		displayPrice: "$200 / mo",
		type: "recurring",
		description: "Peace of mind for your live application.",
		features: [
			"Hosting Management",
			"Security Updates",
			"Minor Edits (2hrs/mo)",
		],
	},
];
