import { TimerOptions } from "../types/TimerOptions"
import { TimerType } from "../types/TimerType"
import { PieceColor } from "../types/PieceColor"
import { TimerState } from "../types/TimerState"

class TimerManager {
  intervalId!: NodeJS.Timeout
  timerOptions: TimerOptions
  indicator: TimerType
  color: PieceColor
  timerCallback: () => void

  constructor(timerOptions: TimerOptions, color: PieceColor, timerCallback: () => void) {
    this.timerOptions = {
      minutes: timerOptions.minutes,
      seconds: timerOptions.seconds,
      increment: timerOptions.increment
    }
    this.color = color
    this.indicator = "not-started"
    this.timerCallback = timerCallback
  }

  static initial = (): TimerState => ({
    timerOptions: {
      minutes: 0,
      seconds: 0,
      increment: 0
    },
    indicator: "not-started"
  })

  timer = () => {
    this.updateTime()

    if (this.timerOptions.minutes === 0 && this.timerOptions.seconds === 0) {
      clearInterval(this.intervalId)
      this.indicator = "finished"
    }
    this.timerCallback()
  }

  handleTimerUpdates = () => {
    if (this.timerOptions.minutes > 0 || this.timerOptions.seconds > 0) {
      if (this.indicator === "started") {
        this.stopTimer()
      } else {
        this.startTimer()
      }
    }
  }

  startTimer = () => {
    this.intervalId = setInterval(this.timer, 1000)
    this.indicator = "started"
  }

  stopTimer = () => {
    if (this.indicator !== "not-started" && this.indicator !== "finished") {
      this.handleIncrement()
    }
    clearInterval(this.intervalId)
    this.indicator = "stopped"
  }

  handleIncrement = () => {
    const newSeconds = this.timerOptions.seconds + this.timerOptions.increment
    if (newSeconds >= 60) {
      ++this.timerOptions.minutes
      this.timerOptions.seconds = newSeconds % 60
    } else {
      this.timerOptions.seconds = newSeconds
    }
  }

  updateTime = () => {
    if (this.timerOptions.seconds === 0) {
      this.timerOptions.seconds = 59
      --this.timerOptions.minutes
    } else {
      --this.timerOptions.seconds
    }
  }

  current = () => ({
    timerOptions: this.timerOptions,
    indicator: this.indicator
  })
}

export default TimerManager