import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchBrands, fetchOffers } from '../api/favoritApi'

export const searchBrands = createAsyncThunk(
  'parts/searchBrands',
  async (number, { rejectWithValue }) => {
    try {
      const brands = await fetchBrands(number.trim())
      return { number: number.trim(), brands }
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка запроса производителей')
    }
  },
)

export const loadOffers = createAsyncThunk(
  'parts/loadOffers',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      const offers = await fetchOffers(number, brand)
      return { brand, offers }
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка запроса аналогов')
    }
  },
)

const initialState = {
  number: '',
  brands: [],
  selectedBrand: null,
  offers: [],
  brandsLoading: false,
  offersLoading: false,
  brandsError: null,
  offersError: null,
}

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    setNumber(state, action) {
      state.number = action.payload
    },
    resetResults(state) {
      state.brands = []
      state.selectedBrand = null
      state.offers = []
      state.brandsError = null
      state.offersError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBrands.pending, (state) => {
        state.brandsLoading = true
        state.brandsError = null
        state.selectedBrand = null
        state.offers = []
        state.offersError = null
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        state.brandsLoading = false
        state.number = action.payload.number
        state.brands = action.payload.brands
        if (action.payload.brands.length === 0) {
          state.brandsError = 'По этому артикулу ничего не найдено'
        }
      })
      .addCase(searchBrands.rejected, (state, action) => {
        state.brandsLoading = false
        state.brands = []
        state.brandsError = action.payload || 'Ошибка сети'
      })
      .addCase(loadOffers.pending, (state) => {
        state.offersLoading = true
        state.offersError = null
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.offersLoading = false
        state.selectedBrand = action.payload.brand
        state.offers = action.payload.offers
        if (action.payload.offers.length === 0) {
          state.offersError = 'Аналоги и предложения не найдены'
        }
      })
      .addCase(loadOffers.rejected, (state, action) => {
        state.offersLoading = false
        state.offers = []
        state.offersError = action.payload || 'Ошибка сети'
      })
  },
})

export const { setNumber, resetResults } = partsSlice.actions
export default partsSlice.reducer
