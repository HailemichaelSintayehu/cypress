import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv"
import * as schema from "../../../migrations/schema"

dotenv.config({ path : '.env'})

if(!process.env.DATABASE_URL) {
    console.log('no database URL')
}   

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(client , { schema });

const migragteDb = async () => {
    try {
        console.log("Migrating client");
        await migrate( db , {migrationsFolder: 'migrations'})
        console.log(('successfully migrated'))

    } catch (error) {
        console.log('Error migrating client')
        
    }

}
migragteDb();

export default db;

