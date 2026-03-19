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

	btn.classList.add('copied');
	setTimeout(() => btn.classList.remove('copied'), 1500);
}

/* ─── MOUSE PARALLAX ON ORBS ─────────────────────────── */
window.addEventListener('mousemove', (e) => {
	const x = (e.clientX / window.innerWidth - 0.5) * 30;
	const y = (e.clientY / window.innerHeight - 0.5) * 30;
	document.querySelector('.orb-1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
	document.querySelector('.orb-2').style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
	document.querySelector('.orb-3').style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
});

// ── Floating Code Particles ──────────────────────────
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const keywords = [
	'Library',
	'*** Settings ***',
	'*** Test Cases ***',
	'*** Keywords ***',
	'Suite Setup',
	'Suite Teardown',
	'${result}',
	'${response}',
	'${status}',
	'${expected}',
	'Log',
	'Should Be Equal',
	'Should Contain',
	'Run Keyword',
	'FOR',
	'IF',
	'ELSE',
	'Create Dictionary',
	'Create List',
	'Click Element',
	'Input Text',
	'Get Text',
	'Wait Until',
	'GET On Session',
	'POST On Session',
	'Status Code',
	'SeleniumLibrary',
	'RequestsLibrary',
	'Collections',
];

const colors = [
	'rgba(10,132,255,', // blue
	'rgba(50,210,243,', // cyan
	'rgba(191,90,242,', // purple
	'rgba(48,209,88,', // mint
	'rgba(255,159,10,', // orange
	'rgba(255, 255, 255,',
];

let particles = [];

function spawn() {
	particles.push({
		x: Math.random() * canvas.width,
		y: canvas.height + 20,
		text: keywords[Math.floor(Math.random() * keywords.length)],
		color: colors[Math.floor(Math.random() * colors.length)],
		speed: 0.5 + Math.random() * 0.35,
		opacity: 0,
		maxOpacity: 0.08 + Math.random() * 0.14,
		size: 10 + Math.random() * 3,
		drift: (Math.random() - 0.5) * 0.15,
		phase: Math.random() * Math.PI * 2,
	});
}

// pre-scatter particles across screen on load
for (let i = 0; i < 25; i++) {
	spawn();
	const p = particles[particles.length - 1];
	p.y = Math.random() * canvas.height;
	p.opacity = Math.random() * p.maxOpacity;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];

		p.y -= p.speed;
		p.x += p.drift + Math.sin(p.phase + p.y * 0.008) * 0.12;

		// fade in
		if (p.opacity < p.maxOpacity) p.opacity += 0.0015;
		// fade out near top
		if (p.y < canvas.height * 0.15) p.opacity -= 0.003;

		if (p.opacity <= 0 && p.y < canvas.height * 0.15) {
			particles.splice(i, 1);
			continue;
		}

		ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
		ctx.fillStyle = p.color + Math.max(0, p.opacity) + ')';
		ctx.fillText(p.text, p.x, p.y);
	}

	// maintain ~30 particles
	if (particles.length < 30 && Math.random() > 0.94) spawn();

	requestAnimationFrame(draw);
}

draw();

