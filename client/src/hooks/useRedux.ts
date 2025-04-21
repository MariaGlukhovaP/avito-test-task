import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Кастомный хук для получения dispatch с типом AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Кастомный хук для получения состояния с типом RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
