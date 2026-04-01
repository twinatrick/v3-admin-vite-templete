const proxyConsole = new Proxy(console, {
  get(target: any, prop) {
    return (...args: any[]) => {
      if (!import.meta.env.DEV) return
      const currentDate = new Date().toLocaleString()
      target[prop](`[${currentDate}]`, ...args)
    }
  }
})

enum DateField {
  Year = "year",
  Month = "month",
  Day = "day",
  Hour = "hour",
  Minute = "minute",
  Second = "second",
  Timezone = "timezone"
}

class DateObject {
  private _data = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    timezone: 0
  }
  private _endData = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  }

  constructor() {
    const date = new Date()
    this._data = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      timezone: date.getTimezoneOffset()
    }
  }

  setValue(key: DateField, value: number) {
    this._data[key] = value
  }

  setTimezone(timezone: string) {
    this._data.timezone = DateObject.parseTimezone(timezone)
  }

  getDate() {
    proxyConsole.group("DateObject.getData")

    proxyConsole.log("init", {
      data: this._data
    })

    const { year, month, day, hour, minute, second, timezone } = this._data
    const monthString = month.toString().padStart(2, "0")
    const dayString = day.toString().padStart(2, "0")
    const hourString = hour.toString().padStart(2, "0")
    const minuteString = minute.toString().padStart(2, "0")
    const secondString = second.toString().padStart(2, "0")
    const timezoneString = DateObject.formatOffset(timezone)
    const dateString = `${year}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}${timezoneString}`
    const result = new Date(dateString)

    proxyConsole.log("dateString", dateString)
    proxyConsole.log("result", result)

    proxyConsole.groupEnd("DateObject.getData")
    return result
  }

  getDateRange(withTimezone = false): [Date, Date] {
    proxyConsole.group("DateObject.getDateRange")

    proxyConsole.log("init", {
      data: this._data,
      withTimezone
    })

    const { year, month, day, hour, minute, second, timezone } = this._data
    const {
      year: endYear,
      month: endMonth,
      day: endDay,
      hour: endHour,
      minute: endMinute,
      second: endSecond
    } = this._endData
    const monthString = month.toString().padStart(2, "0")
    const dayString = day.toString().padStart(2, "0")
    const hourString = hour.toString().padStart(2, "0")
    const minuteString = minute.toString().padStart(2, "0")
    const secondString = second.toString().padStart(2, "0")
    const endMonthString = endMonth.toString().padStart(2, "0")
    const endDayString = endDay.toString().padStart(2, "0")
    const endHourString = endHour.toString().padStart(2, "0")
    const endMinuteString = endMinute.toString().padStart(2, "0")
    const endSecondString = endSecond.toString().padStart(2, "0")
    let dateString = `${year}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}`
    let endDateString = `${endYear}-${endMonthString}-${endDayString} ${endHourString}:${endMinuteString}:${endSecondString}`
    if (withTimezone) {
      dateString += DateObject.formatOffset(timezone)
      endDateString += DateObject.formatOffset(timezone)
    }
    const result: [Date, Date] = [new Date(dateString), new Date(endDateString)]

    proxyConsole.log("dateString", dateString)
    proxyConsole.log("endDateString", endDateString)
    proxyConsole.log("result", result)

    proxyConsole.groupEnd("DateObject.getDateRange")
    return result
  }

  getDisplayValue() {
    proxyConsole.group("DateObject.getDisplayValue")

    proxyConsole.log("init", {
      data: this._data
    })

    const { year, month, day, hour, minute, second } = this._data
    const monthString = month.toString().padStart(2, "0")
    const dayString = day.toString().padStart(2, "0")
    const hourString = hour.toString().padStart(2, "0")
    const minuteString = minute.toString().padStart(2, "0")
    const secondString = second.toString().padStart(2, "0")
    const dateString = `${year}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}`
    const result = new Date(dateString)

    proxyConsole.log("result", result.toLocaleString())

    proxyConsole.groupEnd("DateObject.getDisplayValue")
    return result
  }

  getDisplayRangeValue() {
    proxyConsole.group("DateObject.getDisplayRangeValue")

    proxyConsole.log("init", {
      data: this._data,
      endData: this._endData
    })

    const { year, month, day, hour, minute, second } = this._data
    const {
      year: endYear,
      month: endMonth,
      day: endDay,
      hour: endHour,
      minute: endMinute,
      second: endSecond
    } = this._endData
    const monthString = month.toString().padStart(2, "0")
    const dayString = day.toString().padStart(2, "0")
    const hourString = hour.toString().padStart(2, "0")
    const minuteString = minute.toString().padStart(2, "0")
    const secondString = second.toString().padStart(2, "0")
    const endMonthString = endMonth.toString().padStart(2, "0")
    const endDayString = endDay.toString().padStart(2, "0")
    const endHourString = endHour.toString().padStart(2, "0")
    const endMinuteString = endMinute.toString().padStart(2, "0")
    const endSecondString = endSecond.toString().padStart(2, "0")
    const dateString = `${year}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}`
    const endDateString = `${endYear}-${endMonthString}-${endDayString} ${endHourString}:${endMinuteString}:${endSecondString}`
    const result = [new Date(dateString), new Date(endDateString)]

    proxyConsole.log("result", {
      start: result[0].toLocaleString(),
      end: result[1].toLocaleString()
    })

    proxyConsole.groupEnd("DateObject.getDisplayRangeValue")
    return result
  }

  getDateRangeString() {
    const { year, month, day } = this._data
    const { year: endYear, month: endMonth, day: endDay } = this._endData
    const monthString = month.toString().padStart(2, "0")
    const dayString = day.toString().padStart(2, "0")
    const endMonthString = endMonth.toString().padStart(2, "0")
    const endDayString = endDay.toString().padStart(2, "0")
    return `${year}-${monthString}-${dayString} ~ ${endYear}-${endMonthString}-${endDayString}`
  }

  getTimezone() {
    return DateObject.formatOffset(this._data.timezone)
  }

  private static parseTimezone(timezone: string) {
    const sign = timezone[0]
    const [hour, minute] = timezone
      .slice(1)
      .split(":")
      .map((value) => parseInt(value))
    const offset = (sign === "-" ? 1 : -1) * (hour * 60 + minute)
    return offset
  }

  private static formatOffset(offset: number) {
    const sign = offset <= 0 ? "+" : "-"
    const absOffset = Math.abs(offset)
    const hour = Math.floor(absOffset / 60)
    const minute = absOffset % 60
    return `${sign}${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  }

  /**
   * @param value just get the date time part
   * @param timezone string
   */
  public static componentToDate(value: Date, timezone = "") {
    proxyConsole.group("DateObject.componentToDate")

    proxyConsole.log("init", {
      value,
      timezone
    })
    const dateObject = new DateObject()
    dateObject._data.year = value.getFullYear()
    dateObject._data.month = value.getMonth() + 1
    dateObject._data.day = value.getDate()
    dateObject._data.hour = value.getHours()
    dateObject._data.minute = value.getMinutes()
    dateObject._data.second = value.getSeconds()
    dateObject._data.timezone = this.parseTimezone(timezone) || value.getTimezoneOffset()

    proxyConsole.log("result", dateObject)

    proxyConsole.groupEnd("DateObject.componentToDate")
    return dateObject
  }

  public static componentToDateRange(value: Date[], timezone = "") {
    proxyConsole.group("DateObject.componentToDateRange")

    proxyConsole.log("init", {
      value,
      timezone
    })

    const dateObject = new DateObject()
    dateObject._data.year = value[0].getFullYear()
    dateObject._data.month = value[0].getMonth() + 1
    dateObject._data.day = value[0].getDate()
    dateObject._data.hour = value[0].getHours()
    dateObject._data.minute = value[0].getMinutes()
    dateObject._data.second = value[0].getSeconds()

    dateObject._data.timezone = this.parseTimezone(timezone) || value[0].getTimezoneOffset()

    dateObject._endData.year = value[1].getFullYear()
    dateObject._endData.month = value[1].getMonth() + 1
    dateObject._endData.day = value[1].getDate()
    dateObject._endData.hour = value[1].getHours()
    dateObject._endData.minute = value[1].getMinutes()
    dateObject._endData.second = value[1].getSeconds()

    proxyConsole.log("result", dateObject)

    proxyConsole.groupEnd("DateObject.componentToDateRange")
    return dateObject
  }

  /**
   * change the date time with timezone
   * @param value get the date time part and timezone
   * @param timezone string
   */
  public static modelValueToDateObj(value: Date, timezone = "") {
    proxyConsole.group("DateObject.modelValueToDateObj")

    proxyConsole.log("init", {
      value,
      timezone
    })
    const currentOffset = new Date().getTimezoneOffset()
    const tzOffset = this.parseTimezone(timezone) || currentOffset
    const offset = currentOffset - tzOffset
    value.setMinutes(value.getMinutes() + offset)
    proxyConsole.log("offset date", value)

    const dateObject = new DateObject()
    dateObject._data.year = value.getFullYear()
    dateObject._data.month = value.getMonth() + 1
    dateObject._data.day = value.getDate()
    dateObject._data.hour = value.getHours()
    dateObject._data.minute = value.getMinutes()
    dateObject._data.second = value.getSeconds()
    dateObject._data.timezone = this.parseTimezone(timezone) || value.getTimezoneOffset()

    proxyConsole.log("result", dateObject)

    proxyConsole.groupEnd("DateObject.modelValueToDateObj")
    return dateObject
  }

  public static modelValueToDateTimeRange(value: Date[], timezone = "") {
    proxyConsole.group("DateObject.modelValueToDateRange")

    proxyConsole.log("init", {
      value,
      timezone
    })

    const currentOffset = new Date().getTimezoneOffset()
    const tzOffset = this.parseTimezone(timezone) || currentOffset
    const offset = currentOffset - tzOffset
    value[0].setMinutes(value[0].getMinutes() + offset)
    value[1].setMinutes(value[1].getMinutes() + offset)
    proxyConsole.log("offset date", value)

    const dateObject = new DateObject()
    dateObject._data.year = value[0].getFullYear()
    dateObject._data.month = value[0].getMonth() + 1
    dateObject._data.day = value[0].getDate()
    dateObject._data.hour = value[0].getHours()
    dateObject._data.minute = value[0].getMinutes()
    dateObject._data.second = value[0].getSeconds()

    dateObject._data.timezone = this.parseTimezone(timezone) || value[0].getTimezoneOffset()

    dateObject._endData.year = value[1].getFullYear()
    dateObject._endData.month = value[1].getMonth() + 1
    dateObject._endData.day = value[1].getDate()
    dateObject._endData.hour = value[1].getHours()
    dateObject._endData.minute = value[1].getMinutes()
    dateObject._endData.second = value[1].getSeconds()

    proxyConsole.log("result", dateObject)

    proxyConsole.groupEnd("DateObject.modelValueToDateRange")
    return dateObject
  }
}

type TimezoneOption = {
  width?: string
  show?: boolean
}

type DatePickerWithTimezoneValueModelType = Date | string | [Date, Date] | [string, string]

export { DateField, DateObject, proxyConsole as console }
export type { TimezoneOption, DatePickerWithTimezoneValueModelType }
