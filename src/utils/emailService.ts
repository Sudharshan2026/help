import { Request } from '../types';

// Generate institutional email from roll number
const getInstitutionalEmail = (secRollNumber: string): string => {
  // Format: sec[YearBranch][RollNumber]@sairamtap.edu.in
  return `${secRollNumber.toLowerCase()}@sairamtap.edu.in`;
};

// Email templates
const getEmailTemplate = (request: Request): { subject: string; html: string } => {
  const isApproved = request.status === 'APPROVED';
  const statusColor = isApproved ? '#28a745' : '#dc3545';
  const statusText = isApproved ? 'Approved' : 'Rejected';

  const nextSteps = isApproved
    ? `
      <h3 style="color: #333; margin-top: 20px;">Next Steps:</h3>
      <ul style="color: #555;">
        ${request.type === 'OD' ? `
          <li>Download your OD approval letter from the portal</li>
          <li>Submit the approval letter to your class advisor</li>
          <li>Inform all subject handlers about your absence</li>
        ` : `
          <li>Submit any pending assignments upon return</li>
          <li>Collect missed class notes from your classmates</li>
          <li>Meet with your mentor to discuss any academic concerns</li>
        `}
      </ul>
    `
    : `
      <p style="color: #555; margin-top: 20px;">
        If you have any questions about this decision, please contact your mentor or the department office.
      </p>
    `;

  return {
    subject: `${request.type} Request ${statusText} - Ref: ${request.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/logo.png" 
               alt="Sri Sairam Engineering College" 
               style="max-width: 200px;">
        </div>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: ${statusColor}; margin-bottom: 20px; text-align: center;">
            ${request.type} Request ${statusText}
          </h2>
          
          <div style="margin-bottom: 20px;">
            <p style="color: #333; margin: 5px 0;"><strong>Student Name:</strong> ${request.studentName}</p>
            <p style="color: #333; margin: 5px 0;"><strong>Roll Number:</strong> ${request.secRollNumber}</p>
            <p style="color: #333; margin: 5px 0;"><strong>Reference Number:</strong> ${request.id}</p>
            <p style="color: #333; margin: 5px 0;"><strong>Duration:</strong> ${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}</p>
            <p style="color: #333; margin: 5px 0;"><strong>Reason:</strong> ${request.reason}</p>
          </div>

          ${nextSteps}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <h3 style="color: #333;">Need Help?</h3>
          <p style="color: #555;">
            Contact the Department Office:<br>
            Email: aids@sairam.edu.in<br>
            Phone: +91-44-22512111<br>
            Location: Department of AI&DS, Ground Floor, Block 1
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #777; font-size: 12px;">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Sri Sairam Engineering College. All rights reserved.</p>
        </div>
      </div>
    `
  };
};

// Send email notification
export const sendStatusNotification = async (request: Request): Promise<void> => {
  const recipientEmail = getInstitutionalEmail(request.secRollNumber);
  const { subject, html } = getEmailTemplate(request);

  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: recipientEmail,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    const result = await response.json();
    console.info('Email notification sent successfully', {
      requestId: request.id,
      recipient: recipientEmail,
      status: request.status,
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Failed to send email notification', {
      error: error instanceof Error ? error.message : 'Unknown error',
      requestId: request.id,
      recipient: recipientEmail,
      status: request.status
    });
    throw error;
  }
};