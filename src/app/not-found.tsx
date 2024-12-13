import Link from 'next/link'
import { Suspense } from 'react'

const NotFound = () => {
    return (
        <Suspense fallback={<h1>Loading</h1>}>

            <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </Suspense>

    )
}

export default NotFound
