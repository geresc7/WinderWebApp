import React, { useState } from 'react';
import { Briefcase, Plus, ArrowLeft, FileText, Users, Code, PenTool, BarChart, Megaphone, Coffee, Zap, Star } from 'lucide-react';
import NewJobModal from './NewJobModal';
import { Candidate } from '../types/candidate';

interface JobSelectorProps {
  onSelectJob: (job: string, candidates: Candidate[]) => void;
  onBack: () => void;
}

interface Job {
  title: string;
  offerFile: File | null;
  candidates: Candidate[];
  icon: string;
  color: string;
}

const iconComponents: { [key: string]: React.ElementType } = {
  Briefcase, Code, PenTool, BarChart, Megaphone, Coffee, Zap, Star
};

const JobSelector: React.FC<JobSelectorProps> = ({ onSelectJob, onBack }) => {
  const [jobs, setJobs] = useState<Job[]>([
    { title: 'Software Engineer', offerFile: null, candidates: [], icon: 'Code', color: 'bg-blue-100' },
    { title: 'Product Manager', offerFile: null, candidates: [], icon: 'Coffee', color: 'bg-green-100' },
    { title: 'UX Designer', offerFile: null, candidates: [], icon: 'PenTool', color: 'bg-pink-100' },
    { title: 'Data Analyst', offerFile: null, candidates: [], icon: 'BarChart', color: 'bg-purple-100' },
    { title: 'Marketing Specialist', offerFile: null, candidates: [], icon: 'Megaphone', color: 'bg-yellow-100' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJob = (newJobTitle: string, offerFile: File | null, candidates: Candidate[], icon: string, color: string) => {
    setJobs([...jobs, { title: newJobTitle, offerFile, candidates, icon, color }]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
            aria-label="Go back to profile selection"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900">Select a Job Opening</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
          aria-label="Add new job offer"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => {
          const IconComponent = iconComponents[job.icon];
          return (
            <button
              key={index}
              onClick={() => onSelectJob(job.title, job.candidates)}
              className={`flex flex-col items-start p-4 rounded-lg transition duration-150 ease-in-out ${job.color}`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-lg font-medium text-gray-800">{job.title}</span>
                <IconComponent className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex items-center text-sm mt-2 text-gray-600">
                <FileText className="h-4 w-4 mr-1" />
                <span>{job.offerFile ? 'Offer file uploaded' : 'No offer file'}</span>
              </div>
              <div className="flex items-center text-sm mt-1 text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span>{job.candidates.length > 0 ? `${job.candidates.length} candidate(s)` : 'No candidates'}</span>
              </div>
            </button>
          );
        })}
      </div>
      <NewJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
};

export default JobSelector;