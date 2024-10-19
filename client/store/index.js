import { create } from "zustand";
import {createAuthSlice} from "./slices/auth-slice.js";

export const useAppstore = create()((...a) => ({
    ...createAuthSlice(...a),
}));