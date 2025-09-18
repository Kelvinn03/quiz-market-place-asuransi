// ===== Core utilities (no frameworks) =====
const ls = {
  get(k, fb=null){ try{ const v = localStorage.getItem(k); return v?JSON.parse(v):fb }catch{ return fb } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) },
  del(k){ localStorage.removeItem(k) }
};

const fmt = {
  money(n){ return new Intl.NumberFormat('id-ID',{ style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(n||0); },
  date(d){ return new Date(d).toLocaleDateString('id-ID',{ year:'numeric', month:'short', day:'numeric' }); }
};

const validators = {
  email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  password:v=>typeof v==='string' && v.length>=8,
  name:v=>/^[A-Za-zÀ-ÿ ]{3,32}$/.test(v),
  phone:v=>/^08\d{8,14}$/.test(v),
  plate:v=>/^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{0,3}$/i.test(v),
};

// Premium math used by buy pages
const calc = {
  carPremium(price, year){
    const age = Math.max(0, new Date().getFullYear() - Number(year));
    if (age <= 3) return 0.025 * price;
    if (age <= 5) return price < 200_000_000 ? 0.04 * price : 0.03 * price;
    return 0.05 * price;
  },
  healthPremium(dob, smoke, htn, dm){
    const P = 2_000_000;
    const age = Math.floor((Date.now() - new Date(dob)) / (365.25*24*3600*1000));
    let m = 0.1;
    if (age > 50) m = 0.4; else if (age > 35) m = 0.25; else if (age > 20) m = 0.2;
    const k1 = smoke?1:0, k2 = htn?1:0, k3 = dm?1:0;
    return P + (m*P) + (k1*0.5*P) + (k2*0.4*P) + (k3*0.5*P);
  },
  lifeMonthly(dob, coverage){
    const age = Math.floor((Date.now() - new Date(dob)) / (365.25*24*3600*1000));
    let m = 0.002;
    if (age > 50) m = 0.01; else if (age > 30) m = 0.004;
    return m * Number(coverage);
  }
};

// ===== Home product cards =====
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
