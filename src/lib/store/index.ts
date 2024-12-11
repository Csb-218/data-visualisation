import { configureStore } from '@reduxjs/toolkit'
import barChartReducer from './barChartSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      barChart : barChartReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

