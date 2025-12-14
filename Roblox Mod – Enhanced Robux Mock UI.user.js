// ==UserScript==
// @name         Roblox Mod – Enhanced Robux Mock UI
// @namespace    roblox-mod-mock
// @version      3.0
// @description  Client-side Robux mock page with inventory, shop, and user data
// @match        https://www.roblox.com/*
// @run-at       document-start
// ==/UserScript==
(function () {
  'use strict';
  if (!location.pathname.startsWith('/mod')) return;
  
  // Stop page load
  window.stop();
  document.open();
  
  document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Roblox</title>
<style>
:root {
  --neon: #00f6ff;
  --pink: #ff3df5;
  --purple: #a855f7;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
body {
  background: #02040a;
  color: white;
  overflow-x: hidden;
}
.bg-gradient {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(0,246,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,61,245,0.1) 0%, transparent 40%);
  animation: rotate 20s linear infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes rotate {
  to { transform: rotate(360deg); }
}
header {
  position: relative;
  z-index: 10;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  backdrop-filter: blur(24px);
  background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.logo {
  font-weight: 900;
  font-size: 22px;
  background: linear-gradient(90deg, var(--neon), var(--pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 32px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--neon);
}
.user-name {
  font-weight: 700;
  font-size: 14px;
}
.nav {
  display: flex;
  gap: 24px;
  margin-left: auto;
  margin-right: 32px;
}
.nav-item {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.7;
  font-weight: 600;
}
.nav-item:hover {
  background: rgba(255,255,255,0.1);
  opacity: 1;
}
.nav-item.active {
  background: linear-gradient(90deg, rgba(0,246,255,0.2), rgba(255,61,245,0.2));
  opacity: 1;
}
.currency {
  display: flex;
  gap: 20px;
}
.balance {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s;
}
.balance:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}
.balance span {
  font-weight: 700;
  animation: glow 2.5s infinite alternate;
}
@keyframes glow {
  from { text-shadow: 0 0 8px var(--neon); }
  to { text-shadow: 0 0 20px var(--neon); }
}
main {
  position: relative;
  z-index: 10;
  padding: 48px 32px;
  max-width: 1400px;
  margin: 0 auto;
}
.page {
  display: none;
}
.page.active {
  display: block;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}
.stat-card {
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s;
  cursor: pointer;
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--neon);
}
.stat-label {
  font-size: 13px;
  opacity: 0.7;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(90deg, var(--neon), var(--pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card {
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 24px;
}
.card h2 {
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 800;
}
.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.reward-item {
  padding: 20px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}
.reward-item:hover {
  background: rgba(255,255,255,0.1);
  border-color: var(--neon);
  transform: scale(1.05);
}
.reward-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
.reward-amount {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}
.reward-label {
  font-size: 12px;
  opacity: 0.6;
}
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
.inventory-item {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}
.inventory-item:hover {
  background: rgba(255,255,255,0.1);
  border-color: var(--pink);
  transform: translateY(-4px);
}
.inventory-item.equipped::after {
  content: '✓';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: var(--neon);
  color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 12px;
}
.item-icon {
  font-size: 48px;
  margin-bottom: 8px;
}
.item-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}
.item-rarity {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  margin-top: 4px;
}
.rarity-legendary {
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  color: black;
}
.rarity-epic {
  background: linear-gradient(90deg, var(--purple), var(--pink));
  color: white;
}
.rarity-rare {
  background: linear-gradient(90deg, #4a9eff, var(--neon));
  color: white;
}
.rarity-common {
  background: rgba(255,255,255,0.2);
  color: white;
}
.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
.shop-item {
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  transition: all 0.3s;
}
.shop-item:hover {
  border-color: var(--neon);
  transform: translateY(-8px);
}
.shop-icon {
  font-size: 64px;
  margin-bottom: 12px;
}
.shop-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}
.shop-price {
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(90deg, var(--neon), var(--pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
}
button {
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--neon), var(--pink));
  color: black;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255,61,245,0.5);
}
.btn-small {
  padding: 10px 20px;
  font-size: 14px;
  width: auto;
}
.progress-bar {
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--neon), var(--pink));
  width: 0%;
  transition: width 1s ease;
}
.success-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  padding: 48px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  backdrop-filter: blur(32px);
  text-align: center;
  z-index: 100;
  opacity: 0;
  transition: all 0.4s;
  border: 2px solid var(--neon);
  min-width: 400px;
}
.success-modal.show {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}
.success-icon {
  font-size: 80px;
  margin-bottom: 16px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.overlay.show {
  opacity: 1;
  pointer-events: all;
}
.filter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.filter-tab {
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 14px;
}
.filter-tab:hover {
  background: rgba(255,255,255,0.1);
}
.filter-tab.active {
  background: linear-gradient(90deg, var(--neon), var(--pink));
  color: black;
  border-color: transparent;
}
footer {
  text-align: center;
  padding: 24px;
  font-size: 12px;
  opacity: 0.3;
}
</style>
</head>
<body>
<div class="bg-gradient"></div>
<div class="overlay" id="overlay"></div>

<header>
  <div class="logo">ROBLOX MOD</div>
  <div class="user-info">
    <img class="user-avatar" id="userAvatar" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect fill='%231a1a2e' width='36' height='36'/%3E%3C/svg%3E" alt="Avatar">
    <div class="user-name" id="userName">Loading...</div>
  </div>
  <div class="nav">
    <div class="nav-item active" data-page="dashboard">Dashboard</div>
    <div class="nav-item" data-page="inventory">Inventory</div>
    <div class="nav-item" data-page="shop">Shop</div>
  </div>
  <div class="currency">
    <div class="balance">
      💎 <span id="robuxCount">1,000,000</span>
    </div>
    <div class="balance">
      🎟️ <span id="premiumCount">50,000</span>
    </div>
  </div>
</header>

<main>
  <div class="page active" id="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Earned</div>
        <div class="stat-value" id="totalEarned">2.5M</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Daily Streak</div>
        <div class="stat-value">47</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Level</div>
        <div class="stat-value">99</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Items Owned</div>
        <div class="stat-value" id="itemCount">14</div>
      </div>
    </div>

    <div class="card">
      <h2>Available Rewards</h2>
      <div class="rewards-grid">
        <div class="reward-item" data-reward="100000">
          <div class="reward-icon">💎</div>
          <div class="reward-amount">100K</div>
          <div class="reward-label">Robux</div>
        </div>
        <div class="reward-item" data-reward="250000">
          <div class="reward-icon">💰</div>
          <div class="reward-amount">250K</div>
          <div class="reward-label">Robux</div>
        </div>
        <div class="reward-item" data-reward="500000">
          <div class="reward-icon">👑</div>
          <div class="reward-amount">500K</div>
          <div class="reward-label">Robux</div>
        </div>
        <div class="reward-item" data-reward="1000000">
          <div class="reward-icon">⭐</div>
          <div class="reward-amount">1M</div>
          <div class="reward-label">Robux</div>
        </div>
      </div>
      <button id="claimBtn">Claim Selected Reward</button>
      <div class="progress-bar">
        <div class="progress-fill" id="progressBar"></div>
      </div>
    </div>
  </div>

  <div class="page" id="inventory">
    <div class="card">
      <h2>My Inventory</h2>
      <div class="filter-tabs">
        <div class="filter-tab active" data-filter="all">All Items</div>
        <div class="filter-tab" data-filter="legendary">Legendary</div>
        <div class="filter-tab" data-filter="epic">Epic</div>
        <div class="filter-tab" data-filter="rare">Rare</div>
      </div>
      <div class="inventory-grid" id="inventoryGrid"></div>
    </div>
  </div>

  <div class="page" id="shop">
    <div class="card">
      <h2>Premium Shop</h2>
      <p style="opacity:0.7; margin-bottom:24px">Exclusive items available now</p>
      <div class="shop-grid" id="shopGrid"></div>
    </div>
  </div>
</main>

<div class="success-modal" id="successModal">
  <div class="success-icon">✨</div>
  <h1 id="modalTitle">Reward Claimed!</h1>
  <p id="rewardText">You received 1,000,000 Robux</p>
  <p style="opacity:0.5; margin-top:16px; font-size:13px">(Client-side demo only)</p>
</div>

<footer>Mock UI - For demonstration purposes only</footer>

<script>
(async function() {
  try {
    const response = await fetch('https://users.roblox.com/v1/users/authenticated', {
      credentials: 'include'
    });
    if (response.ok) {
      const data = await response.json();
      document.getElementById('userName').textContent = data.name;
      document.getElementById('userAvatar').src = 
        'https://www.roblox.com/headshot-thumbnail/image?userId=' + data.id + '&width=48&height=48&format=png';
    } else {
      document.getElementById('userName').textContent = 'Guest User';
    }
  } catch (err) {
    document.getElementById('userName').textContent = 'Demo User';
  }
})();

const inventoryItems = [
  { icon: '🗡️', name: 'Legendary Sword', rarity: 'legendary', equipped: true },
  { icon: '🛡️', name: 'Dragon Shield', rarity: 'legendary', equipped: false },
  { icon: '👑', name: 'Royal Crown', rarity: 'legendary', equipped: true },
  { icon: '🎭', name: 'Shadow Mask', rarity: 'epic', equipped: false },
  { icon: '🦅', name: 'Phoenix Wings', rarity: 'epic', equipped: true },
  { icon: '⚡', name: 'Thunder Staff', rarity: 'epic', equipped: false },
  { icon: '💎', name: 'Crystal Amulet', rarity: 'epic', equipped: false },
  { icon: '🔥', name: 'Flame Gauntlets', rarity: 'rare', equipped: false },
  { icon: '❄️', name: 'Frost Boots', rarity: 'rare', equipped: true },
  { icon: '🌟', name: 'Star Cape', rarity: 'rare', equipped: false },
  { icon: '🎯', name: 'Precision Bow', rarity: 'rare', equipped: false },
  { icon: '🏹', name: 'Hunter Arrows', rarity: 'common', equipped: false },
  { icon: '🪓', name: 'Battle Axe', rarity: 'common', equipped: false },
  { icon: '🎪', name: 'Circus Hat', rarity: 'common', equipped: false },
];

const shopItems = [
  { icon: '🐉', name: 'Dragon Pet', price: 500000, rarity: 'legendary' },
  { icon: '🦄', name: 'Unicorn Mount', price: 750000, rarity: 'legendary' },
  { icon: '⚔️', name: 'Dual Katanas', price: 350000, rarity: 'epic' },
  { icon: '🎩', name: 'Magician Hat', price: 200000, rarity: 'epic' },
  { icon: '🌈', name: 'Rainbow Trail', price: 150000, rarity: 'rare' },
  { icon: '💫', name: 'Sparkle Effect', price: 100000, rarity: 'rare' },
  { icon: '🎸', name: 'Rock Guitar', price: 80000, rarity: 'rare' },
  { icon: '🎮', name: 'Gamer Headset', price: 50000, rarity: 'common' },
];

let selectedReward = 1000000;
let robuxBalance = 1000000;
let totalEarned = 2500000;
let currentFilter = 'all';

function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  const filtered = currentFilter === 'all' 
    ? inventoryItems 
    : inventoryItems.filter(item => item.rarity === currentFilter);
  
  grid.innerHTML = filtered.map((item, idx) => {
    const realIdx = inventoryItems.indexOf(item);
    return '<div class="inventory-item ' + (item.equipped ? 'equipped' : '') + '" data-idx="' + realIdx + '">' +
      '<div class="item-icon">' + item.icon + '</div>' +
      '<div class="item-name">' + item.name + '</div>' +
      '<span class="item-rarity rarity-' + item.rarity + '">' + item.rarity.toUpperCase() + '</span>' +
    '</div>';
  }).join('');

  document.querySelectorAll('.inventory-item').forEach(item => {
    item.addEventListener('click', function() {
      const idx = parseInt(this.dataset.idx);
      inventoryItems[idx].equipped = !inventoryItems[idx].equipped;
      renderInventory();
      showModal('🎭', 'Item ' + (inventoryItems[idx].equipped ? 'Equipped' : 'Unequipped'), 
        inventoryItems[idx].name);
    });
  });
}

function renderShop() {
  const grid = document.getElementById('shopGrid');
  grid.innerHTML = shopItems.map((item, idx) => {
    return '<div class="shop-item">' +
      '<div class="shop-icon">' + item.icon + '</div>' +
      '<div class="shop-name">' + item.name + '</div>' +
      '<div class="shop-price">💎 ' + (item.price / 1000).toFixed(0) + 'K</div>' +
      '<span class="item-rarity rarity-' + item.rarity + '">' + item.rarity.toUpperCase() + '</span>' +
      '<button class="btn-small" data-idx="' + idx + '" style="margin-top:12px">Purchase</button>' +
    '</div>';
  }).join('');

  document.querySelectorAll('.shop-item button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      const item = shopItems[idx];
      if (robuxBalance >= item.price) {
        robuxBalance -= item.price;
        document.getElementById('robuxCount').textContent = robuxBalance.toLocaleString();
        inventoryItems.push({icon: item.icon, name: item.name, rarity: item.rarity, equipped: false});
        document.getElementById('itemCount').textContent = inventoryItems.length;
        showModal('✅', 'Purchase Successful!', 'You bought ' + item.name);
      } else {
        showModal('❌', 'Insufficient Funds', 'You need more Robux!');
      }
    });
  });
}

