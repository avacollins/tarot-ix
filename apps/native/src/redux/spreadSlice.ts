import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useFirestore } from '../hooks';

export interface SpreadState {
  value: object[]
}

const initialState: SpreadState = {
  value: []
};

export const spreadSlice = createSlice({
  name: 'spread',
  initialState,
  reducers: {
    addSpread: (state, action: PayloadAction<object>) => {
      state.value.push(action.payload);
    }
  }
});

export default spreadSlice.reducer;

const { fetchSpread } = useFirestore();

export const fetchSpreads = () => async dispatch => {
  const response = await fetchSpread();
  if (response !== undefined && response !== null) {
    dispatch(spreadSlice.actions.addSpread(response));
  }
};
