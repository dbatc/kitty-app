import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";

import { useUser } from "@auth0/nextjs-auth0";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBar() {
  const { user, isLoading } = useUser();
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">Kitty App</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" color="secondary" href="#">
              Adopt a Kitty
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
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
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
