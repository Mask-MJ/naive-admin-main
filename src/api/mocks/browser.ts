import { setupWorker } from 'msw';
import { user } from './user';

export const worker = setupWorker(...user);
