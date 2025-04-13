
document.addEventListener('DOMContentLoaded', function() {
  const contentContainer = document.querySelector('.content-container');
  const content = document.getElementById('zoomContent');
  const ayatOverlay = document.getElementById('ayatOverlay');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const resetBtn = document.getElementById('resetZoom');
  const zoomLevelDisplay = document.getElementById('zoomLevel');
  const zoomMsg = document.getElementById('zoomMsg');
  const ayatTooltip = document.getElementById('ayatTooltip');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageIndicator = document.getElementById('pageIndicator');
  
  let currentZoom = 1;
  const zoomFactor = 0.1;
  const minZoom = 0.5;
  const maxZoom = 3;
  
  // For panning
  let isDragging = false;
  let startX, startY;
  let translateX = 0;
  let translateY = 0;
  let lastTranslateX = 0;
  let lastTranslateY = 0;
  
  // For page navigation
  let currentPage = 1;
  const totalPages = 605; // Set this to your total number of pages
  
  // Ayat data for each page
  // const pageAyatData = {
  //   1: [
  //     { id: "surat1-bismillah", surah: 1, ayat: 0, top: 29, left: 25, width: 47, height: 5, title: "Surah Al-Fatiha, Bismillah" },

  //     { id: "surat1-ayat1", surah: 1, ayat: 1, top: 35, left: 38, width: 38, height: 5, title: "Surah Al-Fatiha, Ayat 1" },

  //     { 
  //       id: "surat1-ayat2", 
  //       surah: 1, 
  //       ayat: 2, 
  //       title: "Surah Al-Fatiha, Ayat 2",
  //       lines: [
  //         { id: "surat1-ayat2-line1", top: 35, left: 21, width: 11, height: 5 },
  //         { id: "surat1-ayat2-line2", top: 40, left: 63, width: 13, height: 6 }
  //       ]
  //     },

  //     { id: "surat1-ayat3", surah: 1, ayat: 3, top: 40, left: 28, width: 29, height: 6, title: "Surah Al-Fatiha, Ayat 3" },

  //     { id: "surat1-ayat4", surah: 1, ayat: 4, top: 46, left: 27, width: 49, height: 6, title: "Surah Al-Fatiha, Ayat 4" },


  //     { id: "surat1-ayat5", surah: 1, ayat: 5, top: 52, left: 38, width: 38, height: 6, title: "Surah Al-Fatiha, Ayat 5" },


  //     { 
  //       id: "surat1-ayat6", 
  //       surah: 1, 
  //       ayat: 6, 
  //       title: "Surah Al-Fatiha, Ayat 6",
  //       lines: [
  //         { id: "surat1-ayat6-line1", top: 51, left: 21, width: 12, height: 6 },
  //         { id: "surat1-ayat6-line2", top: 57, left: 21, width: 55, height: 6 },
  //         { id: "surat1-ayat6-line3", top: 63, left: 36, width: 31, height: 6 }
  //       ]
  //     },
  //     // Add more ayat for page 1
  //   ],
  //   2: [
  //     { id: "page2-ayat1", surah: 1, ayat: 5, top: 20, left: 30, width: 40, height: 5, title: "Surah Al-Fatiha, Ayat 5" },
  //     { id: "page2-ayat2", surah: 1, ayat: 6, top: 35, left: 25, width: 50, height: 5, title: "Surah Al-Fatiha, Ayat 6" }
  //     // Add more ayat for page 2
  //   ],
  //   3: [
  //     { id: "page3-ayat1", surah: 2, ayat: 1, top: 15, left: 35, width: 30, height: 5, title: "Surah Al-Baqarah, Ayat 1" },
  //     { id: "page3-ayat2", surah: 2, ayat: 2, top: 25, left: 20, width: 60, height: 5, title: "Surah Al-Baqarah, Ayat 2" },
  //     { id: "page3-ayat3", surah: 2, ayat: 3, top: 40, left: 15, width: 70, height: 5, title: "Surah Al-Baqarah, Ayat 3" }
  //     // Add more ayat for page 3
  //   ],
  //   4: [
  //     { id: "page4-ayat1", surah: 2, ayat: 4, top: 10, left: 25, width: 50, height: 5, title: "Surah Al-Baqarah, Ayat 4" },
  //     { id: "page4-ayat2", surah: 2, ayat: 5, top: 20, left: 20, width: 60, height: 5, title: "Surah Al-Baqarah, Ayat 5" }
  //     // Add more ayat for page 4
  //   ],
  //   5: [
  //     { id: "page5-ayat1", surah: 2, ayat: 6, top: 15, left: 30, width: 40, height: 5, title: "Surah Al-Baqarah, Ayat 6" },
  //     { id: "page5-ayat2", surah: 2, ayat: 7, top: 30, left: 25, width: 50, height: 5, title: "Surah Al-Baqarah, Ayat 7" },
  //     { id: "page5-ayat3", surah: 2, ayat: 8, top: 45, left: 20, width: 60, height: 5, title: "Surah Al-Baqarah, Ayat 8" }
  //     // Add more ayat for page 5
  //   ]
  // };


     // For toggling controls
const topNav = document.getElementById('topNav');
const audioPlayer = document.getElementById('audioPlayer');
let controlsVisible = false;

// Toggle controls on content click
content.addEventListener('click', function(e) {
// Only toggle if clicking directly on the content, not on ayat boxes
if (e.target === content) {
  controlsVisible = !controlsVisible;
  
  // Toggle visibility classes
  contentContainer.classList.toggle('controls-visible', controlsVisible);
  
  // No auto-hide - controls will stay visible until clicked again
}
});

// Handle Go to Page button
document.getElementById('gotoPageBtn').addEventListener('click', function() {
const pageInput = document.getElementById('pageNumberInput');
const pageNumber = parseInt(pageInput.value);

if (pageNumber && pageNumber >= 1 && pageNumber <= totalPages) {
  currentPage = pageNumber;
  loadPage(currentPage);
  pageInput.value = '';
} else {
  // Show error message
  alert("Error: Page not found. Please enter a valid page number between 1 and " + totalPages);
}
});

// Also allow Enter key in the input field
document.getElementById('pageNumberInput').addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
  document.getElementById('gotoPageBtn').click();
}
});

  // gotopage data-page from the index.html

  function loadPage(page) {
    console.log("Loading page", page);
    // Your actual logic to render the page
  }

  window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"));
    if (!isNaN(page)) {
      currentPage = page;
      loadPage(currentPage);
    } else {
      loadPage(1); // default page if none is given
    }
  };
  
    
    function updateZoom() {
      // Apply the same transformation to both content and overlay to keep them in sync
      content.style.transform = `scale(${currentZoom}) translate(${translateX / currentZoom}px, ${translateY / currentZoom}px)`;
      
      zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
      
      // Disable buttons if at min/max zoom
      zoomOutBtn.disabled = currentZoom <= minZoom;
      zoomInBtn.disabled = currentZoom >= maxZoom;
      
      // Visual indication of disabled state
      zoomOutBtn.style.opacity = currentZoom <= minZoom ? 0.5 : 1;
      zoomInBtn.style.opacity = currentZoom >= maxZoom ? 0.5 : 1;
      
      // Show message when zoomed in
      if (currentZoom > 1) {
        zoomMsg.style.opacity = 0.7;
        setTimeout(() => {
          zoomMsg.style.opacity = 0;
        }, 2000);
      } else {
        zoomMsg.style.opacity = 0;
        // Reset translation when back to normal zoom
        translateX = 0;
        translateY = 0;
      }
    }


    function loadPage(pageNumber) {
      // Update the background image
      content.style.backgroundImage = `url('/Assets/Quran_image/${pageNumber}.jpg')`;
      
      // Update page indicator
      // pageIndicator.textContent = `Page ${pageNumber}`;
      
      // Clear existing ayat boxes
      ayatOverlay.innerHTML = '';
      
      // Load new ayat boxes for this page
      if (pageAyatData[pageNumber]) {
        pageAyatData[pageNumber].forEach(ayat => {
          // Check if this is a multi-line ayat
          if (ayat.lines) {
            // Create boxes for each line of the ayat
            ayat.lines.forEach(line => {
              const box = document.createElement('div');
              box.id = line.id;
              box.className = 'ayat-box';
              box.dataset.ayat = `${ayat.surah}:${ayat.ayat}`;
              box.dataset.parentId = ayat.id; // Link to parent ayat
              box.title = ayat.title;
              box.style.top = `${line.top}%`;
              box.style.left = `${line.left}%`;
              box.style.width = `${line.width}%`;
              box.style.height = `${line.height}%`;
              
              // Add event listeners
              setupAyatBoxEvents(box);
              
              ayatOverlay.appendChild(box);
            });
          } else {
            // Single line ayat - create one box
            const box = document.createElement('div');
            box.id = ayat.id;
            box.className = 'ayat-box';
            box.dataset.ayat = `${ayat.surah}:${ayat.ayat}`;
            box.title = ayat.title;
            box.style.top = `${ayat.top}%`;
            box.style.left = `${ayat.left}%`;
            box.style.width = `${ayat.width}%`;
            box.style.height = `${ayat.height}%`;
            
            // Add event listeners
            setupAyatBoxEvents(box);
            
            ayatOverlay.appendChild(box);
          }
        });
      }
      
      // Reset zoom and position
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateZoom();
      
      // Update navigation button states
      prevBtn.disabled = pageNumber >= totalPages;
      prevBtn.style.opacity = pageNumber >= totalPages ? 0.5 : 1;
      nextBtn.disabled = pageNumber <= 1;
      nextBtn.style.opacity = pageNumber <= 1 ? 0.5 : 1;
    }
    
    function setupAyatBoxEvents(box) {
      // Show tooltip on hover
      box.addEventListener('mouseenter', (e) => {
        ayatTooltip.textContent = e.target.getAttribute('title');
        ayatTooltip.style.opacity = 1;
        
        // Position tooltip near the ayat box
        const rect = e.target.getBoundingClientRect();
        ayatTooltip.style.top = `${rect.top - 30}px`;
        ayatTooltip.style.left = `${rect.left + rect.width/2 - ayatTooltip.offsetWidth/2}px`;
      });
      
      box.addEventListener('mouseleave', () => {
        ayatTooltip.style.opacity = 0;
      });
      
      // Handle click on ayat
      box.addEventListener('click', (e) => {
        // Toggle controls visibility
        controlsVisible = !controlsVisible;
        contentContainer.classList.toggle('controls-visible', controlsVisible);
      });
      
      // Add long press for audio playback
      box.addEventListener('mousedown', (e) => {
        if (longPressTimer) clearTimeout(longPressTimer);
        
        longPressTimer = setTimeout(() => {
          const ayatData = e.target.dataset.ayat.split(':');
          const surah = ayatData[0];
          const ayat = ayatData[1];
          
          // Play the corresponding audio
          playAyatAudio(surah, ayat);
          
          // Show visual feedback for all parts of this ayat
          document.querySelectorAll(`.ayat-box[data-ayat="${surah}:${ayat}"]`).forEach(b => {
            b.classList.add('active');
          });
          
        }, 800); // Reduced to 0.8 seconds for better responsiveness
      });
      
      box.addEventListener('mouseup', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
      });
      
      box.addEventListener('mouseleave', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
      });
      
      // Touch events for mobile
      box.addEventListener('touchstart', (e) => {
        // Prevent default to avoid scrolling/zooming
        e.preventDefault();
        
        // Toggle controls on tap (short touch)
        controlsVisible = !controlsVisible;
        contentContainer.classList.toggle('controls-visible', controlsVisible);
        
        // Set up long press timer
        if (longPressTimer) clearTimeout(longPressTimer);
        
        longPressTimer = setTimeout(() => {
          const ayatData = e.target.dataset.ayat.split(':');
          const surah = ayatData[0];
          const ayat = ayatData[1];
          
          // Play the corresponding audio
          playAyatAudio(surah, ayat);
          
          // Show visual feedback
          e.target.style.backgroundColor = 'rgba(255, 204, 0, 0.4)';
          setTimeout(() => {
            e.target.style.backgroundColor = '';
          }, 500);
          
        }, 1500); // 1.5 seconds long press
      }, { passive: false });
      
      box.addEventListener('touchend', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
      });
      
      box.addEventListener('touchcancel', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
      });
    }
    
    zoomInBtn.addEventListener('click', function() {
      if (currentZoom < maxZoom) {
        currentZoom = Math.min(currentZoom + zoomFactor, maxZoom);
        updateZoom();
      }
    });
    
    zoomOutBtn.addEventListener('click', function() {
      if (currentZoom > minZoom) {
        currentZoom = Math.max(currentZoom - zoomFactor, minZoom);
        updateZoom();
      }
    });
    
    resetBtn.addEventListener('click', function() {
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateZoom();
    });
    
    // Page navigation
    prevBtn.addEventListener('click', function() {
      if (currentPage < totalPages) {
        // Go to next page (matches right swipe)
        currentPage++;
        loadPage(currentPage);
      }
    });
    
    nextBtn.addEventListener('click', function() {
      if (currentPage > 1) {
        // Go to previous page (matches left swipe)
        currentPage--;
        loadPage(currentPage);
      }
    });
    
    // Mouse events for dragging/panning
    content.addEventListener('mousedown', function(e) {
      if (e.target === content || e.target === ayatOverlay || e.target.classList.contains('ayat-box')) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        content.style.cursor = 'grabbing';
        
        // If clicking on ayat box, prevent default to avoid text selection
        if (e.target.classList.contains('ayat-box')) {
          e.preventDefault();
        }
      }
    });
    
    document.addEventListener('mousemove', function(e) {
if (!isDragging) return;

translateX = e.clientX - startX;
translateY = e.clientY - startY;

// Calculate the boundaries based on the content size and zoom level
const contentRect = content.getBoundingClientRect();
const containerRect = contentContainer.getBoundingClientRect();

// Calculate the maximum allowed translation to keep content within view
const maxTranslateX = Math.max(0, (contentRect.width - containerRect.width) / 2) / currentZoom;
const maxTranslateY = Math.max(0, (contentRect.height - containerRect.height) / 2) / currentZoom;

// Constrain the translation
translateX = Math.min(Math.max(translateX, -maxTranslateX * currentZoom), maxTranslateX * currentZoom);
translateY = Math.min(Math.max(translateY, -maxTranslateY * currentZoom), maxTranslateY * currentZoom);

content.style.transform = `scale(${currentZoom}) translate(${translateX / currentZoom}px, ${translateY / currentZoom}px)`;
});
    
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        content.style.cursor = 'grab';
        lastTranslateX = translateX;
        lastTranslateY = translateY;
      }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let minSwipeDistance = 50; // Minimum distance for a swipe to be registered
    let isSwipe = false; // Flag to distinguish between swipe and pan
    
    content.addEventListener('touchstart', function(e) {
      // Record the starting position for both swipe and pan
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwipe = false; // Reset swipe flag
      
      if (e.touches.length === 1 && (e.target === content || e.target === ayatOverlay || e.target.classList.contains('ayat-box'))) {
        isDragging = true;
        startX = touchStartX - translateX;
        startY = touchStartY - translateY;
        
        // If touching on ayat box, prevent default to avoid text selection
        if (e.target.classList.contains('ayat-box')) {
          e.preventDefault();
        }
      } else if (e.touches.length === 2) {
        // Handle pinch zoom
        e.preventDefault();
        initialDistance = getDistance(e.touches);
        initialZoom = currentZoom;
      }
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
      // Update end position for swipe detection
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
      
      // Calculate horizontal and vertical distance moved
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // If horizontal movement is significantly greater than vertical, it's likely a swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) * 2 && Math.abs(deltaX) > minSwipeDistance && currentZoom <= 1) {
        isSwipe = true;
        // Prevent panning during a swipe
        isDragging = false;
        return;
      }
      
      if (isDragging && e.touches.length === 1 && !isSwipe) {
        translateX = touchEndX - startX;
        translateY = touchEndY - startY;
        
        // Calculate the boundaries based on the content size and zoom level
        const contentRect = content.getBoundingClientRect();
        const containerRect = contentContainer.getBoundingClientRect();
        
        // Calculate the maximum allowed translation to keep content within view
        const maxTranslateX = Math.max(0, (contentRect.width - containerRect.width) / 2) / currentZoom;
        const maxTranslateY = Math.max(0, (contentRect.height - containerRect.height) / 2) / currentZoom;
        
        // Constrain the translation
        translateX = Math.min(Math.max(translateX, -maxTranslateX * currentZoom), maxTranslateX * currentZoom);
        translateY = Math.min(Math.max(translateY, -maxTranslateY * currentZoom), maxTranslateY * currentZoom);
        
        content.style.transform = `scale(${currentZoom}) translate(${translateX / currentZoom}px, ${translateY / currentZoom}px)`;
      } else if (e.touches.length === 2) {
        // Handle pinch zoom
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;
        
        currentZoom = Math.min(Math.max(initialZoom * scale, minZoom), maxZoom);
        updateZoom();
      }
    }, { passive: false });
    
    document.addEventListener('touchend', function(e) {
      if (isSwipe && currentZoom <= 1) {
        // Calculate final swipe distance
        const deltaX = touchEndX - touchStartX;
        
    // Determine swipe direction and navigate accordingly
    if (deltaX > minSwipeDistance) {
      // Swipe right -> Next page
      if (currentPage < totalPages) {
        currentPage++;
        loadPage(currentPage);
      }
    } else if (deltaX < -minSwipeDistance) {
      // Swipe left -> Previous page
      if (currentPage > 1) {
        currentPage--;
        loadPage(currentPage);
      }
        }
        
        isSwipe = false;
      }
      
      if (isDragging) {
        isDragging = false;
        lastTranslateX = translateX;
        lastTranslateY = translateY;
      }
    });
    
    function getDistance(touches) {
      return Math.hypot(
        touches[0].pageX - touches[1].pageX,
        touches[0].pageY - touches[1].pageY
      );
    }
    
    // Keyboard navigation (matches swipe and button behavior)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        // Next page (matches right swipe and left button)
        if (currentPage < totalPages) {
          currentPage++;
          loadPage(currentPage);
        }
      } else if (e.key === 'ArrowRight') {
        // Previous page (matches left swipe and right button)
        if (currentPage > 1) {
          currentPage--;
          loadPage(currentPage);
        }
      }
    });



    // Add this to your existing JavaScript inside the DOMContentLoaded event handler

