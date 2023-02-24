import { errorMessages } from '../utils/constants';

export default class extends Error {
  statusCode;

  constructor(message: string = errorMessages.forbiddenError) {
    super(message);
    this.statusCode = 403;
  }
}
