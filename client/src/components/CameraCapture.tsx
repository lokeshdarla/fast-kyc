import { Camera, Check, RefreshCw, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export const CameraCapture = ({
  onCapture
}: {
  onCapture: (imageBlob: Blob) => void
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setCapturedImage(null);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const { videoWidth, videoHeight } = videoRef.current;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Flip horizontally
        context.translate(videoWidth, 0);
        context.scale(-1, 1);

        // Draw the flipped image
        context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

        // Convert to Blob and set the image
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
            //@ts-ignore
            setCapturedImage(canvasRef.current.toDataURL()); // Save as Data URL
          }
        });

        stopCamera();
      }
    }
  };


  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Selfie Verification</CardTitle>
        {capturedImage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={stopCamera}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" /> Reset
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
              />
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="hidden"
              />
              <div className="absolute bottom-4 flex space-x-4">
                <Button onClick={startCamera} variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" /> Start Camera
                </Button>
                <Button onClick={captureImage} size="sm" disabled={!stream}>
                  <Check className="mr-2 h-4 w-4" /> Capture Selfie
                </Button>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 w-full flex justify-center">
                <Button
                  onClick={() => {
                    stopCamera();
                    startCamera();
                  }}
                  size="sm"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Retake Selfie
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