// Audio player related variables
// const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressTrack = document.getElementById('progressTrack');
const progressHandle = document.getElementById('progressHandle');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const speedBtn = document.getElementById('speedBtn');
const repeatBtn = document.getElementById('repeatBtn');
const repeatAyatBtn = document.getElementById('repeatAyatBtn');
const repeatPageBtn = document.getElementById('repeatPageBtn');
const playThisPageBtn = document.getElementById('playThisPageBtn');

// Create audio element
const audioElement = new Audio();
let isAudioPlaying = false;
let currentAyat = null;
let longPressTimer = null;
let currentSpeed = 1.0;
let repeatMode = 'page'; // 'ayat', 'page'

// Audio player related variables and functions

// Function to play audio for a specific ayat
function playAyatAudio(surah, ayat) {
try {
  // Stop any currently playing audio
  audioElement.pause();
  
  // Update current ayat reference
  currentAyat = { surah, ayat };
  
  // Show the audio player controls
  contentContainer.classList.add('controls-visible');
  controlsVisible = true;
  
  // Construct the audio file path
  const audioPath = `/Assets/Audio/${surah}_${ayat}.mp3`;
  
  console.log(`Playing audio: ${audioPath}`);
  
  // Set the audio source
  audioElement.src = audioPath;
  
  // Set playback speed
  audioElement.playbackRate = currentSpeed;
  
  // Clear any active highlights first
  document.querySelectorAll('.ayat-box').forEach(box => {
    box.classList.remove('active');
  });
  
  // Mark the ayat as active
  document.querySelectorAll(`.ayat-box[data-ayat="${surah}:${ayat}"]`).forEach(box => {
    box.classList.add('active');
  });
  
  // Play the audio
  audioElement.play()
    .then(() => {
      isAudioPlaying = true;
      updatePlayButtonIcon(true);
    })
    .catch(error => {
      console.error('Error playing audio:', error);
      alert(`Could not play audio file: ${audioPath}`);
      
      // Even if audio fails, still highlight the ayat
      document.querySelectorAll(`.ayat-box[data-ayat="${surah}:${ayat}"]`).forEach(box => {
        box.classList.add('active');
      });
    });
} catch (error) {
  console.error('Error in playAyatAudio:', error);
}
}

