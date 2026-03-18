import { useContext } from "react";
import { GiftCardContext } from "../contexts/GiftCardContext";

export function useGiftCards() {
  return useContext(GiftCardContext);
}
