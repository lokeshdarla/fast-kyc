import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const HomeNavbar = () => {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto ">
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            Fast<span className="text-blue-600">KYC</span>
          </span>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <Button asChild variant="default" className="g-blue-600 hover:bg-blue-700 mt-4">
                <NavigationMenuLink href="/login">
                  Login
                </NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default HomeNavbar;