// Audio controls functionality
playBtn.addEventListener('click', () => {
if (isAudioPlaying) {
  audioElement.pause();
  isAudioPlaying = false;
  updatePlayButtonIcon(false);
} else {
  if (currentAyat) {
    audioElement.play()
      .then(() => {
        isAudioPlaying = true;
        updatePlayButtonIcon(true);
      })
      .catch(error => console.error('Error playing audio:', error));
  } else if (pageAyatData[currentPage] && pageAyatData[currentPage].length > 0) {
    // If no specific ayat is selected, play the first ayat on the current page
    const firstAyat = pageAyatData[currentPage][0];
    playAyatAudio(firstAyat.surah, firstAyat.ayat);
  }
}
});

function updatePlayButtonIcon(isPlaying) {
playBtn.querySelector('.icon').textContent = isPlaying ? '❚❚' : '▶';
playBtn.querySelector('.label').textContent = isPlaying ? 'Pause' : 'Play';
}

// Play this page button
playThisPageBtn.addEventListener('click', () => {
if (pageAyatData[currentPage] && pageAyatData[currentPage].length > 0) {
  // Start playing from the first ayat on the page
  const firstAyat = pageAyatData[currentPage][0];
  playAyatAudio(firstAyat.surah, firstAyat.ayat);
}
});

