import { FileUp, Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useState } from "react";

export const DocumentUpload = ({
  fileType,
  onFileUpload,
  maxSizeInMB = 5
}: {
  fileType: string,
  onFileUpload: (file: File) => void,
  maxSizeInMB?: number
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSizeInMB) {
        setError(`File size exceeds ${maxSizeInMB}MB limit`);
        setSelectedFile(null);
        return;
      }

      // Validate file type
      const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        setError(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
      onFileUpload(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <Card className=" max-h-80 h-full w-full border-2 ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upload {fileType} Document</span>
          {selectedFile && (
            <button
              onClick={clearFile}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Clear file"
            >
              <X size={20} />
            </button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <input
          type="file"
          id={`file-upload-${fileType}`}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label
          htmlFor={`file-upload-${fileType}`}
          className={`
            cursor-pointer 
            flex items-center 
            p-3 
            border-2 
            border-dashed 
            rounded-lg 
            transition-all 
            duration-300
            ${error
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}
          `}
        >
          <FileUp className={`mr-2 ${error ? 'text-red-500' : 'text-gray-500'}`} />
          <span className={error ? 'text-red-500' : ''}>
            {error || (selectedFile
              ? `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
              : `Select ${fileType} File`)}
          </span>
        </label>

        {selectedFile && !error && (
          <div className="flex items-center text-green-600 space-x-2">
            <Check className="text-green-500" />
            <span>File ready to upload</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
