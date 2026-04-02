import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HLSPlayer from './HLSPlayer';

const mockHlsInstance = {
    loadSource: vi.fn(),
    attachMedia: vi.fn(),
    on: vi.fn(),
    destroy: vi.fn(),
    recoverMediaError: vi.fn(),
};

vi.mock('hls.js', () => {
    function MockHls() {
        return mockHlsInstance;
    }
    MockHls.isSupported = vi.fn(() => true);
    MockHls.Events = {
        ERROR: 'hlsError',
        MANIFEST_PARSED: 'hlsManifestParsed',
    };
    MockHls.ErrorTypes = {
        MEDIA_ERROR: 'mediaError',
        NETWORK_ERROR: 'networkError',
    };
    return { default: MockHls };
});

// Import Hls after mock is set up
import Hls from 'hls.js';

describe('HLSPlayer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset mock instance methods
        mockHlsInstance.loadSource.mockClear();
        mockHlsInstance.attachMedia.mockClear();
        mockHlsInstance.on.mockClear();
        mockHlsInstance.destroy.mockClear();
        mockHlsInstance.recoverMediaError.mockClear();
        // Default: no native HLS support
        HTMLVideoElement.prototype.canPlayType = vi.fn(() => '' as CanPlayTypeResult);
        (Hls.isSupported as ReturnType<typeof vi.fn>).mockReturnValue(true);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders a video element with correct attributes', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" />);
        const video = document.querySelector('video');
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('autoplay');
        expect(video).toHaveAttribute('loop');
        expect(video?.muted).toBe(true);
        expect(video?.playsInline).toBe(true);
    });

    it('renders dark overlay when overlay prop is true', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" overlay />);
        const overlay = document.querySelector('[aria-hidden="true"]');
        expect(overlay).toBeInTheDocument();
        expect(overlay).toHaveClass('bg-black/60');
    });

    it('does not render overlay when overlay prop is absent', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" />);
        const overlay = document.querySelector('[aria-hidden="true"]');
        expect(overlay).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" className="custom-class" />);
        const container = document.querySelector('.custom-class');
        expect(container).toBeInTheDocument();
    });

    it('uses native HLS when browser supports it', () => {
        HTMLVideoElement.prototype.canPlayType = vi.fn((type: string) =>
            type === 'application/vnd.apple.mpegurl' ? 'maybe' : ''
        );

        render(<HLSPlayer src="https://example.com/video.m3u8" />);
        const video = document.querySelector('video') as HTMLVideoElement;
        expect(video.src).toContain('video.m3u8');
        // hls.js should NOT have been used
        expect(mockHlsInstance.loadSource).not.toHaveBeenCalled();
    });

    it('uses hls.js when native HLS is not supported', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" />);
        expect(mockHlsInstance.loadSource).toHaveBeenCalledWith('https://example.com/video.m3u8');
        expect(mockHlsInstance.attachMedia).toHaveBeenCalled();
    });

    it('registers error handler on hls.js instance', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" />);
        expect(mockHlsInstance.on).toHaveBeenCalledWith('hlsError', expect.any(Function));
    });

    it('cleans up hls.js instance on unmount', () => {
        const { unmount } = render(<HLSPlayer src="https://example.com/video.m3u8" />);
        unmount();
        expect(mockHlsInstance.destroy).toHaveBeenCalled();
    });

    it('renders nothing when hls.js is not supported and no native support', () => {
        (Hls.isSupported as ReturnType<typeof vi.fn>).mockReturnValue(false);
        const { container } = render(<HLSPlayer src="https://example.com/video.m3u8" />);
        expect(container.querySelector('video')).not.toBeInTheDocument();
    });

    it('attempts media error recovery on fatal media error', () => {
        render(<HLSPlayer src="https://example.com/video.m3u8" />);

        // Get the error handler
        const errorCall = mockHlsInstance.on.mock.calls.find(
            (call: unknown[]) => call[0] === 'hlsError'
        );
        expect(errorCall).toBeDefined();
        const errorHandler = errorCall![1] as (event: string, data: { fatal: boolean; type: string }) => void;

        // Simulate fatal media error
        errorHandler('hlsError', {
            fatal: true,
            type: 'mediaError',
        });

        expect(mockHlsInstance.recoverMediaError).toHaveBeenCalled();
    });
});
