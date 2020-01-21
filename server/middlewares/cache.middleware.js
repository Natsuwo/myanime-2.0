module.exports = {
    async cacheGroup(req, res, next) {
        try {
            var { key } = req.headers
            req.apicacheGroup = [key]
            return next()
        } catch (err) {
            return res.status(403).send({ success: false, error: err.message })
        }
    }
}