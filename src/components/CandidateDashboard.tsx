import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import CandidateCard from './CandidateCard';
import { Candidate } from '../types/candidate';

interface CandidateDashboardProps {
  jobTitle: string;
  candidates: Candidate[];
  onBack: () => void;
}

const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ jobTitle, candidates, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCandidateAction = (action: 'accept' | 'reject' | 'pass') => {
    console.log(`Candidate ${candidates[currentIndex].name} ${action}ed`);
    
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const navigateCandidate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Candidates for {jobTitle}</h2>
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Job Selection
        </button>
      </div>
      {candidates.length > 0 ? (
        <div className="flex flex-col items-center">
          <CandidateCard
            candidate={candidates[currentIndex]}
            onAction={handleCandidateAction}
          />
          <div className="flex justify-between items-center w-full mt-6">
            <button
              onClick={() => navigateCandidate('prev')}
              disabled={currentIndex === 0}
              className={`flex items-center ${
                currentIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </button>
            <span className="text-gray-600">
              Candidate {currentIndex + 1} of {candidates.length}
            </span>
            <button
              onClick={() => navigateCandidate('next')}
              disabled={currentIndex === candidates.length - 1}
              className={`flex items-center ${
                currentIndex === candidates.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No candidates to review for this position.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;