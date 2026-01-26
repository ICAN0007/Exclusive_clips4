// ========================================
// EXCLUSIVECLIPS4 - MAIN JAVASCRIPT
// ========================================

let videosData = [];
let categories = [];
let selectedCategory = 'All';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  setupAgeGate();
  loadData();
  setupMobileMenu();
});

// Age Gate functionality
function setupAgeGate() {
  const overlay = document.getElementById('ageGateOverlay');
  const enterBtn = document.getElementById('enterSiteBtn');
  
  // Check if user already verified
  const isVerified = localStorage.getItem('ageVerified');
  
  if (isVerified) {
    overlay.classList.add('hidden');
  } else {
    document.body.classList.add('no-scroll');
  }
  
  enterBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    overlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  });
}

// Load JSON data
async function loadData() {
  try {
    const response = await fetch('videos.json');
    const data = await response.json();
    videosData = data.videos;
    categories = data.categories;
    
    renderCategories();
    renderVideos();
    setupSearch();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Format duration from seconds to MM:SS
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Render categories
function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = categories.map(cat => `
    <button class="category-tag ${cat === selectedCategory ? 'active' : ''}" 
            onclick="selectCategory('${cat}')">
      ${cat}
    </button>
  `).join('');
}

// Select category
function selectCategory(category) {
  selectedCategory = category;
  renderCategories();
  renderVideos();
}

// Render video grid
function renderVideos(searchQuery = '') {
  const container = document.getElementById('videoGrid');
  
  let filtered = videosData;
  
  // Filter by category
  if (selectedCategory !== 'All') {
    filtered = filtered.filter(v => 
      v.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  }
  
  // Filter by search
  if (searchQuery) {
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="no-videos">No videos found matching your search.</div>';
    return;
  }
  
  container.innerHTML = filtered.map(video => createVideoCard(video)).join('');
}


// Create video card HTML
function createVideoCard(video) {
  return `
    <div class="video-card" onclick="openVideo('${video.id}')">
      <div class="video-thumb">
        <img src="${video.thumb}" alt="${video.title}" loading="lazy">
        <span class="video-duration">${formatDuration(video.duration)}</span>
        <div class="play-button-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <div class="video-overlay">
        <h3 class="video-card-title">${video.title}</h3>
        <p class="video-card-views">${video.views} views</p>
      </div>
    </div>
  `;
}

// Setup search
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  let debounceTimer;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderVideos(e.target.value);
    }, 300);
  });

  // Mobile search button
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchBox = document.querySelector('.search-box');
      searchBox.classList.toggle('mobile-visible');
      if (searchBox.classList.contains('mobile-visible')) {
        searchInput.focus();
      }
    });
  }
}

// Setup mobile menu
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', closeMobileMenu);
    
    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// Open video modal with Bunny.net responsive embed
function openVideo(videoId) {
  const video = videosData.find(v => v.id === videoId);
  if (!video) return;
  
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  const videoTitle = document.getElementById('videoTitle');
  const videoDuration = document.getElementById('videoDuration');
  const videoViews = document.getElementById('videoViews');
  const videoTags = document.getElementById('videoTags');
  
  // Create fullscreen Bunny.net embed
  videoContainer.innerHTML = `
    <iframe 
      src="${video.src}" 
      loading="lazy" 
      style="border:0;width:100%;height:100%;background:#000000;" 
      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
      allowfullscreen="true">
    </iframe>
  `;
  
  videoTitle.textContent = video.title;
  videoDuration.textContent = `Duration: ${formatDuration(video.duration)}`;
  videoViews.textContent = `${video.views} views`;
  videoTags.innerHTML = video.tags.map(tag => 
    `<span class="video-tag">${tag}</span>`
  ).join('');
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close video modal
function closeModal() {
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  
  modal.classList.remove('active');
  videoContainer.innerHTML = ''; // Stop video playback
  document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeMobileMenu();
  }
});

// Scroll to videos section
function scrollToVideos() {
  document.getElementById('videos-section').scrollIntoView({ 
    behavior: 'smooth' 
  });
}