// Audio time update event
audioElement.addEventListener('timeupdate', () => {
const currentTime = audioElement.currentTime;
const duration = audioElement.duration || 0;

// Update progress bar
const progressPercent = (currentTime / duration) * 100;
progressTrack.style.width = `${progressPercent}%`;
progressHandle.style.left = `${progressPercent}%`;

// Update time displays
currentTimeDisplay.textContent = formatTime(currentTime);
if (!isNaN(duration)) {
  totalTimeDisplay.textContent = formatTime(duration);
}
});

// Format time in MM:SS
function formatTime(seconds) {
const mins = Math.floor(seconds / 60);
const secs = Math.floor(seconds % 60);
return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Progress bar interaction variables
let isDraggingProgress = false;
let progressBar = document.querySelector('.progress-container');

// Progress bar click
progressBar.addEventListener('click', (e) => {
  if (isDraggingProgress) return;
  
  const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
  seekAudio(clickPosition);
});

// Progress bar drag functionality
progressBar.addEventListener('mousedown', startDrag);
progressBar.addEventListener('touchstart', startDrag, { passive: false });

document.addEventListener('mousemove', handleDrag);
document.addEventListener('touchmove', handleDrag, { passive: false });

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
  isDraggingProgress = true;
  progressBar.style.cursor = 'grabbing';
  handleDrag(e); // Update position immediately
}

