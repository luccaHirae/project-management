import Link from "next/link";
import { useGetAuthUserQuery } from "@/state/api";
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: currentUser } = useGetAuthUserQuery({});

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error signing out");
      }
    }
  };

  if (!currentUser) return null;

  const { userDetails } = currentUser;

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Searchbar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="size-8 dark:text-white" />
          </button>
        )}

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />

          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="size-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="size-6 cursor-pointer dark:text-white" />
          )}
        </button>

        <Link
          href="/settings"
          className={
            isDarkMode
              ? `h-min w-min rounded p-2 hover:bg-gray-700`
              : `h-min w-min rounded p-2 hover:bg-gray-100`
          }
        >
          <Settings className="size-6 cursor-pointer dark:text-white" />
        </Link>

        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>

        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex size-9 justify-center">
            {!!userDetails?.profilePictureUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${userDetails.profilePictureUrl}`}
                alt={userDetails.username}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="size-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>

          <span className="mx-3 text-gray-800 dark:text-white">
            {userDetails?.username}
          </span>

          <button
            onClick={handleSignOut}
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};
