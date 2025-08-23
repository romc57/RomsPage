/**
 * GitHub Stats Module
 * Fetches repository count from GitHub API and updates portfolio stats
 */

class GitHubStats {
    constructor() {
        this.apiUrl = 'https://api.github.com/users/romc57';
    }

    /**
     * Fetch public repos count from GitHub API
     */
    async getPublicReposCount() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const data = await response.json();
            return data.public_repos;
        } catch (error) {
            console.error('Failed to fetch GitHub stats:', error);
            return null;
        }
    }

    /**
     * Update the projects stat in the DOM
     */
    async updateProjectsStat() {
        const projectsStatElement = document.querySelector('#projects-count');
        const sourceElement = document.querySelector('.stat:nth-child(2) .stat-source');
        
        if (!projectsStatElement) {
            console.error('Projects stat element not found');
            return;
        }

        const repoCount = await this.getPublicReposCount();
        
        if (repoCount !== null) {
            // API success - show exact count (no +)
            projectsStatElement.textContent = repoCount;
            if (sourceElement) {
                sourceElement.style.display = 'block';
                sourceElement.textContent = 'Live from GitHub API';
                sourceElement.style.color = '#4ade80';
            }
        } else {
            // API failed - show fallback with +
            projectsStatElement.textContent = '9+';
            if (sourceElement) {
                sourceElement.style.display = 'block';
                sourceElement.textContent = 'Estimated (API unavailable)';
                sourceElement.style.color = '#888';
            }
        }
    }

    /**
     * Initialize the GitHub stats update
     */
    async init() {
        await this.updateProjectsStat();
        
        // Update when page becomes visible
        document.addEventListener('visibilitychange', async () => {
            if (!document.hidden) {
                await this.updateProjectsStat();
            }
        });
    }
}

// Export for use in other modules
export default GitHubStats;
