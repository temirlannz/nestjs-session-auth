import { UserEntity } from './modules/user/entities';

declare module 'express' {
  export interface Request {
    user?: UserEntity;
  }
}
