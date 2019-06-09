export class NotFoundError implements Error {
  name: string = '404'
  message: string
  stack?: string | undefined

  constructor(message: string) {
    this.message = message
  }
}
