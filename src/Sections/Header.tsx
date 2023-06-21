import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/nextjs";

const Header = () => {
    return (
        <header className='my-6 flex justify-between'>
            <h1 className='text-2xl font-bold'>SimpleNotes</h1>

            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
            </SignedOut>
        </header>
    )
}

export default Header
