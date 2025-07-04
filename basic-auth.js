const env_user = process.env.HTTP_AUTH_BASIC_USER || false;
const env_password = process.env.HTTP_AUTH_BASIC_PWD || false;

const authentification = (req, res, next) => {
    if (false === env_user || false === env_password) {
        // pas d'authentification
        next();
        return;
    }

    const authheader = req.headers.authorization;
    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
        res.status(401).end();
        return;
    }

    const credentials = new Buffer.from(authheader.split(' ')[1],'base64').toString();
    const [req_user, req_password] = credentials.split(':');

    if (req_user !== env_user || req_password !== env_password) {
        res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
        res.status(401).end();
        return;
    }

    next();
}

export {
	authentification as default,
}
