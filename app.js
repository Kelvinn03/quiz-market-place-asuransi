// Tiny helpers
const PRODUCTS = [
  { id:'health', type:'Health', name:'Care+ Health', cov:'Inpatient & Outpatient', blurb:'From Rp 2.0jt / year', href:'product-health.html' },
  { id:'auto',   type:'Auto',   name:'DriveGuard',   cov:'All Risk + TLO',        blurb:'Age & price based premium', href:'product-auto.html' },
  { id:'life',   type:'Life',   name:'LifeShield',   cov:'Coverage up to Rp10M',  blurb:'Age & sum assured based', href:'product-life.html' }
];

function renderProducts(sel){
  const root = document.querySelector(sel);
  if(!root) return;
  root.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <img class="cover" src="assets/sample.jpg" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="small muted">${p.type} • ${p.cov}</p>
      <div class="meta"><span class="badge">Marketplace</span><strong>${p.blurb}</strong></div>
      <div style="margin-top:10px"><a class="btn" href="${p.href}">View details</a></div>
    </article>
  `).join('');
}
