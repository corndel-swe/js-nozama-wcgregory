// https://tech-docs.corndel.com/express/sending-errors.html

export class AppError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
  }
}

export class Account {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
  }

  updateUsername(newUsername, password) {
    // If newUsername is not given, throw an AppError with code 400 (Bad Request)
    // If password is not given, throw an AppError with code 401 (Unauthorized)
    // If password is given but not correct, throw an AppError with code 403 (Forbidden)
    // If newUsername is given and password is correct, update the username
    if (!newUsername) {
      throw new AppError("Bad Request", 400)
    }

    if (!password) {
      throw new AppError("Unauthorized", 401)
    }

    if (password !== this.password) {
      throw new AppError("Forbidden", 403)
    }

    this.username = newUsername
  }
}
