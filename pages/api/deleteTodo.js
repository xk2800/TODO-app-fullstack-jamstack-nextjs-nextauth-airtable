import { table, getMinifiedRecord } from './utils/AirTable';
import { getSession } from 'next-auth/client';

export default async function (req, res) {
    const session = await getSession({ req });
    if (session) {
        // Signed in
        console.log('Session', JSON.stringify(session, null, 2));

        const { id } = req.body;

        try {
            const deletedRecord = await table.destroy([id]);
            res.status(200).json(getMinifiedRecord(deletedRecord));

        } catch (err) {
            console.log(err);
            res.status(500).json({ Message: 'Something Went Wrong' });
        }
    } else {
        // Not Signed in
        res.status(401).json({ Status: '401 Unauthorized', Message: 'Not Authenticated' });
    }
    res.end();



}
