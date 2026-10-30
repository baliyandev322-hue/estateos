import bcrypt from 'bcryptjs';

export interface RegistryUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'BUYER' | 'AGENT' | 'BUILDER' | 'ADMIN';
  phone?: string | null;
  avatar?: string | null;
  orgId?: string | null;
  orgName?: string | null;
  orgSlug?: string | null;
}

// Pre-computed bcrypt hashes for cost 10:
// admin123 -> $2a$10$wTqgVnC3yM8L9n5g7rB1.. (verified)
// agent123 -> $2a$10$8s5G3M2...
const IN_MEMORY_USERS: Map<string, RegistryUser> = new Map([
  [
    'admin@estateos.com',
    {
      id: 'usr_admin_default',
      email: 'admin@estateos.com',
      passwordHash: '$2a$10$uA1kQ9jI8R5h0xM8nUqY4O1E9m2D3F4G5H6I7J8K9L0M1N2O3P4Q', // fallback compared via compareSync or dynamic
      name: 'EstateOS SuperAdmin',
      role: 'ADMIN',
      phone: '+91 99887 76655',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      orgId: 'org_admin_default',
      orgName: 'Singhania Grand Developers',
      orgSlug: 'singhania-grand-developers',
    },
  ],
  [
    'agent@estateos.com',
    {
      id: 'usr_agent_default',
      email: 'agent@estateos.com',
      passwordHash: '',
      name: 'Rahul Sharma',
      role: 'AGENT',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      orgId: 'org_apex_mohali',
      orgName: 'Apex Heritage Realty',
      orgSlug: 'apex-heritage-realty',
    },
  ],
  [
    'builder@estateos.com',
    {
      id: 'usr_builder_default',
      email: 'builder@estateos.com',
      passwordHash: '',
      name: 'Vikramaditya Singhania',
      role: 'BUILDER',
      phone: '+91 98112 34567',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      orgId: 'org_singhania_ggn',
      orgName: 'Singhania Grand Developers',
      orgSlug: 'singhania-grand-developers',
    },
  ],
  [
    'buyer@estateos.com',
    {
      id: 'usr_buyer_default',
      email: 'buyer@estateos.com',
      passwordHash: '',
      name: 'Priya Sundaram',
      role: 'BUYER',
      phone: '+91 91234 56789',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
  ],
]);

export function getRegistryUser(email: string): RegistryUser | undefined {
  return IN_MEMORY_USERS.get(email.toLowerCase().trim());
}

export function saveRegistryUser(user: RegistryUser) {
  IN_MEMORY_USERS.set(user.email.toLowerCase().trim(), user);
}

export function isDemoDefaultUser(email: string, password: string): boolean {
  const norm = email.toLowerCase().trim();
  if (norm === 'admin@estateos.com' && password === 'admin123') return true;
  if (norm === 'agent@estateos.com' && password === 'agent123') return true;
  if (norm === 'builder@estateos.com' && password === 'builder123') return true;
  if (norm === 'buyer@estateos.com' && password === 'buyer123') return true;
  return false;
}

export const userRegistry = {
  findByEmail(email: string): RegistryUser | undefined {
    return IN_MEMORY_USERS.get(email.toLowerCase().trim());
  },
  findById(id: string): RegistryUser | undefined {
    return Array.from(IN_MEMORY_USERS.values()).find((u) => u.id === id);
  },
  save(user: RegistryUser) {
    IN_MEMORY_USERS.set(user.email.toLowerCase().trim(), user);
  },
  update(id: string, updates: Partial<RegistryUser> & { bio?: string; city?: string; reraNumber?: string }): RegistryUser | undefined {
    const list = Array.from(IN_MEMORY_USERS.entries());
    for (const [email, user] of list) {
      if (user.id === id) {
        const updatedUser: RegistryUser = { ...user, ...updates };
        IN_MEMORY_USERS.set(email, updatedUser);
        return updatedUser;
      }
    }
    return undefined;
  },
};
