const { FAIL_STATUS, SUCCESS_STATUS } = require("./common");

const httpcodes = {
    unavailable: {
        code: 503,
        message: 'Service Unavailable',
        status: FAIL_STATUS
    },
    internalServErr: {
        code: 500,
        message: 'Internal Server Error',
        status: FAIL_STATUS
    },
    ok: {
        code: 200,
        message: 'ok',
        status: SUCCESS_STATUS
    },
    badReq: {
        code: 400,
        message: 'Bad Request',
        status: FAIL_STATUS
    },
    unAuth: {
        code: 401,
        message: 'unauthorized please signIn',
        status: FAIL_STATUS
    },
    forbidden: {
        code: 403,
        message: `Forbidden, you don't have right access to view`,
        status: FAIL_STATUS
    }
}

module.exports = httpcodes;