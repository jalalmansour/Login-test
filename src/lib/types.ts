import type { LucideIcon } from "lucide-react";

export type UserRole = 'ADMIN' | 'RRH' | 'RF' | 'MANAGER' | 'EMPLOYEE' | 'TRAINER';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar: string;
  skills: string[];
  pastTrainingHistory: string;
  department: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  category: string;
  durationHours: number;
  costPerParticipant: number;
  competencies: string[];
  prerequisites: string[];
}

export interface TrainingSession {
  id: string;
  trainingId: string;
  trainerId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isVirtual: boolean;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

export interface Enrollment {
    id: string;
    sessionId: string;
    userId: string;
    status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'ATTENDED' | 'ABSENT';
}

export interface NavItem {
  href: string;
  title: string;
  icon: LucideIcon;
  roles: UserRole[];
}
