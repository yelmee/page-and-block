import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [
    index("./feature/home/home.tsx"),
    route("sign-in", "./feature/auth/sign-in.tsx"),
    route("sign-up", "./feature/auth/sign-up.tsx"),


] satisfies RouteConfig;