function handleDrag(e) {
  if (!isDraggingProgress) return;
  
  e.preventDefault(); // Prevent text selection during drag
  
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  if (!clientX) return;
  
  const rect = progressBar.getBoundingClientRect();
  let clickPosition = (clientX - rect.left) / rect.width;
  clickPosition = Math.max(0, Math.min(1, clickPosition)); // Clamp between 0-1
  
  seekAudio(clickPosition);
}

function endDrag() {
  if (isDraggingProgress) {
    isDraggingProgress = false;
    progressBar.style.cursor = '';
  }
}

function seekAudio(position) {
  if (audioElement.duration) {
    audioElement.currentTime = position * audioElement.duration;
  }
}

// Rewind and forward buttons
rewindBtn.addEventListener('click', () => {
audioElement.currentTime = Math.max(0, audioElement.currentTime - 5);
});

forwardBtn.addEventListener('click', () => {
audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 5);
});

// Speed control
speedBtn.addEventListener('click', () => {
// Cycle through speed options: 0.5, 0.75, 1.0, 1.25, 1.5, 2.0
const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
const currentIndex = speedOptions.indexOf(currentSpeed);
const nextIndex = (currentIndex + 1) % speedOptions.length;
currentSpeed = speedOptions[nextIndex];

// Update button text
speedBtn.textContent = `Speed ${currentSpeed}x`;

// Apply to current audio
audioElement.playbackRate = currentSpeed;
});

// Repeat modes
repeatBtn.addEventListener('click', () => {
// Cycle through three modes: 'page', 'ayat', 'off'
switch (repeatMode) {
  case 'page':
    repeatMode = 'ayat';
    repeatBtn.textContent = 'Repeat Ayat';
    break;
  case 'ayat':
    repeatMode = 'off';
    repeatBtn.textContent = 'Repeat Off';
    break;
  case 'off':
    repeatMode = 'page';
    repeatBtn.textContent = 'Auto Play';
    break;
}
console.log(`Repeat mode changed to: ${repeatMode}`);
});

repeatAyatBtn.addEventListener('click', () => {
// Set directly to 'ayat' mode
repeatMode = 'ayat';
repeatBtn.textContent = 'Repeat Ayat';
console.log(`Repeat mode set to: ${repeatMode} via repeatAyatBtn`);

// If there's a current ayat and audio is not playing, start playing it
if (currentAyat && !isAudioPlaying) {
  console.log(`Starting to play last ayat: ${currentAyat.surah}:${currentAyat.ayat} in repeat mode`);
  playAyatAudio(currentAyat.surah, currentAyat.ayat);
}
});

// repeatPageBtn.addEventListener('click', () => {
//   repeatMode = repeatMode === 'page' ? 'off' : 'page';
//   repeatBtn.textContent = repeatMode === 'page' ? 'Repeat Page' : 'Repeat Off';
// });

