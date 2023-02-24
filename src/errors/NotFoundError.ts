import { errorMessages } from '../utils/constants';

export default class extends Error {
  statusCode;

  constructor(message: string = errorMessages.notFoundError) {
    super(message);
    this.statusCode = 404;
  }
}
