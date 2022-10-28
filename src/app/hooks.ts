// Dependencies
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

// Redux Store
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;