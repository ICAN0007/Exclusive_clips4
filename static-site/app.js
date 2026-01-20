// ========================================
// EXCLUSIVE CONTENT - MAIN JAVASCRIPT
// ========================================

let videosData = [];
let categories = [];
let selectedCategory = 'All';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

// Load JSON data
async function loadData() {
  try {
    const response = await fetch('videos.json');
    const data = await response.json();
    videosData = data.videos;
    categories = data.categories;
    
    renderCategories();
    renderVideos();
    renderRecommended();
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

// Render recommended videos
function renderRecommended() {
  const container = document.getElementById('recommendedGrid');
  
  // Shuffle videos for recommendations
  const shuffled = [...videosData].sort(() => Math.random() - 0.5);
  
  container.innerHTML = shuffled.map(video => `
    <div class="video-card-wrapper">
      <div class="recommended-badge">✨ Recommended</div>
      ${createVideoCard(video)}
    </div>
  `).join('');
}

// Create video card HTML
function createVideoCard(video) {
  return `
    <div class="video-card" onclick="openVideo('${video.id}')">
      <div class="video-thumb">
        <img src="${video.thumb}" alt="${video.title}" loading="lazy">
        <span class="video-duration">${formatDuration(video.duration)}</span>
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
  let debounceTimer;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderVideos(e.target.value);
    }, 300);
  });
}

// Open video modal
function openVideo(videoId) {
  const video = videosData.find(v => v.id === videoId);
  if (!video) return;
  
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const videoTitle = document.getElementById('videoTitle');
  const videoDuration = document.getElementById('videoDuration');
  const videoViews = document.getElementById('videoViews');
  const videoTags = document.getElementById('videoTags');
  
  videoFrame.src = video.src;
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
  const videoFrame = document.getElementById('videoFrame');
  
  modal.classList.remove('active');
  videoFrame.src = '';
  document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Scroll to videos section
function scrollToVideos() {
  document.getElementById('videos-section').scrollIntoView({ 
    behavior: 'smooth' 
  });
}
