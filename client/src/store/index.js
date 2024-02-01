import { proxy } from "valtio";

const state = proxy({
    user: {},
    darkMode: true,
})

export default state