'use client'
import { useState, useEffect, useMemo, useRef,Suspense} from "react"
import { Area, CartesianGrid, XAxis, YAxis, ComposedChart, ReferenceArea, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { DataPoint } from "@/types";
import { RadioDropDownGender } from "../miscellaneous/RadioDropDownGender"
import { RadioDropDownAge } from "../miscellaneous/RadioDropDownAge"
// states
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { setAge, setFeatureChart, setGender } from '@/lib/store/barChartSlice'
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import axios from 'axios'





export function VerticalLineChart() {

    const { selectedFeature, selectedAge, selectedGender ,featureChart } = useSelector((state: RootState) => state.barChart);

    const dispatch: AppDispatch = useDispatch()
    const searchParams:ReadonlyURLSearchParams = useSearchParams()
    const [data, setData] = useState<DataPoint[]>([]);
    const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
    const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<string | null>(featureChart?.chartData[0].events.toString()||null);
    const [endTime, setEndTime] = useState<string | null>(featureChart?.chartData[featureChart?.chartData.length-1].events.toString()||null);
    const [originalData, setOriginalData] = useState<DataPoint[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);


    const chartConfig = {
        events: {
            label: "Time spent vs date",
            color: selectedFeature ? selectedFeature.fill : '#fcfcfc'
        },
    } satisfies ChartConfig

    useEffect(() => {

        if (featureChart ) {

            setData(featureChart.chartData);
            setOriginalData(featureChart.chartData);
            setStartTime(featureChart.chartData[0].date);
            setEndTime(featureChart.chartData[featureChart.chartData.length - 1].date);

        }
       
    }, [featureChart]);

    const zoomedData = useMemo(() => {

        if (!startTime || !endTime) {
            return data;
        }

        const dataPointsInRange = originalData.filter(
            (dataPoint) => {
                return Date.parse(dataPoint.date) >= Date.parse(startTime) && Date.parse(dataPoint.date) <= Date.parse(endTime)
            }
        );

        // Ensure we have at least two data points for the chart to prevent rendering a single dot
        return dataPointsInRange.length > 1 ? dataPointsInRange : originalData.slice(0, 2);
    }, [startTime, endTime, originalData, data]);

    const total = useMemo(
        () => {
            return zoomedData.reduce((acc, curr) => acc + curr.events, 0)
        },
        [zoomedData]
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseDown = (e: any) => {
        if (e.activeLabel) {
            setRefAreaLeft(e.activeLabel);
            setIsSelecting(true);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (e: any) => {
        if (isSelecting && e.activeLabel) {
            setRefAreaRight(e.activeLabel);
        }
    };

    const handleMouseUp = () => {
        if (refAreaLeft && refAreaRight) {
            const [left, right] = [refAreaLeft, refAreaRight].sort();
            setStartTime(left);
            setEndTime(right);
        }
        setRefAreaLeft(null);
        setRefAreaRight(null);
        setIsSelecting(false);
    };

    const handleReset = () => {
        setStartTime(originalData[0].date);
        setEndTime(originalData[originalData.length - 1].date);
    };

    const handleZoom = (e: React.WheelEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!originalData.length || !chartRef.current) return;

        const zoomFactor = 0.1;
        let direction = 0;
        let clientX = 0;

        if ('deltaY' in e) {
            // Mouse wheel event
            direction = e.deltaY < 0 ? 1 : -1;
            clientX = e.clientX;
        } else if (e.touches.length === 2) {
            // Pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((e as any).lastTouchDistance) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                direction = currentDistance > (e as any).lastTouchDistance ? 1 : -1;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e as any).lastTouchDistance = currentDistance;

            clientX = (touch1.clientX + touch2.clientX) / 2;
        } else {
            return;
        }

        const currentRange = new Date(endTime || originalData[originalData.length - 1].date).getTime() -
            new Date(startTime || originalData[0].date).getTime();
        const zoomAmount = currentRange * zoomFactor * direction;

        const chartRect = chartRef.current.getBoundingClientRect();
        const mouseX = clientX - chartRect.left;
        const chartWidth = chartRect.width;
        const mousePercentage = mouseX / chartWidth;

        const currentStartTime = new Date(startTime || originalData[0].date).getTime();
        const currentEndTime = new Date(endTime || originalData[originalData.length - 1].date).getTime();

        const newStartTime = new Date(currentStartTime + zoomAmount * mousePercentage);
        const newEndTime = new Date(currentEndTime - zoomAmount * (1 - mousePercentage));

        setStartTime(newStartTime?.toISOString());
        setEndTime(newEndTime?.toISOString());
    };

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);

        return `${date.getDate()}`
        // return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    const paramAge:string|null = searchParams.get('age')
    const paramGender:string|null = searchParams.get('gender')

    useEffect(() => {

        let fetchChart;

        if (selectedFeature) {

            const options = {
                baseURL: process.env.NEXT_PUBLIC_BASE_URL,
                method: 'get',
                params: {},
                url: `/time_spent/${selectedFeature.feature}`
            }

            fetchChart = async () => {

                if(selectedGender && selectedAge){
                    Object.assign(options.params, { age: selectedAge, gender: selectedGender })
                }else if(selectedGender && !selectedAge){
                    Object.assign(options.params, { gender: selectedGender })
                }else if(!selectedGender && selectedAge){
                    Object.assign(options.params, { age: selectedAge })
                }else{
                    // no assignment
                }

                const { data } = await axios.request(options)
                const initialData = {
                    chartData : data ,
                    feature : selectedFeature
                }

                dispatch(setFeatureChart(initialData))

            }

            fetchChart()
        }

        // console.log(gender, age, feature)

    }, [selectedAge, selectedFeature, selectedGender,dispatch])

    useEffect(()=>{

        if(paramAge) dispatch(setAge(paramAge))
        if(paramGender) dispatch(setGender(paramGender))

    },[paramAge,paramGender,dispatch])

    return (
        selectedFeature &&
        <Card className="w-full h-full">
            <CardHeader className="flex-col items-stretch space-y-0 border-b p-0 sm:flex-row hidden sm:flex">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Feature {selectedFeature.feature}</CardTitle>
                    <div className='flex space-x-2'>
                        <RadioDropDownGender  />
                        <RadioDropDownAge />

                    </div>

                </div>
                <div className="flex">
                    <div
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l bg-muted/10 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            Total Time Spent
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 h-full sm:h-[calc(100%-150px)]">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-full"
                >
                    <div className="h-full" onWheel={handleZoom} onTouchMove={handleZoom} ref={chartRef} style={{ touchAction: 'none' }}>
                        <div className="flex justify-end my-2 sm:mb-4">
                            <Button variant="outline" onClick={handleReset} disabled={!startTime && !endTime} className="text-xs sm:text-sm">
                                Reset
                            </Button>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={zoomedData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0,
                                }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                            >
                                <defs>
                                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartConfig.events.color} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={chartConfig.events.color} stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={formatXAxis}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    minTickGap={16}
                                    style={{ fontSize: '10px', userSelect: 'none' }}
                                // label={{ value: "Time Spent →", position : 'insideBottom' , dy : 30 }}
                                />
                                <YAxis

                                    tickLine={false}
                                    axisLine={false}
                                    style={{ fontSize: '10px', userSelect: 'none' }}
                                    width={30}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            className="w-[150px] sm:w-[200px] font-mono text-xs sm:text-sm"
                                            nameKey="events"
                                            labelFormatter={(value) => new Date(value).toLocaleString()}
                                        />
                                    }
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="events"
                                    stroke={chartConfig.events.color}
                                    fillOpacity={1}
                                    fill="url(#colorEvents)"
                                    isAnimationActive={false}
                                />
                                {refAreaLeft && refAreaRight && (
                                    <ReferenceArea
                                        x1={refAreaLeft}
                                        x2={refAreaRight}
                                        strokeOpacity={0.3}
                                        fill="hsl(var(--chart-2))"
                                        fillOpacity={0.05}
                                    />
                                )}
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default function Line_chart(){
    return(
    <Suspense>
        <VerticalLineChart/>
    </Suspense>
    )
    
}
