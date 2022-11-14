import { useCallback, useState } from "react";

import useDebounce from "./useDebounce";

export default function useErrors(
  initialState = {
    title: "",
    content: "",
  }
) {
  const [formError, setFormError] = useState(initialState);

  const removeError = useCallback((name: string) => {
    setFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  }, []);

  const setError = useCallback((name: string, message: string) => {
    return setFormError((prev) => ({
      ...prev,
      [name]: message,
    }));
  }, []);

  const resetErrors = useCallback(() => {
    setFormError(initialState);
  }, [initialState]);

  const debouncedErrorValue = useDebounce(formError, 500);

  return {
    formError: debouncedErrorValue,
    removeError,
    setError,
    resetErrors,
  };
}
