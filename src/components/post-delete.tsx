'use client'

import { deletePost } from "@/app/actions/posts";

interface PostDeleteProps {
    id: string,
}

export default function PostDelete({ id }: PostDeleteProps) {
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        deletePost(id);
    };

    return <form onSubmit={deleteAction}>
        <button type="submit" className="text-sm opacity-30 text-red-500">Delete</button>
    </form>
}
