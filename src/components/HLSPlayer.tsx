import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
    src: string;
    className?: string;
    overlay?: boolean;
}

export default function HLSPlayer({ src, className, overlay }: HLSPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Check native HLS support first (Safari, iOS)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            return;
        }

        // Fall back to hls.js
        if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;
            hls.loadSource(src);
            hls.attachMedia(video);

            let recoveryAttempted = false;

            hls.on(Hls.Events.ERROR, (_event, data) => {
                if (data.fatal) {
                    if (!recoveryAttempted && data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                        recoveryAttempted = true;
                        hls.recoverMediaError();
                    } else {
                        // Fatal error with no recovery — hide video gracefully
                        setSupported(false);
                        hls.destroy();
                        hlsRef.current = null;
                    }
                }
            });

            return () => {
                hls.destroy();
                hlsRef.current = null;
            };
        }

        // No HLS support at all
        setSupported(false);
    }, [src]);

    if (!supported) return null;

    return (
        <div className={`relative ${className ?? ''}`}>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
            />
            {overlay && (
                <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            )}
        </div>
    );
}
