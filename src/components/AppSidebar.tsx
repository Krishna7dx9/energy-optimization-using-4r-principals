import { LayoutDashboard, Zap, Package, MapPin, BookOpen, Info, Leaf, Scale } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Energy Analyzer", url: "/analyzer", icon: Zap },
  { title: "Appliance Database", url: "/appliances", icon: Package },
  { title: "State Tariffs", url: "/tariffs", icon: MapPin },
  { title: "Bill Comparison", url: "/compare", icon: Scale },
  { title: "Saving Tips", url: "/tips", icon: BookOpen },
  { title: "About", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <div className="px-3 py-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg gradient-energy">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold text-sm leading-tight">Energy Optimizer</h2>
                  <p className="text-[10px] text-muted-foreground">🇮🇳 Made for India</p>
                </div>
              </div>
            </div>
          )}
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {!collapsed && (
          <div className="px-3 py-3 text-[10px] text-muted-foreground text-center">
            Free & Open • No Login Required
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
