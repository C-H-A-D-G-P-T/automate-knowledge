/* ─── SCROLL REVEAL ──────────────────────────────────── */
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

/* ─── TAB SWITCHING ──────────────────────────────────── */
function switchTab(btn, panelId) {
	document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
	document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
	btn.classList.add('active');
	document.getElementById(panelId).classList.add('active');
}

/* ─── CODE FILTER ──────────────────────────────────── */
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.code-card');

// ✅ set default filter = ui
const defaultFilter = 'ui';

// set active ปุ่ม default
filterButtons.forEach((btn) => {
	if (btn.dataset.filter === defaultFilter) {
		btn.classList.add('active');
	} else {
		btn.classList.remove('active');
	}
});

// filter ตอนโหลดหน้า
applyFilter(defaultFilter);

// click event
filterButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		filterButtons.forEach((b) => b.classList.remove('active'));
		btn.classList.add('active');

		const filter = btn.dataset.filter;
		applyFilter(filter);
	});
});

// function filter
function applyFilter(filter) {
	const cards = document.querySelectorAll('.code-card');

	cards.forEach((card) => {
		const category = card.dataset.category;

		if (category === filter) {
			card.style.display = 'block';

			// 👉 load code ตอนแสดง
			const codeBlock = card.querySelector('code[data-src]');
			if (codeBlock) loadCode(codeBlock);
		} else {
			card.style.display = 'none';
		}
	});
}

/* ─── LOAD CODE ──────────────────────────────────────── */
async function loadCode(block) {
	const file = block.getAttribute('data-src');

	if (!file || block.dataset.loaded) return;

	try {
		const res = await fetch(file);
		const text = await res.text();

		block.textContent = text;
		block.dataset.loaded = 'true'; // กันโหลดซ้ำ
	} catch (err) {
		block.textContent = 'Failed to load code.';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('code[data-src]').forEach(loadCode);
});

/* ─── COPY CODE ──────────────────────────────────────── */
function copyCodeBlock(btn) {
	const code = btn.parentElement.nextElementSibling.innerText;

	navigator.clipboard.writeText(code);
	btn.textContent = 'Copied!';

	setTimeout(() => {
		btn.textContent = 'Copy';
	}, 1500);
}

/* ─── MOUSE PARALLAX ON ORBS ─────────────────────────── */
window.addEventListener('mousemove', (e) => {
	const x = (e.clientX / window.innerWidth - 0.5) * 30;
	const y = (e.clientY / window.innerHeight - 0.5) * 30;
	document.querySelector('.orb-1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
	document.querySelector('.orb-2').style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
	document.querySelector('.orb-3').style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
});
