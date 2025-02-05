import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletSelector as ShadcnWalletSelector } from "@/components/WalletSelector";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Settings, History, LogOut } from 'lucide-react';

const Navbar = ({ userAddress = "0x1234...5678", userName = "John Doe" }) => {
  // Get user initials for avatar
  // const getInitials = (name) => {
  //   return name
  //     .split(' ')
  //     .map(word => word[0])
  //     .join('')
  //     .toUpperCase();
  // };

  return (
    <nav className="border-b mb-10">
      <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            Fast<span className="text-blue-600">KYC</span>
          </span>
        </div>

        {/* Navigation Links */}


        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600 transition-colors"
                  href="/customer"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600 transition-colors"
                  href="/customer/integrations"
                >
                  <Settings className="w-4 h-4" />
                  <span>Integrations</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600 transition-colors"
                  href="/customer/history"
                >
                  <History className="w-4 h-4" />
                  <span>Transaction History</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ShadcnWalletSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
