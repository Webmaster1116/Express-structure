/**
 * Message constants
 */
const messages = {
    INVALID_AUTH_TOKEN: 'Auth token is invalid.',
    AUTH_ERROR: 'Sorry, your request could not be authenticated',
    INTERNAL_SERVER_ERROR: 'The request was not completed.',
    INVALID_PASSWORD: 'Invalid password.',
    INVALID_NEW_PASSWORD: 'New password is the same with your old one. Please try to change your password again.',
    USER_EMAIL_DUPLICATED: 'Sorry, this user already exists.',
    USER_DELETED: 'Sorry, this user is deleted.',
    ACCOUNT_NOT_EXIST: 'The account does not exist.',
    INVALID_OLD_PASSWORD: 'Old password does not match!',
    CHANGEPWD_ERROR: 'Sorry, you can not change the password.',
    USER_ALREADY_EXIST: "Can't register because already email existed.",
    CREATE_ACCOUNT_SUCCESS: "The account is created successfully.",
    RESET_PASSWORD_SUCCESSFULLY: 'Reseted your password successfully.',
    NOT_CREATED_ACCOUNT: "The Account doesn't exist.",
    PASSWORD_RESET_SUCCESS: "Your password changed successfully",
    
    CATEGORY_NOT_EXIST: 'The category does not exist.',
    CATEGORY_CREATE_SUCCESS: "The category is created successfully.",
    CATEGORY_UPDATE_SUCCESS: "The category is updated successfully.",
    CATEGORY_DELETE_SUCCESS: "The category is deleted successfully.",

    MEDIA_CREATE_SUCCESS: "The media is created successfully.",
    MEDIA_UPDATE_SUCCESS: "The media is updated successfully.",
    MEDIA_DELETE_SUCCESS: "The media is deleted successfully."
}

module.exports = messages
