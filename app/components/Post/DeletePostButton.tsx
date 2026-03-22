import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useUserListGet } from '../../../hooks/useUserListGet';
import { useUserListRemove } from '../../../hooks/useUserListRemove';
import AppButton from '../ui/buttons/AppButton';
import PoppinsText from '../ui/text/PoppinsText';
import { PostType } from '../../../types/postTypes';

interface DeletePostButtonProps {
    postId: string | null;
    onDeleted: () => void;
}

const DeletePostButton = ({ postId, onDeleted }: DeletePostButtonProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const posts = useUserListGet<PostType>({
        key: 'posts',
        itemId: postId ?? undefined,
    });

    const removePost = useUserListRemove();

    const postRecord = useMemo(() => posts?.[0], [posts]);

    if (!postId) {
        return null;
    }

    const handleDelete = async () => {
        if (isDeleting || !postRecord?.itemId) {
            return;
        }

        try {
            setIsDeleting(true);
            await removePost({
                key: 'posts',
                itemId: postRecord.itemId,
            });
            onDeleted();
        } catch (error) {
            console.error('Failed to delete post', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <View className="px-4 pb-4 pt-2">
            <AppButton
                variant="outline"
                className="h-12 border-red-500"
                onPress={handleDelete}
            >
                <PoppinsText className="text-red-500">
                    {isDeleting ? 'Deleting...' : postRecord ? 'Delete Post' : 'Loading Post...'}
                </PoppinsText>
            </AppButton>
        </View>
    );
};

export default DeletePostButton;
