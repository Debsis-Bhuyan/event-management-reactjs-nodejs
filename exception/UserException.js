class UserException extends Error {
    constructor(message) {
        super(message)
        this.name = "UserException"
    }
}
export default UserException