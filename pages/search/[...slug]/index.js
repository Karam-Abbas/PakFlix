import { useRouter } from 'next/router'
import React from 'react'

// this page is for slug testing

const index = () => {
    const router = useRouter();
    
    // Wait for the router to be ready
    if (router.isReady === false) {
        return <div>Loading...</div>;
    }
    
    const searchItem = router.query.slug;
    console.log(searchItem)
    
    return (
        <div>
            {searchItem && searchItem.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    )
}

export default index