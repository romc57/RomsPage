/**
 * GitHub Stats Module
 * Fetches repository count from GitHub API and updates portfolio stats
 */

class GitHubStats {
    constructor(username) {
        this.username = username;
        this.apiUrl = `https://api.github.com/users/${username}`;
        this.reposUrl = `https://api.github.com/users/${username}/repos`;
        this.cache = {
            data: null,
            timestamp: null,
            duration: 2 * 60 * 1000 // 2 minutes cache (shorter for more frequent updates)
        };
    }

    /**
     * Check if cached data is still valid
     */
    isCacheValid() {
        return this.cache.data && 
               this.cache.timestamp && 
               (Date.now() - this.cache.timestamp) < this.cache.duration;
    }

    /**
     * Fetch user data from GitHub API
     */
    async fetchUserData() {
        try {
            console.log('🌐 Attempting to fetch user data from:', this.apiUrl);
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-Website'
                }
            });
            
            console.log('📡 GitHub API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ Successfully fetched user data:', data);
            return data;
        } catch (error) {
            console.error('❌ Error fetching GitHub user data:', error);
            console.error('🔍 Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    /**
     * Fetch repositories from GitHub API
     */
    async fetchRepositories() {
        try {
            console.log('🌐 Attempting to fetch repositories from:', `${this.reposUrl}?per_page=100&type=public`);
            const response = await fetch(`${this.reposUrl}?per_page=100&type=public`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-Website'
                }
            });
            
            console.log('📡 GitHub Repos API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ Successfully fetched repositories:', data.length, 'repos');
            return data;
        } catch (error) {
            console.error('❌ Error fetching GitHub repositories:', error);
            console.error('🔍 Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    /**
     * Get comprehensive GitHub statistics
     */
    async getGitHubStats(forceRefresh = false) {
        // Return cached data if valid and not forcing refresh
        if (!forceRefresh && this.isCacheValid()) {
            console.log('📦 Using cached GitHub data');
            return this.cache.data;
        }

        try {
            console.log('🌐 Fetching fresh GitHub data...');
            // Fetch user data and repositories in parallel
            const [userData, repositories] = await Promise.all([
                this.fetchUserData(),
                this.fetchRepositories()
            ]);

            // Filter out forked repositories to get original projects
            const originalRepos = repositories.filter(repo => !repo.fork);
            
            // Calculate additional stats
            const stats = {
                totalRepos: userData.public_repos,
                originalProjects: originalRepos.length,
                forkedRepos: repositories.length - originalRepos.length,
                followers: userData.followers,
                following: userData.following,
                lastUpdated: new Date().toISOString()
            };

            // Cache the results
            this.cache.data = stats;
            this.cache.timestamp = Date.now();

            return stats;
        } catch (error) {
            console.error('❌ Failed to fetch GitHub stats:', error);
            console.error('🔍 Full error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                cause: error.cause
            });
            
            // Check if it's a network/CORS error
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.warn('🚫 Likely CORS or network connectivity issue');
            }
            
            // Return fallback data if API fails
            console.log('📝 Returning fallback data...');
            return {
                totalRepos: 10, // Fallback value
                originalProjects: 10,
                forkedRepos: 0,
                followers: 0,
                following: 0,
                lastUpdated: new Date().toISOString(),
                isError: true,
                errorMessage: error.message
            };
        }
    }

    /**
     * Update the projects stat in the DOM
     */
    async updateProjectsStat(forceRefresh = true) {
        try {
            console.log('🔍 Looking for projects stat element in DOM...');
            
            // Try multiple selectors to find the projects count element
            const projectsStatElement = document.querySelector('#projects-count') || 
                                      document.querySelector('.stat:nth-child(2) .stat-number') ||
                                      document.querySelector('.stat-number[id="projects-count"]');
            
            console.log('📍 Projects stat element found:', projectsStatElement);
            
            if (!projectsStatElement) {
                console.error('❌ Projects stat element not found in DOM. Checked selectors:', [
                    '#projects-count',
                    '.stat:nth-child(2) .stat-number',
                    '.stat-number[id="projects-count"]'
                ]);
                
                // Debug: show all elements with stat-related classes
                console.log('🔍 All .stat elements:', document.querySelectorAll('.stat'));
                console.log('🔍 All .stat-number elements:', document.querySelectorAll('.stat-number'));
                return null;
            }

            console.log('📊 Fetching GitHub stats...');
            const stats = await this.getGitHubStats(forceRefresh);
            
            const sourceElement = document.querySelector('.stat:nth-child(2) .stat-source');
            
            // Use original projects count for more accurate representation
            const projectCount = stats.originalProjects;
            const displayCount = projectCount > 0 ? projectCount : stats.totalRepos;
            
            console.log('📊 Updating projects count to:', displayCount);
            
            // Add "+" for fallback data, exact number for live data
            if (stats.isError) {
                projectsStatElement.textContent = `${displayCount}+`;
            } else {
                projectsStatElement.textContent = `${displayCount}`;
            }
            
            // Show source indicator with appropriate message
            if (sourceElement) {
                if (stats.isError) {
                    sourceElement.style.display = 'block';
                    sourceElement.textContent = 'Estimated (API unavailable)';
                    sourceElement.style.color = '#888';
                } else {
                    sourceElement.style.display = 'block';
                    sourceElement.textContent = 'Live from GitHub API';
                    sourceElement.style.color = '#4ade80'; // Green color for live data
                }
            }
            
            // Add a subtle animation to indicate update
            projectsStatElement.style.transition = 'transform 0.3s ease';
            projectsStatElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                projectsStatElement.style.transform = 'scale(1)';
            }, 300);

            console.log(`✅ Updated projects count to: ${displayCount}`);
            
            // Log additional stats for debugging
            if (!stats.isError) {
                console.log('🔥 GitHub Stats Successfully Updated:', {
                    'Total Repositories': stats.totalRepos,
                    'Original Projects': stats.originalProjects,
                    'Forked Repositories': stats.forkedRepos,
                    'Display Count Used': displayCount,
                    'Last Updated': stats.lastUpdated
                });
            } else {
                console.warn('⚠️ Using fallback data due to API error');
            }

            return stats;
        } catch (error) {
            console.error('❌ Failed to update projects stat:', error);
            return null;
        }
    }

    /**
     * Initialize and start the GitHub stats update
     */
    async init() {
        try {
            console.log('🚀 Initializing GitHub Stats module...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', async () => {
                    console.log('📄 DOM loaded, fetching GitHub stats...');
                    await this.updateProjectsStat(true); // Force refresh on page load
                });
            } else {
                console.log('📄 DOM already ready, fetching GitHub stats...');
                await this.updateProjectsStat(true); // Force refresh on page load
            }
            
            // Refresh data when page becomes visible (user returns to tab)
            document.addEventListener('visibilitychange', async () => {
                if (!document.hidden) {
                    console.log('👁️ Page became visible, refreshing GitHub stats...');
                    await this.updateProjectsStat(true);
                }
            });
            
        } catch (error) {
            console.error('❌ Failed to initialize GitHub stats:', error);
        }
    }

    /**
     * Force refresh the stats (bypass cache)
     */
    async forceRefresh() {
        this.cache.data = null;
        this.cache.timestamp = null;
        return await this.updateProjectsStat();
    }
}

