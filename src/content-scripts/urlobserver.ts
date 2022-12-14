
export default function urlChangeHook(callback: (url: string) => void) {
	let previousUrl = '';
	const observer = new MutationObserver(() => {
		if (location.href !== previousUrl) {
			previousUrl = location.href;
			callback(location.href);
		}
	});
	const config = {subtree: true, childList: true};
	observer.observe(document, config);
}
