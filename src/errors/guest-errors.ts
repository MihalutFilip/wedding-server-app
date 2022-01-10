export class GuestError extends Error {
    constructor(message: any) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
    }
}

export class GuestNotFoundError extends GuestError {
    constructor(message: any) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
    }
}

export class GuestAlreadyAddedError extends GuestError {
    constructor(message: any) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
    }
}