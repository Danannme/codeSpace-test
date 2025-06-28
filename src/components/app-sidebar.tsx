import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

// This is sample data.

export function AppSidebar({
    pageLink,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    pageLink: { title: string; url: string }[];
}) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="py-4.5 px-4 border-b-2">
                {/* logo */}
                <h1 className="text-2xl ">Elmora</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {pageLink.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        // isActive={true}
                                    >
                                        <Link
                                            className="text-[1.1rem]"
                                            to={{ pathname: item.url }}
                                        >
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
