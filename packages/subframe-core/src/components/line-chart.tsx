"use client"

import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import { Dot, DotProps, Line, LineChart as RechartsLineChart } from "recharts"
import {
  AutoSizedChartWrapper,
  CartesianGrid,
  ChartContextProvider,
  ChartLegend,
  ChartTooltip,
  DEFAULT_COLORS,
  XAxis,
  YAxis,
} from "./charts"
import styles from "./line-chart.module.css"

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: string[]
  colors?: string[]
  dark?: boolean
  data: Array<object>
  index: string

  // Slots
  gridLines?: React.ReactNode
  xAxis?: React.ReactNode
  yAxis?: React.ReactNode
  tooltip?: React.ReactNode
  legend?: React.ReactNode

  // LineChart props
  layout?: "horizontal" | "vertical"
  syncId?: number | string
  margin?: { top: number; right: number; bottom: number; left: number }
}

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(function LineChart(
  {
    categories,
    colors = DEFAULT_COLORS,
    dark,
    data,
    index,
    gridLines = <CartesianGrid />,
    xAxis = <XAxis dataKey={index} />,
    yAxis = <YAxis />,
    tooltip = <ChartTooltip />,
    legend = <ChartLegend />,
    children = categories.map((category, index) => {
      const color = colors[index % colors.length]
      return (
        <Line
          key={index}
          type="monotone"
          activeDot={(props: DotProps) => (
            <Dot className={classNames(styles.dot, { [styles.dark]: dark })} r={5} style={{ fill: color }} {...props} />
          )}
          dot={false}
          dataKey={category}
          fill={color}
          isAnimationActive={false}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      )
    }),
    layout,
    syncId,
    margin,
    ...otherProps
  },
  ref,
) {
  return (
    <ChartContextProvider categories={categories} colors={colors} dark={dark}>
      <AutoSizedChartWrapper ref={ref} {...otherProps}>
        {({ height, width }) => (
          <RechartsLineChart data={data} height={height} width={width} layout={layout} syncId={syncId} margin={margin}>
            {gridLines}
            {xAxis}
            {yAxis}
            {tooltip}
            {legend}
            {children}
          </RechartsLineChart>
        )}
      </AutoSizedChartWrapper>
    </ChartContextProvider>
  )
})
