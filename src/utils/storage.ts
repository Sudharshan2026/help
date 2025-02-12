import { Request } from '../types';
import { sendStatusNotification } from './emailService';

const REQUESTS_KEY = 'college_requests';
const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be handled securely

export const saveRequest = (request: Request) => {
  const requests = getRequests();
  requests.push(request);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
};

export const getRequests = (): Request[] => {
  const data = localStorage.getItem(REQUESTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const updateRequest = async (requestId: string, updates: Partial<Request>) => {
  const requests = getRequests();
  const index = requests.findIndex((r) => r.id === requestId);
  
  if (index !== -1) {
    const oldStatus = requests[index].status;
    const newStatus = updates.status;
    
    // Update the request
    requests[index] = { ...requests[index], ...updates };
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));

    // Send notification if status has changed to APPROVED or REJECTED
    if (newStatus && ['APPROVED', 'REJECTED'].includes(newStatus) && newStatus !== oldStatus) {
      try {
        await sendStatusNotification(requests[index]);
      } catch (error) {
        console.error('Failed to send notification after status update', {
          error: error instanceof Error ? error.message : 'Unknown error',
          requestId,
          oldStatus,
          newStatus
        });
        
        // Don't throw the error - we don't want to prevent the status update
        // just because the notification failed
      }
    }
  }
};

export const validateAdmin = (password: string) => {
  return password === ADMIN_PASSWORD;
};

export const exportToCSV = (requests: Request[]) => {
  const headers = [
    'ID',
    'Student ID', 
    'Student Name',
    'Type',
    'Start Date',
    'End Date',
    'Reason',
    'Status',
    'Created At',
    'Registration Number',
    'Year of Study',
    'Section',
    'Mentor Name',
    'Protocol Type',
    'Event Type',
    'Team Name',
    'Document URL',
    'Auth Letter URL',
    'Attendance Percentage',
    'Number of Arrears'
  ];
  const rows = requests.map((r) => [
    r.id,
    r.secRollNumber,
    r.studentName,
    r.type,
    r.startDate,
    r.endDate,
    r.reason,
    r.status,
    r.createdAt,
    r.regRollNumber,
    r.yearOfStudy,
    r.section,
    r.mentorName,
    r.protocolType,
    r.eventType,
    r.teamName,
    r.documentUrl,
    r.authLetterUrl,
    r.attendancePercentage,
    r.numberOfArrears
  ]);




  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `requests_${new Date().toISOString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};