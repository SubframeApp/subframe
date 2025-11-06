"use client"

import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import { Area, AreaChart as RechartsAreaChart, Dot, DotProps } from "recharts"
import styles from "./area-chart.module.css"
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

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
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

  // AreaChart props
  layout?: "horizontal" | "vertical"
  syncId?: number | string
  margin?: { top: number; right: number; bottom: number; left: number }
  stackOffset?: "expand" | "none" | "wiggle" | "silhouette"
}

export const AreaChart = forwardRef<HTMLDivElement, AreaChartProps>(function AreaChart(
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
    tooltip = <ChartTooltip />,
    legend = <ChartLegend />,
    children = [
      ...categories.map((category, index) => {
        const color = colors[index % colors.length]
        return (
          <defs key={category}>
            <linearGradient style={{ color }} id={color} x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="currentColor" stopOpacity={0.7} />
              <stop offset="98%" stopColor="currentColor" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        )
      }),
      ...categories.map((category, index) => {
        const color = colors[index % colors.length]
        return (
          <Area
            key={index}
            type="monotone"
            activeDot={(props: DotProps) => {
              const { cx, cy, stroke, strokeLinecap, strokeLinejoin, strokeWidth } = props
              return (
                <Dot
                  className={classNames(styles.dot, { [styles.dark]: dark })}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={color}
                  stroke={stroke}
                  strokeLinecap={strokeLinecap}
                  strokeLinejoin={strokeLinejoin}
                  strokeWidth={strokeWidth}
                />
              )
            }}
            dataKey={category}
            fill={`url(#${color})`}
            isAnimationActive={false}
            stackId={stacked ? "a" : undefined}
            stroke={color}
            strokeLinejoin={"round"}
            strokeLinecap={"round"}
            strokeWidth={2}
          />
        )
      }),
    ],
    layout,
    syncId,
    margin,
    stackOffset,
    ...otherProps
  },
  ref,
) {
  return (
    <ChartContextProvider categories={categories} colors={colors} dark={dark}>
      <AutoSizedChartWrapper ref={ref} {...otherProps}>
        {({ height, width }) => (
          <RechartsAreaChart
            data={data}
            height={height}
            width={width}
            layout={layout}
            syncId={syncId}
            margin={margin}
            stackOffset={stackOffset}
          >
            {gridLines}
            {xAxis}
            {yAxis}
            {tooltip}
            {legend}
            {children}
          </RechartsAreaChart>
        )}
      </AutoSizedChartWrapper>
    </ChartContextProvider>
  )
})
