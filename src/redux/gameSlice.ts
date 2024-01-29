import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { calcAutoclickerCost } from '../cost';

const autoclickerUpdateRate = 1000;

export type GameState = {
  autoclickers: number;
  clicks: number;
  lastUpdate: number;
}

const initialState: GameState = { 
  clicks: 0,
  autoclickers: 0,
  lastUpdate: Date.now() 
};

export type BuyAction = {
  building: 'autoclicker'
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    tick: (state: GameState) => {
      const newState = { ...state };
      const now = Date.now();
      const delta = now - state.lastUpdate;
      
      // Add autoclicker additions
      newState.clicks += state.autoclickers * (delta / autoclickerUpdateRate);

      // Update time in state
      newState.lastUpdate = now;

      return newState;
    },
    click: (state: GameState) => {
      return {
        ...state,
        clicks: state.clicks + 1
      };
    },
    buy: (state: GameState, action: PayloadAction<BuyAction>) => {
      switch (action.payload.building) {
        // Try buying autoclicker
        case 'autoclicker': {
          const cost = calcAutoclickerCost(state.autoclickers);
          if (cost < state.clicks) {
            const newState = { ...state };
            newState.autoclickers += 1;
            newState.clicks -= cost;
            return newState;
          }
        }
      }

      return state;
    }
  }
})

export const { tick, click, buy } = gameSlice.actions;
export default gameSlice.reducer;