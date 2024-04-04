import type {
    Request,
    Response,
} from 'express';

import stripe from '@/source/services/stripe';

import {
    handlerWithUser,
} from '@/source/logic/handlers';

import {
    updateUserPayments,
} from '@/source/logic/updateUser';

import {
    logger,
} from '@/source/utilities';



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
            switch (request.method) {
                case 'POST':
                    try {
                        let priceID = '';

                        switch (request.body.productType) {
                            case 'FEW':
                                priceID = process.env.STRIPE_PRICE_FEW || '';
                                break;
                            case 'LOTS':
                                priceID = process.env.STRIPE_PRICE_LOTS || '';
                                break;
                            default:
                                throw new Error('Invalid plan type');
                        }

                        const session = await stripe.checkout.sessions.create({
                            ui_mode: 'embedded',
                            line_items: [
                                {
                                    price: priceID,
                                    quantity: 1,
                                },
                            ],
                            mode: 'payment',
                            return_url: `${request.headers.origin}/payment?sid={CHECKOUT_SESSION_ID}`,
                        });

                        await updateUserPayments(
                            databaseUser,
                            request.body.productType,
                            session.id,
                        );

                        response.send({
                            status: true,
                            data: {
                                clientSecret: session.client_secret,
                            },
                        });
                    } catch (err: any) {
                        response.status(err.statusCode || 500).json(err.message);
                    }
                    break;
                case 'GET':
                    try {
                        const session = await stripe.checkout.sessions.retrieve(
                            (request as any).query.sid,
                        );

                        response.send({
                            status: session.status,
                            data: {
                                customerEmail: (session as any).customer_details.email,
                            },
                        });
                    } catch (error: any) {
                        logger('error', error);

                        response.status(error.statusCode || 500).json(error.message);
                    }
                    break;
                default:
                    response.setHeader('Allow', request.method || '');
                    response.status(405).end('Method Not Allowed');
            }
        },
    );
}
