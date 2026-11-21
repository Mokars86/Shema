export interface ExtractedVideoFrame {
  thumbnailDataUrl: string;
  duration: number;
}

/**
 * Extracts a frame from an uploaded video file using an offscreen <video> + <canvas>.
 * By default (timestampSeconds = 0.05), it captures the opening frame (0:00),
 * matching TikTok's default thumbnail rule.
 */
export function extractVideoThumbnail(
  videoUrl: string,
  timestampSeconds = 0.05
): Promise<ExtractedVideoFrame> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.src = videoUrl;

    const cleanup = () => {
      video.removeAttribute('src');
      video.load();
    };

    video.onloadedmetadata = () => {
      const safeTime = Math.min(
        Math.max(0, timestampSeconds),
        Math.max(0, (video.duration || 1) - 0.05)
      );
      video.currentTime = safeTime;
    };

    video.onseeked = () => {
      try {
        const width = video.videoWidth || 540;
        const height = video.videoHeight || 960;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          cleanup();
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }
        ctx.drawImage(video, 0, 0, width, height);
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const duration = video.duration || 0;
        cleanup();
        resolve({ thumbnailDataUrl, duration });
      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error('Unable to decode uploaded video for thumbnail'));
    };
  });
}

export function formatCompactCount(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}
