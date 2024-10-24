import React from 'react';
import { User, Star, Briefcase, GraduationCap, Award, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Candidate } from '../types/candidate';

interface CandidateCardProps {
  candidate: Candidate;
  onAction: (action: 'accept' | 'reject' | 'pass') => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onAction }) => {
  const fitScore = Math.floor(Math.random() * 41) + 60; // Random score between 60 and 100

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-full max-w-4xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <User className="h-16 w-16 text-gray-400 bg-gray-100 rounded-full p-3" />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold text-gray-900">{candidate.name} {candidate.surnames}</h3>
              <p className="text-sm text-gray-600">{candidate.city}, {candidate.country}</p>
            </div>
          </div>
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <Star className="h-6 w-6 text-yellow-400 mr-2" />
            <span className="text-lg font-medium text-blue-800">{fitScore}% Fit</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
              Work Experience
            </h4>
            {candidate.workHistory.map((work, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm font-medium text-gray-700">{work.position} at {work.company}</p>
                <p className="text-xs text-gray-500">
                  {new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Present'}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {candidate.hardSkills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
              Education
            </h4>
            {candidate.studies.map((study, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm font-medium text-gray-700">{study.title}</p>
                <p className="text-xs text-gray-500">{study.school}</p>
                <p className="text-xs text-gray-500">
                  {new Date(study.startDate).toLocaleDateString()} - {new Date(study.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Star className="h-5 w-5 mr-2 text-blue-600" />
              Languages
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {candidate.languages.map((lang, index) => (
                <li key={index}>{lang.language}: {lang.level} {lang.certificate ? `(${lang.certificate})` : ''}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 mb-3">About Me</h4>
          <p className="text-sm text-gray-700">{candidate.aboutMe}</p>
        </div>
      </div>
      
      <div className="bg-gray-100 px-6 py-4 flex justify-between">
        <button
          onClick={() => onAction('accept')}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-200"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Accept
        </button>
        <button
          onClick={() => onAction('reject')}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200"
        >
          <XCircle className="h-5 w-5 mr-2" />
          Reject
        </button>
        <button
          onClick={() => onAction('pass')}
          className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
        >
          <Clock className="h-5 w-5 mr-2" />
          Pass
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;