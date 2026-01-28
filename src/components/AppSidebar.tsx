import { Home, TrendingUp, Eye, Clock, Star, Flame } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Trending', url: '/trending', icon: Flame },
  { title: 'Most Viewed', url: '/most-viewed', icon: Eye },
  { title: 'New Releases', url: '/new-releases', icon: Clock },
  { title: 'Top Rated', url: '/top-rated', icon: Star },
  { title: 'Popular', url: '/popular', icon: TrendingUp },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-white/10 bg-black/95 backdrop-blur-xl">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-4 mb-2">
            {!isCollapsed && 'Browse'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/'}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
                      activeClassName="bg-gradient-to-r from-coral/20 to-gold/20 text-foreground border-l-2 border-coral"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
