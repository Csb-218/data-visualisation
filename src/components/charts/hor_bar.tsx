'use client'

import { useEffect,Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, LabelList, } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useRouter } from 'next/navigation'
import { updateQueryParam } from "@/lib/utils"
import { feature } from '@/types'
import { getRandomHexColor } from "@/lib/utils"
// states
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '@/lib/store'
import { setFeature , setFeatures } from '@/lib/store/barChartSlice'
import { setCookie } from 'cookies-next'

const chartConfig = {
    time_spent: {
        label: `time_spent`,
        // color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig



 function HorizontalBarChart() {

    const router = useRouter()
    const {features} = useSelector((state:RootState) => state.barChart)
    const dispatch: AppDispatch = useDispatch()

    const set_Feature = (feature: feature) => {


        const url = updateQueryParam('feature', feature.feature)
        dispatch(() => dispatch(setFeature(feature)))
        router.push(url, { scroll: false })

        setCookie('feature', feature, {
            maxAge: 43200,
            path: '/',
        })
    }


    const searchParams = useSearchParams();

    const paramFeature = searchParams.get('feature');


    useEffect(() => {

        const selectedFeature = features.find(feature => feature.feature === paramFeature)
        // console.log(selectedFeature)
        if (selectedFeature) dispatch(setFeature(selectedFeature))

    }, [paramFeature, dispatch,features])


    useEffect(() => {

        async function fetchFeatures() {
            const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/features`)
            const features: feature[] = await data.json()
            features.reverse().forEach((feature: { fill: string }) => feature.fill = getRandomHexColor())
            dispatch(setFeatures(features))
        }

        fetchFeatures()



    }, [dispatch])


    return (
        <Card >
            <CardHeader>
                <CardTitle className="text-center" >Features v/s Time Spent</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>


                <ChartContainer config={chartConfig} className="min-h-[350px] w-11/12">
                    <BarChart
                        accessibilityLayer
                        data={features}
                        layout="vertical"
                        margin={{
                            left: 0,
                            right: 40,
                            bottom: 30

                        }}
                    >
                        <CartesianGrid horizontal={false} />

                        <XAxis
                            type="number"
                            dataKey="time_spent"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            label={{ value: "Time Spent →", position: 'insideBottom', dy: 30 }}
                        />

                        <YAxis
                            dataKey="feature"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={true}
                            label={{ value: "Features →", position: "insideLeft", angle: -90 }}
                        />
                        <ChartTooltip

                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        {/* <ChartLegend content={<ChartLegendContent nameKey="time_spent" />} /> */}
                        <Bar dataKey="time_spent" fill="var(--color-time_spent)" radius={5} onClick={(item: feature) => { set_Feature(item) }}  >
                            <LabelList
                                dataKey="time_spent"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>


            </CardContent>

        </Card>
    )
}

export default function HorBar(){
    return (
        <Suspense fallback={<>Loading ...</>}>
        <HorizontalBarChart/>
    </Suspense>
    )
    
}



