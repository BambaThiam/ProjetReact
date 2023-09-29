import { Outlet } from "react-router-dom"
import { RouteProfileKeys } from "@/types/app"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/pages/profile/SidebarNav"

type SidebarNavItemProps = { title: string; route: RouteProfileKeys }[]

const sidebarNavItems: SidebarNavItemProps = [
  {
    title: "Profile",
    route: "profile",
  },
  {
    title: "Favorite",
    route: "favorite",
  },
]

export default function ProfileLayout() {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
