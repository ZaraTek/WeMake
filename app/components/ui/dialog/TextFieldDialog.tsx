import React from 'react';
import { View, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, type TextInputProps } from 'react-native';
import { Dialog } from 'heroui-native';

interface TextFieldDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    multiline?: boolean;
    inputHeight?: number;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoCorrect?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
}

const TextFieldDialog: React.FC<TextFieldDialogProps> = ({
    isOpen,
    onOpenChange,
    value,
    onChangeText,
    placeholder,
    multiline = false,
    inputHeight,
    autoCapitalize,
    autoCorrect,
    keyboardType,
}) => {
    return (
        <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal className='bg-black/50'>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className='w-[90vw] max-w-[500px] bg-background'>
                        <Dialog.Close className='bg-grey' />
                        <View className='flex-row items-center gap-2'>
                            <TextInput
                                ref={(input) => {
                                    if (input && isOpen) {
                                        setTimeout(() => input.focus(), 100);
                                    }
                                }}
                                value={value}
                                onChangeText={onChangeText}
                                placeholder={placeholder}
                                multiline={multiline}
                                autoCapitalize={autoCapitalize}
                                autoCorrect={autoCorrect}
                                keyboardType={keyboardType}
                                textAlignVertical={multiline ? 'top' : 'center'}
                                className={`flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text ${multiline ? 'min-h-28' : ''}`}
                                style={inputHeight ? { height: inputHeight } : undefined}
                            />
                            <Pressable onPress={() => onOpenChange(false)} className='rounded-lg bg-blue-500 px-4 py-2'>
                                <Text className='text-white font-semibold'>Post</Text>
                            </Pressable>
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>
    );
};

export default TextFieldDialog;