// Handle audio ended event for repeat functionality
audioElement.addEventListener('ended', () => {
try {
  if (repeatMode === 'ayat' && currentAyat) {
    // Repeat the same ayat
    playAyatAudio(currentAyat.surah, currentAyat.ayat);
    return;
  }

  const currentAyatList = pageAyatData[currentPage] || [];
  if (currentAyatList.length === 0) {
    isAudioPlaying = false;
    updatePlayButtonIcon(false);
    return;
  }

  // Check if we just played the last ayat of current page
  const lastAyat = currentAyatList[currentAyatList.length - 1];
  const isLastAyat = currentAyat && 
                    lastAyat.surah == currentAyat.surah && 
                    lastAyat.ayat == currentAyat.ayat;

  if (isLastAyat && repeatMode === 'page' && currentPage < totalPages) {
    // Move to next page and play its first ayat
    setTimeout(() => {
      currentPage++;
      loadPage(currentPage);
      
      const firstAyat = pageAyatData[currentPage][0];
      playAyatAudio(firstAyat.surah, firstAyat.ayat);
    }, 200); // 200ms delay before transition
    return;
  }

  // Standard ayat progression within same page
  let nextAyatIndex = 0;
  if (currentAyat) {
    for (let i = 0; i < currentAyatList.length; i++) {
      if ((currentAyatList[i].lines && 
           currentAyatList[i].surah == currentAyat.surah && 
           currentAyatList[i].ayat == currentAyat.ayat) ||
          (!currentAyatList[i].lines && 
           currentAyatList[i].surah == currentAyat.surah && 
           currentAyatList[i].ayat == currentAyat.ayat)) {
        nextAyatIndex = (i + 1) % currentAyatList.length;
        break;
      }
    }
  }

  const nextAyat = currentAyatList[nextAyatIndex];
  if (repeatMode === 'page') {
    playAyatAudio(nextAyat.surah, nextAyat.ayat);
  } else if (repeatMode === 'off') {
    isAudioPlaying = false;
    updatePlayButtonIcon(false);
  }
} catch (error) {
  console.error('Error in audio ended handler:', error);
}
});
    
    // Utility function to add new ayat box (helpful for debugging or adding boxes dynamically)
    window.addAyatBox = function(surah, ayat, top, left, width, height) {
      const box = document.createElement('div');
      box.className = 'ayat-box';
      box.dataset.ayat = `${surah}:${ayat}`;
      box.title = `Surah ${surah}, Ayat ${ayat}`;
      box.style.top = `${top}%`;
      box.style.left = `${left}%`;
      box.style.width = `${width}%`;
      box.style.height = `${height}%`;
      
      // Add the same event listeners as other boxes
      setupAyatBoxEvents(box);
      
      ayatOverlay.appendChild(box);
      return box;
    };
    
    // Initialize
    loadPage(currentPage);
    



     // Interactive Tutorial functionality
     const tutorialOverlay = document.getElementById('tutorialOverlay');
     const tutorialSpotlight = document.getElementById('tutorialSpotlight');
     const tutorialArrow = document.getElementById('tutorialArrow');
     const tutorialMessage = document.getElementById('tutorialMessage');
     const tutorialTitle = document.getElementById('tutorialTitle');
     const tutorialText = document.getElementById('tutorialText');
     const tutorialNextBtn = document.getElementById('tutorialNextBtn');
     const tutorialSkipBtn = document.getElementById('tutorialSkipBtn');
     const tutorialProgress = document.getElementById('tutorialProgress');
     
     // Tutorial steps definition
     const tutorialSteps = [
       {
         title: "Welcome to the Website",
         text: "Let's explore the features of this Website. Tap 'Next' to begin the tour.",
         target: null,
         position: "center",
         spotlightShape: "circle",
         spotlightSize: 0,
         arrowPosition: { top: "50%", left: "50%" },
         arrowRotation: 0
       },
       {
         title: "Page Navigation",
         text: "Use these arrows to navigate between pages of the Quran.",
         target: "#nextBtn",
         position: "right",
         spotlightShape: "circle",
         spotlightSize: 60,
         arrowPosition: { top: "-20px", right: "10px" },
         arrowRotation: 180
       },
       {
         title: "Previous Page",
         text: "Tap here to go to the next page.",
         target: "#prevBtn",
         position: "left",
         spotlightShape: "circle",
         spotlightSize: 60,
         arrowPosition: { top: "-20px", left: "10px" },
         arrowRotation: 180
       },
       {
         title: "Swipe Navigation", 
         text: "Swipe right to go to the next page, swipe left to go to the previous page (matches Quran reading direction).",
         target: "#zoomContent",
         position: "center",
         spotlightShape: "rect",
         spotlightSize: { width: 200, height: 200 },
         arrowPosition: { top: "40%", left: "50%" },
         arrowRotation: 0
       },
       {
         title: "Zoom Controls",
         text: "Use these buttons to zoom in and out of the page.",
         target: ".controls",
         position: "bottom",
         spotlightShape: "rect",
         spotlightSize: { width: 250, height: 60 },
         arrowPosition: { bottom: "70px", left: "50%" },
         arrowRotation: 0
       },
       {
         title: "Show Controls",
         text: "Tap anywhere on the page background to show navigation and audio controls.",
         target: "#zoomContent",
         position: "center",
         spotlightShape: "rect",
         spotlightSize: { width: 200, height: 200 },
         arrowPosition: { top: "40%", left: "50%" },
         arrowRotation: 0
       },
       {
         title: "Interact with Ayat",
         text: "Press and hold on any ayat to play its meaning from the Official <b>Mahad al-Zahra</b>.",
         target: ".ayat-box",
         position: "center",
         spotlightShape: "rect",
         spotlightSize: { width: 150, height: 30 },
         arrowPosition: { top: "30%", left: "50%" },
         arrowRotation: 0,
         targetSelector: true
       },
       {
         title: "Audio Controls",
         text: "When audio is playing, use these controls to adjust playback.",
         target: "#audioPlayer",
         position: "top",
         spotlightShape: "rect",
         spotlightSize: { width: 300, height: 150 },
         arrowPosition: { top: "70%", left: "50%" },
         arrowRotation: 0,
         showControls: true
       },
       {
         title: "You're Ready!",
         text: "You now know the basics of using the website Enjoy exploring!",
         target: null,
         position: "center",
         spotlightShape: "circle",
         spotlightSize: 0,
         arrowPosition: { top: "50%", left: "50%" },
         arrowRotation: 0
       }
     ];
     
     let currentStep = 0;
     
     // Initialize tutorial
     function initTutorial() {
       // Create progress dots
       tutorialProgress.innerHTML = '';
       tutorialSteps.forEach((_, index) => {
         const dot = document.createElement('div');
         dot.className = `tutorial-dot ${index === 0 ? 'active' : ''}`;
         tutorialProgress.appendChild(dot);
       });
       
       // Set up event listeners
       tutorialNextBtn.addEventListener('click', nextTutorialStep);
       tutorialSkipBtn.addEventListener('click', endTutorial);
       
       // Always show tutorial - removed localStorage check
       console.log("Initializing tutorial...");
       
       // Slight delay to ensure everything is loaded
       setTimeout(() => {
         console.log("Showing tutorial step 0...");
         showTutorialStep(0);
       }, 1000);
     }
     
     // Show a specific tutorial step
     function showTutorialStep(stepIndex) {
       if (stepIndex >= tutorialSteps.length) {
         endTutorial();
         return;
       }
       
       const step = tutorialSteps[stepIndex];
       
       // Update progress dots
       document.querySelectorAll('.tutorial-dot').forEach((dot, index) => {
         dot.classList.toggle('active', index === stepIndex);
       });
       
       // Update button text for last step
       tutorialNextBtn.textContent = stepIndex === tutorialSteps.length - 1 ? 'Finish' : 'Next';
       
       // Update message content
       tutorialTitle.textContent = step.title;
       tutorialText.innerHTML = step.text; // Changed to innerHTML to support HTML tags
       
       // Position message box
       positionTutorialElements(step);
       
       // Show the overlay
       tutorialOverlay.classList.add('visible');
       
       // Special case for showing controls
       if (step.showControls) {
         contentContainer.classList.add('controls-visible');
         controlsVisible = true;
       }
       
       currentStep = stepIndex;
     }
     
     // Position tutorial elements based on the current step
     function positionTutorialElements(step) {
       // Get target element
       let targetElement = null;
       
       if (step.target) {
         if (step.targetSelector) {
           // For selectors that might return multiple elements (like .ayat-box)
           const elements = document.querySelectorAll(step.target);
           if (elements.length > 0) {
             targetElement = elements[0]; // Use the first one
           }
         } else {
           targetElement = document.querySelector(step.target);
         }
       }
       
       // Reset styles
       tutorialMessage.style.transform = '';
       
       // Hide the arrow as requested by the user
       tutorialArrow.style.display = 'none';
       
       // Position spotlight
       if (targetElement) {
         const rect = targetElement.getBoundingClientRect();
         const viewportWidth = window.innerWidth;
         const viewportHeight = window.innerHeight;
         
         // Adjust spotlight size based on screen size and element
         let spotlightSize;
         if (step.spotlightShape === 'circle') {
           // For circle, use responsive sizing based on viewport and element size
           const baseSize = step.spotlightSize;
           const responsiveSize = Math.min(
             baseSize,
             Math.max(40, Math.min(viewportWidth, viewportHeight) * 0.15)
           );
           
           spotlightSize = Math.max(
             responsiveSize,
             Math.min(rect.width, rect.height) * 1.2
           );
           
           tutorialSpotlight.style.width = `${spotlightSize}px`;
           tutorialSpotlight.style.height = `${spotlightSize}px`;
           tutorialSpotlight.style.borderRadius = '50%';
           tutorialSpotlight.style.top = `${rect.top + rect.height/2 - spotlightSize/2}px`;
           tutorialSpotlight.style.left = `${rect.left + rect.width/2 - spotlightSize/2}px`;
         } else {
           // For rectangle, adapt to element size with some padding
           const baseWidth = step.spotlightSize.width;
           const baseHeight = step.spotlightSize.height;
           
           // Make spotlight at least as large as the element with some padding
           const width = Math.max(baseWidth, rect.width * 1.1);
           const height = Math.max(baseHeight, rect.height * 1.2);
           
           // But don't make it too large on small screens
           const responsiveWidth = Math.min(width, viewportWidth * 0.8);
           const responsiveHeight = Math.min(height, viewportHeight * 0.5);
           
           tutorialSpotlight.style.width = `${responsiveWidth}px`;
           tutorialSpotlight.style.height = `${responsiveHeight}px`;
           tutorialSpotlight.style.borderRadius = '8px';
           tutorialSpotlight.style.top = `${rect.top + rect.height/2 - responsiveHeight/2}px`;
           tutorialSpotlight.style.left = `${rect.left + rect.width/2 - responsiveWidth/2}px`;
         }
         
         tutorialSpotlight.classList.toggle('rect', step.spotlightShape === 'rect');
         tutorialSpotlight.style.display = 'block';
         
         // Position message - adaptive positioning based on available space
         const messageRect = tutorialMessage.getBoundingClientRect();
         const messageWidth = messageRect.width || 300; // Fallback if not yet rendered
         const messageHeight = messageRect.height || 200;
         
         // Determine best position based on available space
         let bestPosition = step.position;
         
         // If specified position doesn't have enough space, find a better one
         if (bestPosition === 'top' && rect.top < messageHeight + 30) {
           bestPosition = rect.bottom + messageHeight + 30 < viewportHeight ? 'bottom' : 'center';
         } else if (bestPosition === 'bottom' && rect.bottom + messageHeight + 30 > viewportHeight) {
           bestPosition = rect.top > messageHeight + 30 ? 'top' : 'center';
         } else if (bestPosition === 'left' && rect.left < messageWidth + 30) {
           bestPosition = rect.right + messageWidth + 30 < viewportWidth ? 'right' : 'center';
         } else if (bestPosition === 'right' && rect.right + messageWidth + 30 > viewportWidth) {
           bestPosition = rect.left > messageWidth + 30 ? 'left' : 'center';
         }
         
         // Apply the position
         switch (bestPosition) {
           case 'top':
             tutorialMessage.style.top = `${Math.max(10, rect.top - messageHeight - 20)}px`;
             tutorialMessage.style.left = `${Math.min(Math.max(10, rect.left + rect.width/2 - messageWidth/2), viewportWidth - messageWidth - 10)}px`;
             break;
           case 'right':
             tutorialMessage.style.top = `${Math.min(Math.max(10, rect.top + rect.height/2 - messageHeight/2), viewportHeight - messageHeight - 10)}px`;
             tutorialMessage.style.left = `${Math.min(rect.right + 20, viewportWidth - messageWidth - 10)}px`;
             break;
           case 'bottom':
             tutorialMessage.style.top = `${Math.min(rect.bottom + 20, viewportHeight - messageHeight - 10)}px`;
             tutorialMessage.style.left = `${Math.min(Math.max(10, rect.left + rect.width/2 - messageWidth/2), viewportWidth - messageWidth - 10)}px`;
             break;
           case 'left':
             tutorialMessage.style.top = `${Math.min(Math.max(10, rect.top + rect.height/2 - messageHeight/2), viewportHeight - messageHeight - 10)}px`;
             tutorialMessage.style.left = `${Math.max(10, rect.left - messageWidth - 20)}px`;
             break;
           default: // center
             tutorialMessage.style.top = '50%';
             tutorialMessage.style.left = '50%';
             tutorialMessage.style.transform = 'translate(-50%, -50%)';
             break;
         }
         
       } else {
         // Center everything for steps without a target
         tutorialSpotlight.style.display = 'none';
         tutorialArrow.style.display = 'none';
         
         tutorialMessage.style.top = '50%';
         tutorialMessage.style.left = '50%';
         tutorialMessage.style.transform = 'translate(-50%, -50%)';
       }
       
       // Final safety check to ensure message is fully visible
       setTimeout(() => {
         const messageRect = tutorialMessage.getBoundingClientRect();
         const viewportWidth = window.innerWidth;
         const viewportHeight = window.innerHeight;
         
         // If message is off-screen, reposition it
         if (messageRect.right > viewportWidth) {
           tutorialMessage.style.left = `${viewportWidth - messageRect.width - 10}px`;
         }
         if (messageRect.left < 0) {
           tutorialMessage.style.left = '10px';
         }
         if (messageRect.bottom > viewportHeight) {
           tutorialMessage.style.top = `${viewportHeight - messageRect.height - 10}px`;
         }
         if (messageRect.top < 0) {
           tutorialMessage.style.top = '10px';
         }
       }, 50); // Small delay to allow any transitions to complete
     }
     
     // Handle window resize to reposition elements
     window.addEventListener('resize', () => {
       if (tutorialOverlay.classList.contains('visible')) {
         positionTutorialElements(tutorialSteps[currentStep]);
       }
     });
     
     // Handle orientation change specifically
     window.addEventListener('orientationchange', () => {
       if (tutorialOverlay.classList.contains('visible')) {
         // Small delay to allow the browser to complete the orientation change
         setTimeout(() => {
           positionTutorialElements(tutorialSteps[currentStep]);
         }, 200);
       }
     });
     
     // Move to the next tutorial step
     function nextTutorialStep() {
       showTutorialStep(currentStep + 1);
     }
     
     // End the tutorial
     function endTutorial() {
       tutorialOverlay.classList.remove('visible');
       // Removed localStorage.setItem so tutorial will show again on refresh
     }
     
     // Initialize the tutorial
     initTutorial();
  });