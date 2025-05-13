import MainEditor
  from "~/feature/editor/main-editor";
import MainTools
  from "~/feature/editor/main-tools";
import {
  useLoginStore
} from "~/store/useLoginStore";
import {
    redirect,
    useNavigate,
} from "react-router";
import type {
    Route
} from "../../../.react-router/types/app/+types/root";
import {
    useEffect
} from "react";
import {
    supabase
} from "~/lib/apiClient";


export default function Home({loaderData,
}: Route.ComponentProps) {
    const navigate = useNavigate()
    const isLogin =  useLoginStore.use.isLogin()
    const login = useLoginStore.use.login()
    useEffect(()=>{
    if (!isLogin) {
        navigate('sign-in')
    }

        useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if(!session) return
                login(session)
            })
            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                if(!session) return
                login(session)
            })
            return () => subscription.unsubscribe()
        }, [])
},[])

    return (
        <div className={'text-black'}>
          {/*<MainTools/>*/}
          {/*<MainEditor/>*/}
        </div>
    )
}
