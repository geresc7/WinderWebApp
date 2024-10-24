import { Candidate } from '../types/candidate';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3000/api';

interface ApiResponse {
  candidates: Candidate[];
  warnings?: string[];
  error?: string;
}

export const analyzeCVs = async (cvFiles: FileList): Promise<Candidate[]> => {
  if (!cvFiles || cvFiles.length === 0) {
    throw new Error('Please select CV files to analyze');
  }

  const formData = new FormData();
  Array.from(cvFiles).forEach(file => {
    formData.append('cvFiles', file);
  });

  try {
    const response = await fetch(`${API_URL}/analyze-cvs`, {
      method: 'POST',
      body: formData,
      // Remove any default headers that might interfere with the multipart/form-data
      headers: {},
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze CVs');
    }

    const data: ApiResponse = await response.json();

    // Show warnings if any
    if (data.warnings && data.warnings.length > 0) {
      data.warnings.forEach(warning => {
        toast.warning(warning, {
          duration: 5000,
          position: 'bottom-right',
        });
      });
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No candidates could be extracted from the provided files');
    }

    toast.success(`Successfully analyzed ${data.candidates.length} CV(s)`, {
      duration: 3000,
      position: 'bottom-right',
    });

    return data.candidates;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to analyze CVs';
    toast.error(message, {
      duration: 5000,
      position: 'bottom-right',
    });
    throw error;
  }
};