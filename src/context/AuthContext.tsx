import { createContext, useEffect, useState } from "react"

import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import { useGetSessionUser } from "@/commons/api/hooks/auth"

type AuthContextType = {
  user: User | null
  isLoading: boolean
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})

type AuthContextProvider = {
  children: React.ReactNode
}
const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [user, setUser] = useState<User | null>(null)

  const { mutateAsync, isLoading } = useGetSessionUser({
    onSuccess: (session) => setUser(session?.user ?? null),
  })

  useEffect(() => {
    void mutateAsync()
    supabase.auth.onAuthStateChange((_event, session) => {
      switch (_event) {
        case "SIGNED_OUT":
          setUser(null)
          break
      }
      setUser(session?.user ?? null)
    })
  }, [mutateAsync])
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthContextProvider }