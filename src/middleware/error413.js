const MB = 100; 
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const error413 = (req, res, next) => {
    const files = req.files
    const filesOverLimit = []
    Object.keys(files).forEach(key => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name)
        }
    })
    if (filesOverLimit.length > 0) {
        const message = "File over size limit"
        return res.status(413).json({status: "error", message});
    }
    next()
}

module.exports = error413
