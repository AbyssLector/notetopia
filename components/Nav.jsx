"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [ToggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }
        setUpProviders()
        const handleScroll = () => {
            const offset = window.pageYOffset;
            if (offset > 1)
                document.getElementById('nav').classList.add('bg-orange-300')
            else
                document.getElementById('nav').classList.remove('bg-orange-300')
        }
        window.addEventListener("scroll", handleScroll)
    }, [])


    return (
        <div id="nav" className={` w-full mb-16 p-3 rounded-b-2xl sticky top-0`}>
            <nav className="flex-between ">
                <Link href="/" className="flex gap-2 flex-center">
                    <Image src="/assets/images/logo.svg"
                        alt="Notetopia Logo"
                        width={50}
                        height={50}
                        className="object-contain" />
                    <p className="logo_text">Notetopia</p>
                </Link>

                {/* Desktop Nav */}
                <div className="sm:flex hidden">
                    {session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href="/create-note"
                                className="black_btn">Create Post</Link>
                            <button type="button" onClick={signOut}
                                className="outline_btn"> Sign Out</button>
                            <Link href="/profile">
                                <Image src={session?.user.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full cursor-pointer"
                                    alt="profile"
                                />
                            </Link>
                        </div>
                    ) :
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button type="button"
                                    key={provider.name}
                                    onClick={() => { signIn(provider.id) }}
                                    className="black_btn">
                                    Sign in
                                </button>
                            ))}
                        </>
                    }
                </div>
                {/* {(session?.user) ? alert(session?.user) : <></>
            } */}
                {/* {console.log(session?.user)} */}
                {/* Mobile Nav */}
                <div className="sm:hidden flex relative">
                    {session?.user ? (
                        <div className="flex">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                onClick={() => { setToggleDropdown(prev => !prev) }}
                            />
                            {ToggleDropdown && (
                                <div className="dropdown">
                                    <Link href="/profile"
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link href="/create-note"
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Create Note
                                    </Link>
                                    <button type="button"
                                        className="mt-5 w-full black_btn"
                                        onClick={() => {
                                            setToggleDropdown(false)
                                            signOut()
                                        }}>Sign Out</button>
                                </div>
                            )}
                        </div>
                    ) :
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button type="button"
                                    key={provider.name}
                                    onClick={() => { signIn(provider.id) }}
                                    className="black_btn">
                                    Sign in
                                </button>
                            ))}
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Nav