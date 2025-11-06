"use client"

import React from "react"
import { forwardRef } from "../lib/forward-ref"
import { Bar, BarChart as RechartsBarChart } from "recharts"
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

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: string[]
  colors?: string[]
  dark?: boolean
  data: Array<object>
  index: string
  stacked?: boolean

  // Slots
  gridLines?: React.ReactNode
  xAxis?: React.ReactNode
  yAxis?: React.ReactNode
  tooltip?: React.ReactNode
  legend?: React.ReactNode

  // BarChart props
  layout?: "horizontal" | "vertical"
  syncId?: number | string
  margin?: { top: number; right: number; bottom: number; left: number }
  barCategoryGap?: number | string
  barGap?: number | string
  barSize?: number | string
  maxBarSize?: number
  stackOffset?: "expand" | "none" | "wiggle" | "silhouette"
  reverseStackOrder?: boolean
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  {
    categories,
    colors = DEFAULT_COLORS,
    dark,
    data,
    index,
    stacked,
    gridLines = <CartesianGrid />,
    xAxis = <XAxis dataKey={index} />,
    yAxis = <YAxis />,
    tooltip = <ChartTooltip cursor={{ fill: "#D1D5DB", opacity: "0.15" }} />,
    legend = <ChartLegend />,
    children = categories.map((category, index) => {
      const color = colors[index % colors.length]
      return (
        <Bar
          key={index}
          dataKey={category}
          fill={color}
          stackId={stacked ? "a" : undefined}
          isAnimationActive={false}
        />
      )
    }),
    layout,
    syncId,
    margin,
    barCategoryGap,
    barGap,
    barSize,
    maxBarSize,
    stackOffset,
    reverseStackOrder,
    ...otherProps
  },
  ref,
) {
  return (
    <ChartContextProvider categories={categories} colors={colors} dark={dark}>
      <AutoSizedChartWrapper ref={ref} {...otherProps}>
        {({ height, width }) => (
          <RechartsBarChart
            data={data}
            height={height}
            width={width}
            layout={layout}
            syncId={syncId}
            margin={margin}
            barCategoryGap={barCategoryGap}
            barGap={barGap}
            barSize={barSize}
            maxBarSize={maxBarSize}
            stackOffset={stackOffset}
            reverseStackOrder={reverseStackOrder}
          >
            {gridLines}
            {xAxis}
            {yAxis}
            {tooltip}
            {legend}
            {children}
          </RechartsBarChart>
        )}
      </AutoSizedChartWrapper>
    </ChartContextProvider>
  )
})
