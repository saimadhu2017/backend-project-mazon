const httpcodes = {
    unavailable: {
        code: 503,
        message: 'Service Unavailable',
        status: 'fail'
    },
    internalServErr: {
        code: 500,
        message: 'Internal Server Error',
        status: 'fail'
    },
    ok: {
        code: 200,
        message: 'ok',
        status: 'success'
    },
    badReq: {
        code: 400,
        message: 'Bad Request',
        status: 'fail'
    }
}

module.exports = httpcodes;