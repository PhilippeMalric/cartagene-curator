import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromMain from './main.reducer';





export interface  MetaInfo {
  nrow: number;
  ncol:number;
  varName:string[]
}

export interface  FileState {
  fileName: string;
  size:string;
  metaInfo: MetaInfo
}

export const selectupdatedd = (state: any) => state.updatedd;
export const selectall = (state: any) => state.main;


export const selectddCatCode = (state: any) => state.main.ddCatCode;
export const selectddCatLabel = (state: any) => state.main.ddCatLabel;
export const selectddCatVarName = (state: any) => state.main.ddCatVarName;
export const selectddVarDesc = (state: any) => state.main.ddVarDesc;
export const selectddVarName = (state: any) => state.main.ddVarName;
export const selectCrossVarM = (state: any) => state.main.crossVarM;
export const selectCrossVar = (state: any) => state.main.crossVar;
export const selectCrossVar1 = (state: any) => state.crossVar["0"];
export const selectCrossVar2 = (state: any) => state.crossVar["1"];
export const selectVarName = (state: any) => state.main.varName;
export const selectDataset = (state: any) => state.main.dataset;
export const selectData = (state: any) => state.main.data;
export const selectCategories = (state: any) => state.main.categories;
export const selectFileName_map = (state: any) => state.main.fileName_map;
export const selectFocusVar = (state: any) => state.main.focusVar;
export const selectFileName_dd = (state: any) => state.main.fileName_dd;
export const selectInterval = (state: any) => state.main.interval;
export const selectno_na = (state: any) => state.main.no_na;


export const selectFileState = (state: any) => state.main.fileState;


export const selectFileName = createSelector(
  selectFileState,
  (state: FileState) => state.fileName
);


export const selectVarNames = createSelector(
  selectFileState,
  (state: FileState) => state.metaInfo.varName
);


export const selectForStream = createSelector(
  selectInterval,
  selectVarNames,
  (interval,varNames) => ({ interval,varNames }),
)


export interface State {

  [fromMain.mainFeatureKey]: fromMain.MainState;
}

export const reducers: ActionReducerMap<State> = {

  [fromMain.mainFeatureKey]: fromMain.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
