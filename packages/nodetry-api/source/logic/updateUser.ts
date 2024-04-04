import {
    eq,
} from 'drizzle-orm';

import {
    DatabaseUser,
} from '@/source/data';

import database from '../database';
import {
    users,
} from '../database/schema/users';



export const updateUserPayments = async (
    databaseUser: DatabaseUser,
    productType: string,
    sessionID: string,
) => {
    await database.update(users).set({
        payments: JSON.stringify([
            ...JSON.parse(databaseUser.payments || '[]'),
            {
                amount: productType,
                sessionID,
            },
        ]),
    }).where(
        eq(users.id, databaseUser.id),
    );
}
