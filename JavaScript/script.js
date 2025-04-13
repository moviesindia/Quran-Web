// First load Hammer.js with multiple fallbacks
function loadHammerJS() {
    return new Promise((resolve) => {
        if (typeof Hammer !== 'undefined') {
            resolve();
            return;
        }

        const sources = [
            'https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/hammerjs/2.0.8/hammer.min.js',
            'js/hammer.min.js'
        ];

        function trySource(index) {
            if (index >= sources.length) {
                console.warn('All Hammer.js sources failed');
                resolve(); // Continue without Hammer.js
                return;
            }

            const script = document.createElement('script');
            script.src = sources[index];
            script.onload = () => {
                console.log('Hammer.js loaded from:', sources[index]);
                resolve();
            };
            script.onerror = () => {
                console.warn('Failed to load from:', sources[index]);
                trySource(index + 1);
            };
            document.head.appendChild(script);
        }

        trySource(0);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadHammerJS();
        console.log('Hammer.js successfully loaded');
    // Tab switching functionality
    function switchTab(tabId) {
        const activeTabLink = document.querySelector('.tab-link.active');
        const activeTabContent = document.querySelector('.tab-content.active');

        if (activeTabLink) activeTabLink.classList.remove('active');
        if (activeTabContent) activeTabContent.classList.remove('active');

        const newTabLink = document.querySelector(`[data-tab="${tabId}"]`);
        const newTabContent = document.getElementById(tabId);

        if (newTabLink) newTabLink.classList.add('active');
        if (newTabContent) newTabContent.classList.add('active');
        
        // Reset search when switching tabs
        document.getElementById('search-input').value = '';
        filterItems('');
    }

    // Delegate tab link event listeners
    document.querySelector('.tabs').addEventListener('click', function(e) {
        if (e.target && e.target.matches('.tab-link')) {
            e.preventDefault();
            if (!e.target.classList.contains('active')) {
                switchTab(e.target.getAttribute('data-tab'));
            }
        }
    });

    // Initialize default tab
    switchTab('surah-tab');

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    
    function filterItems(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        // Filter Surahs
        const surahItems = document.querySelectorAll('.surah-item');
        let surahFound = false;
        
        surahItems.forEach(item => {
            const surahName = item.querySelector('.list-item span:nth-child(2)').textContent.toLowerCase();
            const surahNumber = item.querySelector('.list-item span:nth-child(1)').textContent;
            
            if (searchTerm === '' || 
                surahName.includes(searchTerm) || 
                surahNumber.includes(searchTerm)) {
                item.style.display = 'block';
                surahFound = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        document.getElementById('surah-no-results').style.display = surahFound ? 'none' : 'block';
        
        // Filter Juz
        const juzItems = document.querySelectorAll('.juz-item');
        let juzFound = false;
        
        juzItems.forEach(item => {
            const juzName = item.querySelector('.list-item div:nth-child(2)').textContent.toLowerCase();
            const juzNumber = item.querySelector('.list-item div:nth-child(1)').textContent;
            
            if (searchTerm === '' || 
                juzName.includes(searchTerm) || 
                juzNumber.includes(searchTerm)) {
                item.style.display = 'block';
                juzFound = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        document.getElementById('juz-no-results').style.display = juzFound ? 'none' : 'block';
    }
    
    // Event listeners for search
    searchInput.addEventListener('input', function() {
        filterItems(this.value);
    });
    
    searchButton.addEventListener('click', function() {
        filterItems(searchInput.value);
    });
    
    // Search form submission handling (prevent page reload)
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterItems(this.value);
        }
    });
    
    // Clear search when switching tabs
    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', function() {
            searchInput.value = '';
            filterItems('');
        });
    });

    // Initialize swipe functionality
    const contentElement = document.querySelector('.content');
    if (!contentElement) {
        console.error('Content element not found');
        return;
    }

    const hammer = new Hammer(contentElement);
    console.log('Hammer instance created');
    
    // Configure to only detect horizontal swipes
    hammer.get('swipe').set({ 
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 10,
        velocity: 0.3
    });
    
    hammer.on('swipeleft swiperight', function(e) {
        console.log('Swipe detected:', e.type);
    });

    hammer.on('swipeleft', function() {
        console.log('Swipe left - switching to juz-tab');
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'surah-tab') {
            switchTab('juz-tab');
        }
    });

    hammer.on('swiperight', function() {
        console.log('Swipe right - switching to surah-tab');
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'juz-tab') {
            switchTab('surah-tab');
        }
    });
    } catch (error) {
        console.error('Error initializing swipe:', error);
    }
});


// gotopage from the data-page to the quran.html

document.querySelectorAll('a[data-page]').forEach(a => {
    const page = a.getAttribute('data-page');
    a.setAttribute('href', `quran.html?page=${page}`);
  });