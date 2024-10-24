import React, { useState } from 'react';
import { X } from 'lucide-react';
import { analyzeCVs } from '../utils/cvAnalyzer';
import { Candidate } from '../types/candidate';
import FileUpload from './FileUpload';
import IconSelector from './IconSelector';
import ColorSelector from './ColorSelector';
import { Toaster } from 'react-hot-toast';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: string, offerFile: File | null, candidates: Candidate[], icon: string, color: string) => void;
}

const NewJobModal: React.FC<NewJobModalProps> = ({ isOpen, onClose, onAddJob }) => {
  const [newJob, setNewJob] = useState('');
  const [offerFile, setOfferFile] = useState<File | null>(null);
  const [cvFiles, setCvFiles] = useState<FileList | null>(null);
  const [selectedIcon, setSelectedIcon] = useState('Briefcase');
  const [selectedColor, setSelectedColor] = useState('bg-blue-100');
  const [analyzedCandidates, setAnalyzedCandidates] = useState<Candidate[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setNewJob('');
    setOfferFile(null);
    setCvFiles(null);
    setSelectedIcon('Briefcase');
    setSelectedColor('bg-blue-100');
    setAnalyzedCandidates([]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newJob.trim()) {
      setError('Job title is required');
      return;
    }

    try {
      if (cvFiles && cvFiles.length > 0 && analyzedCandidates.length === 0) {
        await handleCvAnalysis();
      }
      onAddJob(newJob.trim(), offerFile, analyzedCandidates, selectedIcon, selectedColor);
      resetForm();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create job');
    }
  };

  const handleCvAnalysis = async () => {
    if (!cvFiles || cvFiles.length === 0) {
      setError('Please select CV files to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const candidates = await analyzeCVs(cvFiles);
      setAnalyzedCandidates(candidates);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to analyze CVs');
      setAnalyzedCandidates([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster />
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Create New Job Offer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={newJob}
              onChange={(e) => setNewJob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job title"
              required
            />
          </div>

          <IconSelector
            selectedIcon={selectedIcon}
            onSelectIcon={setSelectedIcon}
          />

          <ColorSelector
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          <FileUpload
            id="offerFile"
            label="Upload Job Offer File (PDF, Word)"
            accept=".pdf,.doc,.docx"
            value={offerFile}
            onChange={(file) => setOfferFile(file as File)}
          />

          <FileUpload
            id="cvFiles"
            label="Upload CVs (PDF, Word)"
            accept=".pdf,.doc,.docx"
            multiple
            value={cvFiles}
            onChange={(files) => setCvFiles(files as FileList)}
          />

          {cvFiles && cvFiles.length > 0 && analyzedCandidates.length === 0 && (
            <div className="mb-4">
              <button
                type="button"
                onClick={handleCvAnalysis}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing CVs...' : 'Analyze CVs'}
              </button>
            </div>
          )}

          {analyzedCandidates.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-green-600">
                {analyzedCandidates.length} candidate(s) analyzed successfully
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAnalyzing}
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewJobModal;