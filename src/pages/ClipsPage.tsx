import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Cpu,
  Eye,
  FileCheck2,
  Film,
  Grid,
  Heart,
  MessageCircle,
  Play,
  Plus,
  Send,
  Share2,
  Sliders,
  UploadCloud,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DIGITAL_SERVICES, PRODUCTS } from '../data/mockData';
import type { VideoClip } from '../types';
import {
  extractVideoThumbnail,
  formatCompactCount,
} from '../utils/videoThumbnail';

interface ClipCardProps {
  clip: VideoClip;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onViewTriggered: (clipId: string) => void;
  onOpenComments: (clipId: string) => void;
}

const ClipPlayerCard: React.FC<ClipCardProps> = ({
  clip,
  isActive,
  isMuted,
  onToggleMute,
  onViewTriggered,
  onOpenComments,
}) => {
  const { toggleClipLike, toggleClipSave, showToast } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewCountedThisImpression = useRef(false);
  const lastTapRef = useRef<number>(0);

  const [isPaused, setIsPaused] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  // Autoplay when active in viewport, pause & reset impression when swiped away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      setIsPaused(false);
      video.play().catch(() => {
        // Browser may require mute for autoplay; handled via muted prop
      });
    } else {
      video.pause();
      viewCountedThisImpression.current = false;
    }
  }, [isActive]);

  // TikTok rule: count a view the exact moment playback starts for this impression
  const handlePlay = () => {
    if (!viewCountedThisImpression.current && isActive) {
      viewCountedThisImpression.current = true;
      onViewTriggered(clip.id);
    }
  };

  const handleVideoTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      // Double tap -> Like + heart burst
      toggleClipLike(clip.id, true);
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 650);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    // Single tap -> toggle play/pause
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    showToast('Clip link copied to clipboard!');
  };

  const targetRoute =
    clip.linkedType === 'product'
      ? `/electronics/${clip.linkedId}`
      : `/digital-services/${clip.linkedId}`;

  return (
    <div className="relative w-full h-full snap-start snap-always flex items-center justify-center bg-slate-950 rounded-3xl overflow-hidden select-none">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={clip.videoUrl}
        poster={clip.thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onClick={handleVideoTap}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Center Play/Pause Indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Double-Tap Heart Burst */}
      {heartBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
          <Heart className="w-20 h-20 fill-rose-500 text-rose-500 drop-shadow-lg" />
        </div>
      )}

      {/* Top Controls: Mute/Unmute + Live View Pill */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold inline-flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>{formatCompactCount(clip.views)} views</span>
        </div>

        <button
          onClick={onToggleMute}
          className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
        </button>
      </div>

      {/* Right-Side TikTok Engagement Rail */}
      <div className="absolute right-3 bottom-20 z-10 flex flex-col items-center gap-4 text-white">
        <button
          onClick={() => toggleClipLike(clip.id)}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform group-active:scale-125 ${
              clip.isLiked ? 'bg-rose-500/90' : 'bg-black/45 hover:bg-black/65'
            }`}
          >
            <Heart
              className={`w-5 h-5 ${clip.isLiked ? 'fill-white text-white' : ''}`}
            />
          </div>
          <span className="text-[11px] font-bold drop-shadow">
            {formatCompactCount(clip.likes)}
          </span>
        </button>

        <button
          onClick={() => onOpenComments(clip.id)}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold drop-shadow">
            {clip.comments.length}
          </span>
        </button>

        <button
          onClick={() => toggleClipSave(clip.id)}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md ${
              clip.isSaved ? 'bg-amber-500/90' : 'bg-black/45 hover:bg-black/65'
            }`}
          >
            <Bookmark
              className={`w-5 h-5 ${clip.isSaved ? 'fill-white text-white' : ''}`}
            />
          </div>
          <span className="text-[11px] font-bold drop-shadow">Save</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold drop-shadow">Share</span>
        </button>
      </div>

      {/* Bottom-Left Creator, Caption & Shoppable Tag */}
      <div className="absolute left-4 right-16 bottom-5 z-10 text-white space-y-2.5">
        <Link
          to={targetRoute}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg transition-transform hover:scale-105 ${
            clip.linkedType === 'product'
              ? 'bg-blue-600 text-white'
              : 'bg-emerald-500 text-slate-950'
          }`}
        >
          {clip.linkedType === 'product' ? (
            <Cpu className="w-3.5 h-3.5" />
          ) : (
            <FileCheck2 className="w-3.5 h-3.5" />
          )}
          <span className="truncate max-w-[200px] sm:max-w-[260px]">
            {clip.linkedType === 'product' ? 'Shop: ' : 'Apply: '}
            {clip.linkedLabel}
          </span>
        </Link>

        <div>
          <div className="text-xs font-bold text-slate-200">
            {clip.creatorHandle} · <span className="font-normal">{clip.creator}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-snug line-clamp-2 mt-0.5">
            {clip.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ClipsPage: React.FC = () => {
  const {
    clips,
    registerClipView,
    addClipComment,
    addUploadedClip,
    user,
  } = useApp();

  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');
  const [activeClipId, setActiveClipId] = useState(clips[0]?.id || '');
  const [isMuted, setIsMuted] = useState(true);
  const [commentClipId, setCommentClipId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Upload Modal State
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [coverTimestamp, setCoverTimestamp] = useState(0.05);
  const [isCustomCover, setIsCustomCover] = useState(false);
  const [extractingThumb, setExtractingThumb] = useState(false);
  const [clipTitle, setClipTitle] = useState('');
  const [linkedType, setLinkedType] = useState<'product' | 'service'>('product');
  const [linkedId, setLinkedId] = useState(PRODUCTS[0].id);

  const feedContainerRef = useRef<HTMLDivElement>(null);

  // Track which clip is centered in the snap container
  useEffect(() => {
    if (viewMode !== 'feed' || !feedContainerRef.current) return;
    const cards = feedContainerRef.current.querySelectorAll('[data-clip-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-clip-id');
            if (id) setActiveClipId(id);
          }
        });
      },
      { root: feedContainerRef.current, threshold: 0.65 }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [viewMode, clips.length]);

  const handleVideoFileSelect = async (file: File | null) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setUploadedVideoUrl(objectUrl);
    setIsCustomCover(false);
    setCoverTimestamp(0.05);
    setExtractingThumb(true);
    try {
      // TikTok default: automatically extract opening frame (0:00)
      const { thumbnailDataUrl, duration } = await extractVideoThumbnail(
        objectUrl,
        0.05
      );
      setThumbnailUrl(thumbnailDataUrl);
      setVideoDuration(duration);
    } catch {
      setThumbnailUrl(PRODUCTS[0].images[0]);
    } finally {
      setExtractingThumb(false);
    }
  };

  const handleScrubCover = async (newTime: number) => {
    setCoverTimestamp(newTime);
    setIsCustomCover(true);
    if (!uploadedVideoUrl) return;
    try {
      const { thumbnailDataUrl } = await extractVideoThumbnail(
        uploadedVideoUrl,
        newTime
      );
      setThumbnailUrl(thumbnailDataUrl);
    } catch {
      // keep existing thumbnail
    }
  };

  const handlePublishClip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedVideoUrl || !clipTitle.trim()) return;

    const linkedLabel =
      linkedType === 'product'
        ? PRODUCTS.find((p) => p.id === linkedId)?.name || 'Shema Electronics'
        : DIGITAL_SERVICES.find((s) => s.id === linkedId)?.title ||
          'Shema Digital Service';

    addUploadedClip({
      title: clipTitle.trim(),
      creator: user.name,
      creatorHandle: `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
      videoUrl: uploadedVideoUrl,
      thumbnailUrl: thumbnailUrl || PRODUCTS[0].images[0],
      linkedType,
      linkedId,
      linkedLabel,
    });

    setUploadOpen(false);
    setUploadedVideoUrl('');
    setThumbnailUrl('');
    setClipTitle('');
    setViewMode('grid');
  };

  const activeCommentClip = clips.find((c) => c.id === commentClipId);

  const jumpToClip = (id: string) => {
    setViewMode('feed');
    setActiveClipId(id);
    setTimeout(() => {
      const el = feedContainerRef.current?.querySelector(
        `[data-clip-id="${id}"]`
      );
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-5">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Shema Watch &amp; Shop
          </span>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
            Tech &amp; Service Clips
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('feed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'feed'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Feed</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>3:4 Grid</span>
            </button>
          </div>

          <button
            onClick={() => setUploadOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Video</span>
          </button>
        </div>
      </div>

      {/* FEED MODE (TikTok 9:16 Vertical Snap Scroll) */}
      {viewMode === 'feed' ? (
        <div className="flex justify-center">
          <div
            ref={feedContainerRef}
            className="w-full max-w-[400px] h-[calc(100dvh-13rem)] min-h-[500px] max-h-[700px] overflow-y-auto snap-y snap-mandatory space-y-4 rounded-3xl no-scrollbar"
          >
            {clips.map((clip) => (
              <div
                key={clip.id}
                data-clip-id={clip.id}
                className="w-full h-full snap-start snap-always"
              >
                <ClipPlayerCard
                  clip={clip}
                  isActive={activeClipId === clip.id}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((m) => !m)}
                  onViewTriggered={registerClipView}
                  onOpenComments={(id) => setCommentClipId(id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3:4 PROFILE GRID MODE (Shows Auto-Captured Default Thumbnails + View Counts) */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {clips.map((clip) => (
            <button
              key={clip.id}
              onClick={() => jumpToClip(clip.id)}
              className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-900 text-left cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={clip.thumbnailUrl}
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white space-y-1">
                <div className="inline-flex items-center gap-1 text-xs font-bold">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{formatCompactCount(clip.views)}</span>
                </div>
                <div className="text-[11px] font-medium line-clamp-2 text-slate-200">
                  {clip.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* COMMENTS DRAWER */}
      {activeCommentClip && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setCommentClipId(null)}
          />
          <div className="relative z-10 bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-sm text-slate-900">
                Comments ({activeCommentClip.comments.length})
              </h3>
              <button
                onClick={() => setCommentClipId(null)}
                className="p-1.5 rounded-lg bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 min-h-[160px]">
              {activeCommentClip.comments.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">
                  No comments yet. Be the first to ask about this item!
                </p>
              ) : (
                activeCommentClip.comments.map((c) => (
                  <div key={c.id} className="bg-slate-50 rounded-xl p-3 text-xs">
                    <div className="flex justify-between text-slate-500 mb-1">
                      <span className="font-bold text-slate-900">{c.author}</span>
                      <span>{c.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!commentText.trim()) return;
                addClipComment(activeCommentClip.id, commentText.trim());
                setCommentText('');
              }}
              className="flex gap-2 pt-2 border-t border-slate-100"
            >
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-slate-900 text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TIKTOK-STYLE VIDEO UPLOAD MODAL WITH AUTO DEFAULT THUMBNAIL */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs"
            onClick={() => setUploadOpen(false)}
          />
          <form
            onSubmit={handlePublishClip}
            className="relative z-10 bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900">
                  Upload Video Clip
                </h2>
                <p className="text-xs text-slate-500">
                  Default cover thumbnail is auto-captured from frame 0:00
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUploadOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Picker */}
            <label className="block border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center cursor-pointer bg-slate-50/70">
              <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900">
                {uploadedVideoUrl
                  ? 'Video selected! Click to replace'
                  : 'Select MP4 / WebM / MOV video file'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Opening frame is extracted automatically as the default thumbnail
              </div>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) =>
                  handleVideoFileSelect(e.target.files?.[0] || null)
                }
              />
            </label>

            {/* Auto-Captured Default Thumbnail Preview + Edit Cover Scrubber */}
            {uploadedVideoUrl && (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {isCustomCover
                      ? `Custom Cover (${coverTimestamp.toFixed(1)}s)`
                      : 'Default Thumbnail (Auto Frame 0:00)'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    {extractingThumb ? 'Extracting...' : 'Ready'}
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-24 aspect-3/4 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt="Auto-captured cover"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <Sliders className="w-3.5 h-3.5 text-blue-600" />
                      <span>Edit Cover (Optional)</span>
                    </div>
                    <input
                      type="range"
                      min={0.05}
                      max={Math.max(0.5, videoDuration)}
                      step={0.1}
                      value={coverTimestamp}
                      onChange={(e) => handleScrubCover(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-500">
                      Leave as-is to use TikTok-style automatic first-frame thumbnail, or drag to pick another frame.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Caption / Review Title
              </label>
              <input
                type="text"
                required
                value={clipTitle}
                onChange={(e) => setClipTitle(e.target.value)}
                placeholder="e.g. Quick review of my new LG OLED TV!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tag Type
                </label>
                <select
                  value={linkedType}
                  onChange={(e) => {
                    const next = e.target.value as 'product' | 'service';
                    setLinkedType(next);
                    setLinkedId(
                      next === 'product'
                        ? PRODUCTS[0].id
                        : DIGITAL_SERVICES[0].id
                    );
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="product">Electronics Product</option>
                  <option value="service">Digital Service</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Linked Item
                </label>
                <select
                  value={linkedId}
                  onChange={(e) => setLinkedId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  {(linkedType === 'product' ? PRODUCTS : DIGITAL_SERVICES).map(
                    (item) => (
                      <option key={item.id} value={item.id}>
                        {'name' in item ? item.name : item.title}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!uploadedVideoUrl || !clipTitle.trim()}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white text-sm font-bold cursor-pointer"
            >
              Publish Clip
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
