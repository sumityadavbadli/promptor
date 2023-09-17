"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();

  const isUserLoggedIn = true;
  const [providers, setProvider] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    }
    setProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image src="assets/images/logo.svg" width={30} height={30} className="object-contain" alt="logo" />
        <p className="logo_text">Promptor</p>
      </Link>
      {/* Mobile Navigation */}
      <div className="sm:flex hidden">
        {session?.user ?
          (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">Create Post</Link>
              <button type="button" className="outline_btn" onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}>
                Sign Out
              </button>
              <Link
                href={{
                  pathname: '/profile',
                  query: {
                    user: session?.user.id,
                  },
                }}>
                <Image
                  src={session?.user.image}
                  width={33}
                  height={33}
                  alt="profile"
                  className="rounded-full"
                ></Image>
              </Link>
            </div>
          )
          :
          (<>
            {
              providers && Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>)
        }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user
            ?
            (
              <div className="flex">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="profile"
                  className="rounded-full"
                  onClick={() => (
                    setToggleDropdown((prev) => !prev)
                  )}
                ></Image>
                {(toggleDropdown) && (
                  <div className="dropdown">
                    <Link
                      href={{
                        pathname: '/profile',
                        query: {
                          user: session?.user.id,
                        },
                      }}
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      className="mt-5 w-full black_btn"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }
                      }
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )
            :
            (<>
              {
                providers && Object.values(providers).map(provider => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))
              }
            </>)
        }
      </div>
    </nav >
  )
}

export default Nav