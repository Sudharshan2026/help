export interface Student {
  id: string;
  name: string;
}

export interface Request {
  id: string;
  studentName: string;
  secRollNumber: string;
  regRollNumber: string;
  yearOfStudy: '2' | '3' | '4';
  section: 'A' | 'B' | 'C';
  type: 'OD' | 'LEAVE';
  startDate: string;
  endDate: string;
  mentorName?: string;
  protocolType: 'INTERNAL' | 'EXTERNAL';
  eventType?: 'Workshop' | 'Symposium' | 'Hackathon' | 'Other';
  teamName?: string;
  reason: string;
  documentUrl?: string;
  authLetterUrl?: string;
  attendancePercentage: number;
  numberOfArrears: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}