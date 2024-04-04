import type {
    Request,
    Response,
} from 'express';

import {
    handlerWithUser,
} from '@/source/logic/handlers';



export default async function handler(
    request: Request,
    response: Response,
) {
    return await handlerWithUser(
        request,
        response,
        async (
            _tokensUser,
            databaseUser,
        ) => {
            response.json({
                status: true,
                data: {
                    ...databaseUser,
                    payments: JSON.parse(databaseUser.payments),
                },
            });
        },
    );
}
