"use client"

import React from "react"
import { DayPicker, DayPickerProps } from "react-day-picker"
import { FeatherChevronLeft, FeatherChevronRight } from "../assets/icons/final"

export const Calendar = React.forwardRef<HTMLDivElement, DayPickerProps>(function CalendarRoot(
  { classNames, className, showOutsideDays = true, ...otherProps },
  ref,
) {
  return (
    <div className={className} ref={ref}>
      <DayPicker
        components={{
          Chevron: (props) => {
            if (props.orientation === "left") {
              return <FeatherChevronLeft {...props} />
            }
            return <FeatherChevronRight {...props} />
          },
        }}
        showOutsideDays={showOutsideDays}
        classNames={classNames}
        {...otherProps}
      />
    </div>
  )
})
