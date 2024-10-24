import React, { useState } from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';
import RecruiterSelection from './components/RecruiterSelection';
import JobSelector from './components/JobSelector';
import CandidateDashboard from './components/CandidateDashboard';

import logo from './assets/LogoSB.png';
import { Candidate } from './types/candidate';

function App() {
  const [selectedRecruiterId, setSelectedRecruiterId] = useState<number | null>(
    null
  );
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleRecruiterSelection = (recruiterId: number) => {
    setSelectedRecruiterId(recruiterId);
  };

  const handleJobSelection = (job: string, jobCandidates: Candidate[]) => {
    setSelectedJob(job);
    setCandidates(jobCandidates);
  };

  const handleBackToRecruiterSelection = () => {
    setSelectedRecruiterId(null);
    setSelectedJob(null);
    setCandidates([]);
  };

  const handleBackToJobSelection = () => {
    setSelectedJob(null);
    setCandidates([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center">
          <img
            src={logo}
            alt="Winder Logo"
            className="h-8 w-8 mr-3 object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">Winder Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {!selectedRecruiterId ? (
            <RecruiterSelection onSelectRecruiter={handleRecruiterSelection} />
          ) : !selectedJob ? (
            <JobSelector
              onSelectJob={handleJobSelection}
              onBack={handleBackToRecruiterSelection}
            />
          ) : (
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-lg font-semibold text-gray-800">
                  {selectedJob}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 mx-2" />
                <span className="text-lg font-semibold text-blue-600">
                  Candidate Dashboard
                </span>
              </div>
              <CandidateDashboard
                jobTitle={selectedJob}
                candidates={candidates}
                onBack={handleBackToJobSelection}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;