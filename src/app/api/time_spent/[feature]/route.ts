import {db} from '../../../../lib/db/db'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

    const feature  = request.nextUrl.pathname.split('/').pop();

    const age = request.nextUrl.searchParams.get('age') 

    const gender = request.nextUrl.searchParams.get('gender')!

    // console.log(feature,age,gender)
  
    try{

        let query;
        let result;
        
        if(age && !gender){

            const query = `SELECT ${feature} , day 
            FROM peoplestats 
            WHERE  age = ?`
           

            result = await db.all(query,[age])

            console.log(result.length)
            
        }
        else if(!age && gender){

            const query = `SELECT ${feature} , day 
            FROM peoplestats 
            WHERE  gender = ?`
           
            result = await db.all(query,[gender])

            console.log(result.length)
        }
        else if(age && gender){

            const query = `SELECT ${feature} , day 
            FROM peoplestats 
            WHERE  gender = ? AND age = ?`
           
            result = await db.all(query,[gender,age])
            console.log(result.length)
        }
        else{

            query = `SELECT ${feature} , day 
            FROM peoplestats  `

            result = await db.all(query,[])
            console.log(result.length)

        }



        const timespent_per_day:object[] = result.map((item:object) =>  {

            const [feature,day] = Object.entries(item)

            return {
                 date : day[1],events : feature[1] 
            }
             
        })

        return Response.json(timespent_per_day)

    
    }catch(err){
        console.error(err)
        return Response.json({"message":err})
    }


}