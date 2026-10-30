export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'NEW' | 'ASSIGNED' | 'RESOLVED';
  ticketId: string;
}

// In-memory persistent registry for contact messages across serverless invocations
declare global {
  var __estateos_contact_submissions: ContactSubmission[] | undefined;
}

if (!global.__estateos_contact_submissions) {
  global.__estateos_contact_submissions = [];
}

export const contactRegistry = {
  add(submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'ticketId' | 'status'>): ContactSubmission {
    const ticketId = `EOS-TKT-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry: ContactSubmission = {
      ...submission,
      id: `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ticketId,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    global.__estateos_contact_submissions!.unshift(newEntry);
    return newEntry;
  },

  getAll(): ContactSubmission[] {
    return global.__estateos_contact_submissions || [];
  },

  getById(id: string): ContactSubmission | undefined {
    return global.__estateos_contact_submissions?.find(s => s.id === id || s.ticketId === id);
  }
};
