'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {

    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentUserId = searchParams.get('user');
    const currentUserName = searchParams.get('name');

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you wants to delete this Prompt?");
        if (hasConfirmed) {
            try {
                const response = await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })
                const filteredPost = posts.filter(item => item._id !== post._id);
                setPosts(filteredPost);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const fetchPrompts = async () => {
        const response = await fetch(`/api/users/${currentUserId}/posts`);
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        (session?.user.id) && fetchPrompts();
    }, []);

    return (
        <Profile
            name={currentUserName ?? 'My'}
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile