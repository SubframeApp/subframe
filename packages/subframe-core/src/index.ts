/* eslint-disable simple-import-sort/imports */
/**
 * First import everything we need
 */
// direct re-exports of Radix
import { RadioGroup, Checkbox, Popover, HoverCard, Tooltip, DropdownMenu, ContextMenu } from "./components/radix"

// direct re-exports of non-Radix libraries
import { Toaster, toast } from "sonner"

// our components
import * as Progress from "./components/progress"
import * as Slider from "./components/slider"
import * as Select from "./components/select"
import { AreaChart } from "./components/area-chart"
import { BarChart } from "./components/bar-chart"
import { LineChart } from "./components/line-chart"
import { PieChart } from "./components/pie-chart"
import { CartesianGrid, XAxis, YAxis, ChartTooltip, ChartLegend, ChartLabel } from "./components/charts"
import { Calendar } from "./components/calendar"
import { Skeleton } from "./components/skeleton"
import * as CopyToClipboard from "./components/copy-to-clipboard"
import * as Switch from "./components/switch"
import { Loader } from "./components/loader"
import { Icon } from "./components/icon"
import { IconWrapper } from "./components/icon-wrapper"
import * as Dialog from "./components/dialog"
import * as Drawer from "./components/drawer"
import * as FullScreenDialog from "./components/fullscreen-dialog"
import * as ToggleGroup from "./components/toggle-group"
import * as Collapsible from "./components/collapsible"

// utilities
import { Text } from "./utilities/text"
import * as TypescriptHelpers from "./lib/typescript-helpers"
import { createTwClassNames, twClassNames } from "./lib/tw-classnames"

// Icons
import * as Icons from "./assets/icons/final"

/**
 * Then re-export everything
 */
export { RadioGroup, Checkbox, Popover, HoverCard, Tooltip, DropdownMenu, ContextMenu }
export { Toaster, toast }
export { Progress }
export { Slider }
export { Select }
export { AreaChart }
export { BarChart }
export { LineChart }
export { PieChart }
export { CartesianGrid, XAxis, YAxis, ChartTooltip, ChartLegend, ChartLabel }
export { Calendar }
export { Skeleton }
export { CopyToClipboard }
export { Switch }
export { Loader }
export { Icon }
export { IconWrapper }
export type { IconName } from "./components/icon"
export { Dialog }
export { Drawer }
export { FullScreenDialog }
export { ToggleGroup }
export { Collapsible }
export { Text }
export { TypescriptHelpers }
export { createTwClassNames, twClassNames }
export * from "./assets/icons/final"

/**
 * Finally, create our default export using the imported values
 */
const SubframeCore = {
  ...Icons,
  RadioGroup,
  Checkbox,
  Popover,
  HoverCard,
  Tooltip,
  DropdownMenu,
  ContextMenu,
  Toaster,
  toast,
  Progress,
  Slider,
  Select,
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ChartTooltip,
  ChartLegend,
  ChartLabel,
  Calendar,
  Skeleton,
  CopyToClipboard,
  Switch,
  Loader,
  Icon,
  IconWrapper,
  Dialog,
  Drawer,
  FullScreenDialog,
  ToggleGroup,
  Collapsible,
  Text,
  TypescriptHelpers,
  createTwClassNames,
  twClassNames,
}

export default SubframeCore
