
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sqlite3 = require('sqlite3').verbose();
import { open } from 'sqlite';

async function openDb(){
     
    const connection = await open({
      filename: process.env.NEXT_PUBLIC_DATABASE_URL,
      driver: sqlite3.Database,
     });

     return connection;
}



export const db = await openDb()