// Export for use in other modules
export default GitHubStats;

// Debug function to test the GitHub API connection
window.testGitHubAPI = async () => {
    console.log('🧪 Testing GitHub API connection...');
    try {
        console.log('🌐 Testing fetch to GitHub API...');
        const response = await fetch('https://api.github.com/users/romc57', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Website'
            }
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ GitHub API Response:', data);
        console.log(`📊 Public repos count: ${data.public_repos}`);
        return data;
    } catch (error) {
        console.error('❌ GitHub API test failed:', error);
        console.error('🔍 Error type:', error.constructor.name);
        console.error('🔍 Error message:', error.message);
        
        // Check for common error types
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('🚫 This appears to be a CORS or network connectivity issue');
            console.log('💡 Suggestions:');
            console.log('   - Check if you have internet connectivity');
            console.log('   - Try accessing the portfolio from a proper web server (not file://)');
            console.log('   - GitHub API might be experiencing issues');
        }
        
        return null;
    }
};

// Create instance for Rom Cohen's GitHub profile (but don't auto-initialize)
const gitHubStats = new GitHubStats('romc57');

// Test connectivity immediately when module loads
console.log('🔌 Testing GitHub API connectivity on module load...');
window.testGitHubAPI().then(result => {
    if (result) {
        console.log('✅ GitHub API is accessible');
    } else {
        console.warn('⚠️ GitHub API is not accessible - will use fallback data');
    }
});

// Make available globally for manual refresh if needed
window.GitHubStats = GitHubStats;
window.gitHubStats = gitHubStats;
window.refreshGitHubStats = () => gitHubStats.forceRefresh();

// Debug function to manually update the counter
window.debugUpdateProjects = async () => {
    console.log('🔧 Manual project count update...');
    return await gitHubStats.updateProjectsStat();
};
