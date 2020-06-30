import { TimerType } from "./TimerType";
import { TimerOptions } from "./TimerOptions";

export interface TimerState {
    timerOptions: TimerOptions,
    indicator: TimerType
}