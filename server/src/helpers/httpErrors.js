export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Invalid input') {
    super(400, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'User is unauthorized') {
    super(401, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Access is forbidden') {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(resource = 'Resource') {
    super(404, resource + ' is not found');
  }
}

export class ConflictError extends HttpError {
  constructor(entity = 'Entity') {
    super(409, entity + ' already exists');
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}
