// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add('visible');
				observer.unobserve(e.target);
			}
		});
	},
	{ threshold: 0.1 },
);
reveals.forEach((r) => observer.observe(r));

// Tab switching
function switchTab(btn, panelId) {
	document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
	document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
	btn.classList.add('active');
	document.getElementById(panelId).classList.add('active');
}

// Copy code
function copyCode(btn) {
	const block = btn.closest('.code-block');
	const text = [...block.querySelectorAll('div')].map((d) => d.innerText).join('\n');
	navigator.clipboard.writeText(text).then(() => {
		btn.textContent = '✓ Copied';
		setTimeout(() => (btn.textContent = 'Copy'), 2000);
	});
}

// Smooth parallax on orbs
window.addEventListener('mousemove', (e) => {
	const x = (e.clientX / window.innerWidth - 0.5) * 30;
	const y = (e.clientY / window.innerHeight - 0.5) * 30;
	document.querySelector('.orb-1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
	document.querySelector('.orb-2').style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
	document.querySelector('.orb-3').style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
});
