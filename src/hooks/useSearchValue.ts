import { RootState } from "@/store";
import { searchActions } from "@/store/reducers";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSearchValue = () => {
  const dispatch = useDispatch();

  const { keyword } = useSelector(({ search }: RootState) => search);

  const setSearchValue = useCallback(
    (param: { keyword: string }) => {
      dispatch(searchActions.setSearchValue({ keyword: param.keyword }));
    },
    [dispatch]
  );

  const context = {
    keyword,
    setSearchValue: (param: { keyword: string }) => setSearchValue(param),
  };

  return context;
};
