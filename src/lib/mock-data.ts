import type { User, Training, TrainingSession, Enrollment, UserRole } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@ehc.com',
    role: 'ADMIN',
    avatar: 'https://i.pravatar.cc/150?u=admin@ehc.com',
    skills: ['Project Management', 'System Administration', 'Security'],
    pastTrainingHistory: 'Completed "Advanced Security" and "Leadership" courses.',
    department: 'IT',
  },
  {
    id: 'user-2',
    firstName: 'Rhonda',
    lastName: 'Hughes',
    email: 'rrh@ehc.com',
    role: 'RRH',
    avatar: 'https://i.pravatar.cc/150?u=rrh@ehc.com',
    skills: ['HR Policies', 'Recruitment', 'Employee Relations'],
    pastTrainingHistory: 'Completed "HR Management" course.',
    department: 'Human Resources',
  },
  {
    id: 'user-3',
    firstName: 'Frank',
    lastName: 'Russo',
    email: 'rf@ehc.com',
    role: 'RF',
    avatar: 'https://i.pravatar.cc/150?u=rf@ehc.com',
    skills: ['Financial Analysis', 'Budgeting', 'Excel'],
    pastTrainingHistory: 'Completed "Advanced Excel" course.',
    department: 'Finance',
  },
  {
    id: 'user-4',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'manager@ehc.com',
    role: 'MANAGER',
    avatar: 'https://i.pravatar.cc/150?u=manager@ehc.com',
    skills: ['Team Leadership', 'React', 'Node.js'],
    pastTrainingHistory: 'Completed "React Best Practices" and "Effective Management" courses.',
    department: 'Engineering',
  },
  {
    id: 'user-5',
    firstName: 'John',
    lastName: 'Doe',
    email: 'employee@ehc.com',
    role: 'EMPLOYEE',
    avatar: 'https://i.pravatar.cc/150?u=employee@ehc.com',
    skills: ['JavaScript', 'CSS', 'HTML'],
    pastTrainingHistory: 'New hire, no training history yet.',
    department: 'Engineering',
  },
  {
    id: 'user-6',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'trainer@ehc.com',
    role: 'TRAINER',
    avatar: 'https://i.pravatar.cc/150?u=trainer@ehc.com',
    skills: ['Public Speaking', 'Curriculum Development', 'React'],
    pastTrainingHistory: 'Certified trainer for multiple technologies.',
    department: 'Training',
  },
];

export const trainings: Training[] = [
    {
        id: 'train-1',
        title: 'Advanced React Patterns',
        description: 'Deep dive into advanced React concepts including hooks, context, and performance optimization.',
        category: 'Technical',
        durationHours: 16,
        costPerParticipant: 500,
        competencies: ['React', 'JavaScript', 'Frontend Development'],
        prerequisites: ['Basic understanding of React'],
    },
    {
        id: 'train-2',
        title: 'Node.js for Enterprise',
        description: 'Learn how to build scalable and secure backend services with Node.js and Express.',
        category: 'Technical',
        durationHours: 24,
        costPerParticipant: 750,
        competencies: ['Node.js', 'Backend Development', 'API Design'],
        prerequisites: ['Experience with JavaScript'],
    },
    {
        id: 'train-3',
        title: 'Effective Leadership & Management',
        description: 'Develop key leadership skills including communication, team motivation, and conflict resolution.',
        category: 'Soft Skills',
        durationHours: 12,
        costPerParticipant: 400,
        competencies: ['Leadership', 'Management', 'Communication'],
        prerequisites: ['Team lead or manager role recommended'],
    },
    {
        id: 'train-4',
        title: 'Cybersecurity Fundamentals',
        description: 'An introduction to the core concepts of cybersecurity, threat vectors, and defense mechanisms.',
        category: 'Security',
        durationHours: 8,
        costPerParticipant: 300,
        competencies: ['Security', 'Risk Management'],
        prerequisites: [],
    },
    {
      id: 'train-5',
      title: 'Introduction to UI/UX Design',
      description: 'Learn the fundamentals of User Interface and User Experience design principles.',
      category: 'Design',
      durationHours: 20,
      costPerParticipant: 600,
      competencies: ['UI/UX', 'Figma', 'User Research'],
      prerequisites: [],
    }
];

export const availableTrainingsDescription = trainings.map(t => `- ${t.title}: ${t.description}`).join('\n');

export const sessions: TrainingSession[] = [
    {
        id: 'session-1',
        trainingId: 'train-1',
        trainerId: 'user-6',
        startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 11)),
        location: 'Virtual',
        isVirtual: true,
        status: 'PLANNED',
    },
    {
        id: 'session-2',
        trainingId: 'train-3',
        trainerId: 'user-6',
        startDate: new Date(new Date().setDate(new Date().getDate() + 20)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 20)),
        location: 'HQ, Room 404',
        isVirtual: false,
        status: 'PLANNED',
    },
    {
        id: 'session-3',
        trainingId: 'train-2',
        trainerId: 'user-6',
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
        endDate: new Date(new Date().setDate(new Date().getDate() - 3)),
        location: 'Virtual',
        isVirtual: true,
        status: 'COMPLETED',
    },
];

export const enrollments: Enrollment[] = [
    {
        id: 'enroll-1',
        sessionId: 'session-1',
        userId: 'user-5',
        status: 'PENDING_APPROVAL',
    },
    {
        id: 'enroll-2',
        sessionId: 'session-2',
        userId: 'user-4',
        status: 'APPROVED',
    },
    {
        id: 'enroll-3',
        sessionId: 'session-3',
        userId: 'user-5',
        status: 'ATTENDED',
    },
];

export const userRoles: UserRole[] = ['ADMIN', 'RRH', 'RF', 'MANAGER', 'EMPLOYEE', 'TRAINER'];

export const findUserById = (id: string) => users.find(u => u.id === id);
export const findTrainingById = (id: string) => trainings.find(t => t.id === id);
export const findSessionById = (id: string) => sessions.find(s => s.id === id);