function showModal(icon, title, text) {
  const modal = document.getElementById('successModal');
  const overlay = document.getElementById('overlay');
  document.querySelector('.success-icon').textContent = icon;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('rewardText').textContent = text;
  overlay.classList.add('show');
  modal.classList.add('show');
}

renderInventory();
renderShop();
document.getElementById('itemCount').textContent = inventoryItems.length;

document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.filter;
    renderInventory();
  });
});

document.querySelectorAll('.reward-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.reward-item').forEach(i => {
      i.style.background = 'rgba(255,255,255,0.05)';
      i.style.borderColor = 'rgba(255,255,255,0.1)';
    });
    this.style.background = 'rgba(0,246,255,0.15)';
    this.style.borderColor = 'var(--neon)';
    selectedReward = parseInt(this.dataset.reward);
  });
});

document.getElementById('claimBtn').addEventListener('click', function() {
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = '100%';
  
  setTimeout(() => {
    robuxBalance += selectedReward;
    totalEarned += selectedReward;
    document.getElementById('robuxCount').textContent = robuxBalance.toLocaleString();
    document.getElementById('totalEarned').textContent = (totalEarned / 1000000).toFixed(1) + 'M';
    showModal('✨', 'Reward Claimed!', 'You received ' + selectedReward.toLocaleString() + ' Robux!');
    progressBar.style.width = '0%';
  }, 1000);
});

document.getElementById('overlay').addEventListener('click', function() {
  this.classList.remove('show');
  document.getElementById('successModal').classList.remove('show');
});

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    const page = this.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
  });
});

document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const value = this.querySelector('.stat-value');
    value.style.transform = 'scale(1.1)';
    value.style.transition = 'transform 0.3s';
  });
  card.addEventListener('mouseleave', function() {
    const value = this.querySelector('.stat-value');
    value.style.transform = 'scale(1)';
  });
});
</script>
</body>
</html>`);
  
  document.close();
})();