import {type NextFunction, type Request, type Response} from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDirectoryPath = path.join(__dirname, '..', '..', '..', 'client');

export async function getLoginPage(req: Request, res: Response, next: NextFunction) {
    try {
        res.sendFile('signin.html', {root: clientDirectoryPath});
    } catch (err) {
        next(err);
    }
}

export async function getForgotPassPage(req: Request, res: Response, next: NextFunction) {
    try {
        res.sendFile('forgot-pass.html', {root: clientDirectoryPath});
    } catch (err) {
        next(err);
    }
}

export async function getSignupPage(req: Request, res: Response, next: NextFunction) {
    try {
        res.sendFile('signup.html', {root: clientDirectoryPath});
    } catch (err) {
        next(err);
    }
}
