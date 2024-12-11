import {db} from '../../../lib/db/db'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

    
    const feature = request?.nextUrl?.searchParams.get('feature')
    
    
    try{

        const query = `SELECT ${feature} , day FROM peoplestats`

        const result = await db.all(query,[])


        const timespent_per_day:object[] = result.map((item) =>  {

            const [feature,day] = Object.entries(item)

            return {
                 date : day[1],events : feature[1] 
            }
             
        })

        console.log(result.length)
        return Response.json(timespent_per_day)

    
    }catch(err){
        console.error(err)
        return Response.json({"message":err})
    }


}