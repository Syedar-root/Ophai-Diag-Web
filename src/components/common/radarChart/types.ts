export type indicatorObj = {
  name: string
  max: number
}

export type dataObj = {
  name: string
  value: number[]
}

export interface radarChartProps {
  indicator: indicatorObj[]
  legend?: string[]
  data: dataObj[]
  title?: string
  width?: number
  height?: number
  isFillStyle?: boolean
  color?: string
  valueFormatter?: (value: number) => string
}
