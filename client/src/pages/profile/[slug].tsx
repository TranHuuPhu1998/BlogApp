import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/TypeScript'

const Profile = () => {
    const {slug} : IParams = useParams()
    console.log("🚀 ~ file: [slug].tsx ~ line 7 ~ Profile ~ slug", slug)
    return (
        <div>
            Profile
        </div>
    )
}

export default Profile
