
import {db} from '../../lib/db/db'



export async function GET() {

    try{

        const query = 'SELECT * FROM peoplestats'
        const res = await db.all(query,[])

        console.log(res,db)
        return Response.json(res)

    
    }catch(err){
        console.error(err)
        return Response.json({"message":err})
    }


}

