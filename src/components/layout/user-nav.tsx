"use client"

import * as React from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User, UserRole } from "@/lib/types"
import { users, userRoles } from "@/lib/mock-data"
import { Check, ChevronDown } from "lucide-react"

interface UserNavProps {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

export function UserNav({ currentUser, setCurrentUser }: UserNavProps) {
  
  const handleRoleChange = (role: string) => {
    const newUser = users.find(u => u.role === role as UserRole);
    if (newUser) {
      setCurrentUser(newUser);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
            <AvatarFallback>{currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium leading-none">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">{currentUser.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Switch Role</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={currentUser.role} onValueChange={handleRoleChange}>
                {userRoles.map((role) => (
                  <DropdownMenuRadioItem key={role} value={role}>
                    {role}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
