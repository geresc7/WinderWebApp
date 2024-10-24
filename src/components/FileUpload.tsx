import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  id: string;
  label: string;
  accept: string;
  multiple?: boolean;
  value: File | FileList | null;
  onChange: (files: File | FileList | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept,
  multiple = false,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(multiple ? e.target.files : e.target.files[0]);
    }
  };

  const getDisplayText = () => {
    if (!value) return 'No file chosen';
    if (value instanceof FileList) {
      return `${value.length} file(s) chosen`;
    }
    return value.name;
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
          accept={accept}
          multiple={multiple}
        />
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Upload className="h-5 w-5 mr-2" />
          Choose {multiple ? 'Files' : 'File'}
        </button>
        <span className="ml-3 text-sm text-gray-500">
          {getDisplayText()}
        </span>
      </div>
    </div>
  );
};

export default FileUpload;