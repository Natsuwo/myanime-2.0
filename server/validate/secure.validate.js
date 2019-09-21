module.exports = {
    async checkSecure(req, res, next) {
        try {
            var header_a = req.headers["x-myanime"]
            var header_b = req.headers["accept-cookie"]
            if (!header_a || !header_b) {
                throw Error('Access denied.')
            }
            next();
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}