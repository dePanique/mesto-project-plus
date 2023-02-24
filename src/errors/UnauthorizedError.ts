import { errorMessages } from '../utils/constants';

export default class extends Error {
  statusCode;

  constructor(message: string = errorMessages.unauthorizedError) {
    super(message);
    this.statusCode = 401;
  }
}
