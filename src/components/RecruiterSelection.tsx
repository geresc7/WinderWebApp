import React from 'react';
import { User } from 'lucide-react';

interface Recruiter {
  id: number;
  name: string;
  photoUrl: string;
}

interface RecruiterSelectionProps {
  onSelectRecruiter: (recruiterId: number) => void;
}

const recruiters: Recruiter[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Bob Smith',
    photoUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Carol White',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const RecruiterSelection: React.FC<RecruiterSelectionProps> = ({ onSelectRecruiter }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recruiters.map((recruiter) => (
          <button
            key={recruiter.id}
            onClick={() => onSelectRecruiter(recruiter.id)}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            {recruiter.photoUrl ? (
              <img
                src={recruiter.photoUrl}
                alt={recruiter.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <User className="w-24 h-24 text-gray-400 bg-gray-200 rounded-full p-4 mb-4" />
            )}
            <span className="text-lg font-medium text-gray-900">{recruiter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecruiterSelection;