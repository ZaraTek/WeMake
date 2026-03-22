import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Dialog } from 'heroui-native';
import PoppinsText from '../text/PoppinsText';
import PoppinsTextInput from '../forms/PoppinsTextInput';
import AppButton from '../buttons/AppButton';

interface WriteUpDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const WriteUpDialog: React.FC<WriteUpDialogProps> = ({
    isOpen,
    onOpenChange,
    value,
    onChangeText,
    placeholder = 'Write up content'
}) => {
    return (
        <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className="max-h-[80vh] w-[90vw] max-w-[500px] bg-background">
                        <Dialog.Close />
                        <View className="mb-4 gap-2">
                            <Dialog.Title>
                                <PoppinsText className="text-2xl font-bold">Write Up Content</PoppinsText>
                            </Dialog.Title>
                            <Dialog.Description>
                                <PoppinsText className="text-muted-text">
                                    Add detailed content to your post
                                </PoppinsText>
                            </Dialog.Description>
                        </View>
                        
                        <View className="max-h-[400px]">
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <PoppinsTextInput
                                    value={value}
                                    onChangeText={onChangeText}
                                    placeholder={placeholder}
                                    multiline
                                    className="min-h-[300px] p-4 border border-subtle-border rounded-lg bg-inner-background"
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </ScrollView>
                        </View>

                        <View className="flex-row justify-end gap-3 mt-6">
                            <AppButton 
                                variant="transparent" 
                                onPress={() => onOpenChange(false)}
                                className="px-6"
                            >
                                <PoppinsText>Cancel</PoppinsText>
                            </AppButton>
                            <AppButton 
                                variant="primary" 
                                onPress={() => onOpenChange(false)}
                                className="px-6"
                            >
                                <PoppinsText>Done</PoppinsText>
                            </AppButton>
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>
    );
};

export default WriteUpDialog;
