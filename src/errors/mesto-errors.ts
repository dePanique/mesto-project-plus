export interface IMestoErros extends Error {
  statusCode: number
}

export default class extends Error implements IMestoErros {
  statusCode;

  constructor(message: string = 'На сервере произошла ошибка', error: number = 500) {
    super(message);
    this.statusCode = error;
  }
}
