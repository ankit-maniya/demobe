import jwt from 'jsonwebtoken'

function getCookie(name, cookie) {
    const value = `; ${cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const requireAuth = (req, res, next) => {

    const cookie = req.headers.cookie;
    const token = getCookie('jwt', cookie);
    // console.log(token);
    if (token) {
        jwt.verify(token, 'crudOp', (err, decodedToken) => {
            if (err) {
                console.log(err);
                // res.redirect('/login')
            } else {
                console.log("decode token ====>", decodedToken);
                req.body.userid = decodedToken.id
                console.log("after body====>", req.body.userid);
                next();
            }
        })
    } else {
        next();
    }

}

export { requireAuth }