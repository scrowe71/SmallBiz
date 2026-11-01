document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
}

// Without JavaScript, the form still posts directly to the existing Formspree endpoint.
const form = document.querySelector('#quote-form');
if (form) form.addEventListener('submit', async event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  submit.textContent = 'Sending…';
  status.textContent = '';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(form.action, {method: 'POST', body: new FormData(form), headers: {'Accept': 'application/json'}, signal: controller.signal});
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    status.textContent = 'Thank you. Your request has been sent. Someone will reach out to you soon.';
  } catch {
    status.textContent = 'We couldn’t confirm your request was sent. Your details are still here. Please try again or email info@smallbizdigitalsolutions.com.';
  } finally {
    clearTimeout(timeout);
    submit.disabled = false;
    submit.textContent = 'Send request';
  }
});
