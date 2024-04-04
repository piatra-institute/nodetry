import type {
    Request,
    Response,
} from 'express';

import {
    TokensUser,
    DatabaseUser,
} from '../data';

import {
    getTokensUser,
    getDatabaseUser,
} from '../logic/getUser';

import {
    logger,
} from '../utilities';



export async function handlerWithUser(
    request: Request,
    response: Response,
    logic: (
        tokensUser: TokensUser,
        databaseUser: DatabaseUser,
    ) => Promise<void>,
) {
    try {
        const tokensUser = await getTokensUser(request, response);
        if (!tokensUser) {
            logger('warn', 'User not found');

            response.status(404).json({
                status: false,
            });
            return;
        }

        const databaseUser = await getDatabaseUser(tokensUser);
        if (!databaseUser) {
            logger('warn', 'Database user not found');

            response.status(404).json({
                status: false,
            });
            return;
        }

        return await logic(
            tokensUser,
            databaseUser,
        );
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
