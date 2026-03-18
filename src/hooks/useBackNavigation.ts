import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useBackNavigation() {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(-1);
  }, [navigate]);
}
