import { useRef, useState } from "react";

interface PublicidadVideoProps {
  src: string; // Ruta del video
}

const PublicidadVideo: React.FC<PublicidadVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFinalizado, setVideoFinalizado] = useState<boolean>(false);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pausar el video al finalizar
      setVideoFinalizado(true); // Marcar que el video terminó
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{ display: "block" }}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
    </div>
  );
};

export default PublicidadVideo;
