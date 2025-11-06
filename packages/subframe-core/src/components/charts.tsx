"use client"

import classNames from "classnames"
import * as React from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import {
  CartesianGrid as RechartsCartesianGrid,
  CartesianGridProps,
  Label as RechartsLabel,
  Legend as RechartsLegend,
  LegendProps,
  Tooltip as RechartsTooltip,
  TooltipProps,
  XAxis as RechartsXAxis,
  XAxisProps,
  YAxis as RechartsYAxis,
  YAxisProps,
} from "recharts"
import styles from "./charts.module.css"

/**
 * Colors
 */

/* Default palette is Blue */
export const DEFAULT_COLORS = ["3b82f6", "bfdbfe", "2563eb", "93c5fd", "1d4ed8", "60a5fa"]

export function createColorMap({ categories, colors }: { categories: string[]; colors: string[] }) {
  const colorMap = new Map<string, string>()
  for (let i = 0; i < categories.length; i++) {
    colorMap.set(categories[i], colors[i % colors.length])
  }
  return colorMap
}

/**
 * Wrapper
 */
interface ChartContextValue {
  colorMap: Map<string, string>
  dark?: boolean
}
const ChartContext = React.createContext<ChartContextValue>(undefined!)
export function ChartContextProvider({
  categories,
  colors,
  dark,
  children,
}: {
  categories: string[]
  colors: string[]
  dark?: boolean
  children: React.ReactNode
}) {
  const value = React.useMemo(
    () => ({ colorMap: createColorMap({ categories, colors }), dark }),
    [categories, colors, dark],
  )
  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
}
export function useChartContext() {
  return React.useContext(ChartContext)
}

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: (args: { width: number; height: number }) => React.ReactElement
}

export const AutoSizedChartWrapper = forwardRef<HTMLDivElement, Props>(function AutoSizedChartWrapper(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      className={classNames(className, styles.root)}
      ref={ref}
      {...props}
      style={{ ...style, minHeight: 200, minWidth: 300 }}
    >
      <AutoSizer>{({ height, width }) => children({ height, width })}</AutoSizer>
    </div>
  )
})

/**
 * Recharts Wrappers
 */
export const ChartLabel = RechartsLabel

export const CartesianGrid = ({
  ref,
  className,
  horizontal = true,
  vertical = false,
  strokeWidth = 1,
  ...otherProps
}: CartesianGridProps) => {
  const { dark } = useChartContext()
  return (
    <RechartsCartesianGrid
      className={classNames(className, styles.grid, { [styles.dark]: dark })}
      horizontal={horizontal}
      vertical={vertical}
      strokeWidth={strokeWidth}
      ref={ref as any}
      {...otherProps}
    />
  )
}
CartesianGrid.displayName = RechartsCartesianGrid.displayName

export const XAxis = (props: XAxisProps) => {
  return <RechartsXAxis {...props} />
}
XAxis.displayName = RechartsXAxis.displayName
XAxis.defaultProps = {
  ...RechartsXAxis.defaultProps,
  axisLine: false,
  tickLine: false,
  padding: { left: 20, right: 20 },
  interval: "equidistantPreserveStart",
}

export const YAxis = (props: YAxisProps) => {
  return <RechartsYAxis {...props} />
}
YAxis.displayName = RechartsYAxis.displayName
YAxis.defaultProps = { ...RechartsYAxis.defaultProps, axisLine: false, tickLine: false, width: 40 }

interface Payload {
  name?: string | number
  value: string | number
}

interface DefaultTooltipProps {
  active?: boolean
  colorMap: Map<string, string>
  dark?: boolean
  payload?: any
  label: string
}

function DefaultTooltip({ active, colorMap, dark, payload, label }: DefaultTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className={classNames(styles.tooltip, { [styles.dark]: dark })}>
        {label ? <div>{label}</div> : null}
        {payload.map(({ name, value }: Payload, index: number) => (
          <div className={styles.row} key={index}>
            <span className={styles.dot} style={{ backgroundColor: colorMap.get(String(name)) }} />
            <span className={styles.name}>{name ?? ""}</span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export const ChartTooltip = (props: TooltipProps<any, any>) => {
  const { colorMap, dark } = useChartContext()
  return (
    <RechartsTooltip
      content={({ active, payload, label }) => (
        <DefaultTooltip active={active} colorMap={colorMap} dark={dark} label={label} payload={payload} />
      )}
      {...props}
    />
  )
}
ChartTooltip.displayName = RechartsTooltip.displayName
ChartTooltip.defaultProps = {
  ...RechartsTooltip.defaultProps,
  cursor: { stroke: "#D1D5DB", strokeWidth: 1 },
  isAnimationActive: false,
}

interface DefaultLegendProps {
  align?: "center" | "left" | "right"
  colorMap: Map<string, string>
  dark?: boolean
  payload?: any
}

function DefaultLegend({ align, colorMap, dark, payload }: DefaultLegendProps) {
  return (
    <div
      className={classNames(styles.legend, {
        [styles.dark]: dark,
        [styles.left]: align === "left",
        [styles.center]: align === "center",
        [styles.right]: align === "right",
      })}
    >
      {payload.map(({ value }: Payload, index: number) => (
        <div className={styles.row} key={index}>
          <span className={styles.dot} style={{ backgroundColor: colorMap.get(String(value)) }} />
          <span className={styles.name}>{value}</span>
        </div>
      ))}
    </div>
  )
}

export const ChartLegend = ({ ref, ...otherProps }: LegendProps) => {
  const { colorMap, dark } = useChartContext()
  return (
    <RechartsLegend
      content={({ payload }) => (
        <DefaultLegend align={otherProps.align} colorMap={colorMap} dark={dark} payload={payload} />
      )}
      ref={ref as any}
      {...otherProps}
    />
  )
}
ChartLegend.displayName = RechartsLegend.displayName
ChartLegend.defaultProps = { ...RechartsLegend.defaultProps, align: "right", verticalAlign: "top" }
