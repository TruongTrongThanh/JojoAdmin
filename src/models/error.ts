abstract class AppError implements Error {
  abstract name: string
  message: string

  constructor(message: string) {
    this.message = message
  }
}

export class NotFoundError extends AppError {
  name: string = 'Không tìm thấy'

  constructor(message?: string) {
    super(message || 'Không tìm thấy kết quả nào.')
  }
}

export class DuplicateError extends AppError {
  name: string = 'Trùng dữ liệu'

  constructor(message?: string) {
    super(message || 'Dữ liệu đã tồn tại.')
  }
}
