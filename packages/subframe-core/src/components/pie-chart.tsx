"use client"

import classNames from "classnames"
import React from "react"
import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"
import { AutoSizedChartWrapper, ChartContextProvider, ChartLegend, ChartTooltip, DEFAULT_COLORS } from "./charts"
import styles from "./pie-chart.module.css"

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  colors?: string[]
  dark?: boolean
  data: Array<Record<string, string | number>>
  index: string

  tooltip?: React.ReactNode
  legend?: React.ReactNode

  // LineChart props
  margin?: { top: number; right: number; bottom: number; left: number }
}

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  {
    className,
    category,
    colors = DEFAULT_COLORS,
    dark,
    data,
    index,
    tooltip = <ChartTooltip />,
    legend = <ChartLegend />,
    children = (
      <Pie
        className={classNames(styles.pie, { [styles.dark]: dark })}
        data={data}
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius="75%"
        isAnimationActive={false}
        outerRadius="100%"
        dataKey={category}
        nameKey={index}
      >
        {data.map((_, index) => {
          return <Cell key={index} fill={colors[index % colors.length]} />
        })}
      </Pie>
    ),
    margin,
    ...otherProps
  },
  ref,
) {
  return (
    <ChartContextProvider categories={data.map((obj) => obj[index] as string)} colors={colors} dark={dark}>
      <AutoSizedChartWrapper ref={ref} className={className} {...otherProps}>
        {({ height, width }) => (
          <RechartsPieChart data={data} height={height} width={width} margin={margin}>
            {tooltip}
            {legend}
            {children}
          </RechartsPieChart>
        )}
      </AutoSizedChartWrapper>
    </ChartContextProvider>
  )
})
