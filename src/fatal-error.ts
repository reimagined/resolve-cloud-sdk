const FATAL_ERROR_MESSAGE = 'Please contact the ReSolve team by e-mail: reimagined@devexpress.com'

export class FatalError extends Error {
  constructor(message?: string) {
    super(
      message == null || message.trim() === ''
        ? FATAL_ERROR_MESSAGE
        : `${message}. ${FATAL_ERROR_MESSAGE}`
    )
  }
}
