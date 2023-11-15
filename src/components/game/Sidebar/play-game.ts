import type { Game } from "../types";
import { createContext } from "react";

export const PlayGameContext = createContext<{game: Game|null}>({
  game: null,
});

