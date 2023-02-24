import { errorMessages } from '../utils/constants';

export default class extends Error {
  statusCode;

  constructor(message: string = errorMessages.conflictError) {
    super(message);
    this.statusCode = 409;
  }
}
