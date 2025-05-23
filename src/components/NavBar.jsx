import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import Link from "next/link";

export default function NavBar({ user }) {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">Kitty App</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-8">
          <NavbarItem isActive>
            <Link aria-current="page" color="secondary" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/adoptKitty">
              Adopt a Kitty
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/lostKitties">
              Lost Kitties
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {user && (
          <section className="flex items-center gap-2">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-700">Welcome,</h3>
              <h2 className="text-md font-semibold text-gray-700">
                {user.name}
              </h2>
            </div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user.nickname}
                  size="md"
                  src={user.picture}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.nickname}@gmail.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <Link href="/auth/logout">Log Out</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </section>
        )}
        {!user && (
          <NavbarItem>
            <Button color="danger">
              <Link href="/login">
                <h1 className="text-white text-sm font-bold">Login</h1>
              </Link>
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
