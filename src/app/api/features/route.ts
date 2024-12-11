
import {db} from '../../../lib/db/db'

export async function GET() {

    try{

        const queryA = `SELECT 
        SUM(A) AS A,
        SUM(B) AS B,
        SUM(C) AS C, 
        SUM(D) AS D, 
        SUM(F) AS E,
        SUM(E) AS F
        FROM peoplestats
        
        `
        const res = await db.all(queryA,[])

        console.log(res)

        const timeSpent_per_feature:object[] = []

        for(const [feature,time_spent] of Object.entries(res[0])){
             const obj = {
                feature : feature ,
                time_spent : time_spent
            }

            timeSpent_per_feature.push(obj)
        }

        console.log(timeSpent_per_feature)
        
        return Response.json(timeSpent_per_feature)

    
    }catch(err){
        console.error(err)
        return Response.json({"message":err})
    }


}
