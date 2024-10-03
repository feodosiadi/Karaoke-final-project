import type { z } from 'zod';
import type { authSchema, userSchema } from './schema';

export type LoginForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  email: string;
  password: string;
  name: string;
};

export type BackendUserT = z.infer<typeof userSchema>;

export enum UserStatus {
  Pending = 'pending',
  Guest = 'guest',
  Logged = 'logged',
}

export type UserT =
  | { status: UserStatus.Pending }
  | { status: UserStatus.Guest }
  | ({ status: UserStatus.Logged } & BackendUserT);

export type AuthSchemaT = z.infer<typeof authSchema>;
