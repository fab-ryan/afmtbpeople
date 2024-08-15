import { bindActionCreators } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

import  AllActions  from '@redux/allActions';
import { type AppDispatch, type RootState } from '@redux/config';

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(AllActions, dispatch);
};

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
