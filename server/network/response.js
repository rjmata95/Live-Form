function success(req,res,message,status) {
    console.log(`[procedure succeeded]`)
    res.status(status || 200).send({
        error: '',
        body: message
    })
}

function error (req,res,message,status,details) {
    console.error(`[Internal Error] : ${details}`);
    res.status(status || 500).send({
        error: message,
        body: ''
    })
}

module.exports = {
    success,
    error
}