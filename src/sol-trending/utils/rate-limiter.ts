export class RateLimiter {
  private lastCallTime: number = 0;
  private readonly minInterval: number = 2000; // 2 seconds minimum between calls

  async throttle(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;

    if (timeSinceLastCall < this.minInterval) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.minInterval - timeSinceLastCall),
      );
    }

    this.lastCallTime = Date.now();
  }
}
