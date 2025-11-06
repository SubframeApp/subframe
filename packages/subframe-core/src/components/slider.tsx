"use client"

import * as RadixSlider from "@radix-ui/react-slider"
import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import styles from "./slider.module.css"

interface RootProps extends RadixSlider.SliderProps {}

export const Root = forwardRef<HTMLDivElement, RootProps>(function ProgressRoot(
  { className, children, defaultValue = [27], ...otherProps },
  ref,
) {
  return (
    <RadixSlider.Root
      ref={ref}
      className={classNames(className, styles.sliderRoot)}
      defaultValue={defaultValue}
      {...otherProps}
    >
      {children}
    </RadixSlider.Root>
  )
})

export const Track = forwardRef<HTMLDivElement, RadixSlider.SliderTrackProps>(function Indicator(
  { className, children, ...otherProps },
  ref,
) {
  return (
    <RadixSlider.Track className={classNames(className, styles.sliderTrack)} ref={ref} {...otherProps}>
      {children}
    </RadixSlider.Track>
  )
})

export const Range = forwardRef<HTMLDivElement, RadixSlider.SliderRangeProps>(function Indicator(
  { className, ...otherProps },
  ref,
) {
  return <RadixSlider.Range className={classNames(className, styles.sliderRange)} ref={ref} {...otherProps} />
})

export const Thumb = forwardRef<HTMLDivElement, RadixSlider.SliderThumbProps>(function Indicator(
  { className, ...otherProps },
  ref,
) {
  return <RadixSlider.Thumb className={classNames(className, styles.sliderThumb)} ref={ref} {...otherProps} />
})

export const Slider = { Root, Track, Range, Thumb }
