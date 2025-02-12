import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveRequest } from '../utils/storage';
import type { Request } from '../types';

interface RequestFormProps {
  type: 'OD' | 'LEAVE';
}

export const RequestForm: React.FC<RequestFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    secRollNumber: '',
    regRollNumber: '',
    yearOfStudy: '2' as const,
    section: 'A' as const,
    startDate: '',
    endDate: '',
    mentorName: 'John Doe' as string,
    protocolType: 'INTERNAL' as const,
    eventType: 'Workshop' as const,
    teamName: '',
    reason: '',
    document: null as File | null,
    authLetter: null as File | null,
    attendancePercentage: '',
    numberOfArrears: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: Request = {
      id: crypto.randomUUID(),
      studentName: formData.studentName,
      secRollNumber: formData.secRollNumber,
      regRollNumber: formData.regRollNumber,
      yearOfStudy: formData.yearOfStudy,
      section: formData.section,
      type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      mentorName: type === 'LEAVE' ? formData.mentorName : undefined,
      protocolType: formData.protocolType,
      eventType: type === 'OD' ? formData.eventType : undefined,
      teamName: type === 'OD' ? formData.teamName : undefined,
      reason: formData.reason,
      documentUrl: formData.document ? URL.createObjectURL(formData.document) : undefined,
      authLetterUrl: formData.authLetter ? URL.createObjectURL(formData.authLetter) : undefined,
      attendancePercentage: Number(formData.attendancePercentage),
      numberOfArrears: Number(formData.numberOfArrears),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    saveRequest(request);
    navigate('/status', { state: { secRollNumber: formData.secRollNumber } });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#bd9607]">
        {type === 'LEAVE' ? 'Leave Request Form' : 'On-Duty Request Form'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SEC Roll Number</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              value={formData.secRollNumber}
              onChange={(e) => setFormData({ ...formData, secRollNumber: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Roll Number</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              value={formData.regRollNumber}
              onChange={(e) => setFormData({ ...formData, regRollNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year of Study</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              value={formData.yearOfStudy}
              onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value as '2' | '3' | '4' })}
            >
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value as 'A' | 'B' | 'C' })}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        {type === 'LEAVE' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                  value={formData.endDate}
                  min={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mentor Name</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
              >
                <option value="John Doe">John Doe</option>
                <option value="John Wick">John Wick</option>
                <option value="Jack Sparrow">Jack Sparrow</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                  value={formData.endDate}
                  min={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Protocol Classification</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                  value={formData.protocolType}
                  onChange={(e) => setFormData({ ...formData, protocolType: e.target.value as 'INTERNAL' | 'EXTERNAL' })}
                >
                  <option value="INTERNAL">Internal OD</option>
                  <option value="EXTERNAL">External OD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value as 'Workshop' | 'Symposium' | 'Hackathon' | 'Other' })}
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Symposium">Symposium</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Team Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="Enter team name (if applicable)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Verification Document</label>
              <input
                type="file"
                required
                className="mt-1 block w-full"
                onChange={(e) => setFormData({ ...formData, document: e.target.files?.[0] || null })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Authorization Letter</label>
              <input
                type="file"
                required
                className="mt-1 block w-full"
                onChange={(e) => setFormData({ ...formData, authLetter: e.target.files?.[0] || null })}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for taking {type === 'LEAVE' ? 'Leave' : 'OD'}
          </label>
          <textarea
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Under 50 words"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Attendance Percentage</label>
            <input
              type="number"
              required
              min="0"
              max="100"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              value={formData.attendancePercentage}
              onChange={(e) => setFormData({ ...formData, attendancePercentage: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Arrears</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#bd9607] focus:ring focus:ring-[#bd9607] focus:ring-opacity-50"
              value={formData.numberOfArrears}
              onChange={(e) => setFormData({ ...formData, numberOfArrears: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#bd9607] text-white py-2 px-4 rounded-md hover:bg-[#a68206] focus:outline-none focus:ring-2 focus:ring-[#bd9607] focus:ring-opacity-50"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
};