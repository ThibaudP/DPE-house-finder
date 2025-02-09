class RateLimiter {
  constructor() {
    // Store timestamps in localStorage to persist across page refreshes
    this.key = 'api_requests';
    this.maxRequests = 20;
    this.timeWindow = 60000; // 1 minute in milliseconds
  }

  getRequests() {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  }

  saveRequests(requests) {
    localStorage.setItem(this.key, JSON.stringify(requests));
  }

  async tryRequest() {
    const now = Date.now();
    let requests = this.getRequests();

    // Remove requests older than 1 minute
    requests = requests.filter(
      (timestamp) => now - timestamp < this.timeWindow
    );

    if (requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...requests);
      const waitTime = Math.ceil(
        (oldestRequest + this.timeWindow - now) / 1000
      );
      throw new Error(
        `Trop de requêtes. Veuillez attendre ${waitTime} secondes.`
      );
    }

    // Add new request
    requests.push(now);
    this.saveRequests(requests);
  }
}

// Export a singleton instance
export const rateLimiter = new RateLimiter();
