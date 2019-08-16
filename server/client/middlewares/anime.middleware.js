module.exports = {
    async [NAME](req, res, next) {
        try {
           
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}