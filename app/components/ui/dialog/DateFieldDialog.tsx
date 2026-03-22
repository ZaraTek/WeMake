import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Dialog } from 'heroui-native';
import PoppinsText from '../text/PoppinsText';
import PoppinsDateInput from '../forms/PoppinsDateInput';
import AppButton from '../buttons/AppButton';

interface DateFieldDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const DateFieldDialog: React.FC<DateFieldDialogProps> = ({
    isOpen,
    onOpenChange,
    value,
    onChangeText,
    placeholder = 'Project Date',
}) => {
    return (
        <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal className='bg-black/50'>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className='w-[90vw] max-w-[500px] bg-background'>
                        <Dialog.Close className='bg-grey' />
                        
                        <PoppinsDateInput
                            value={value}
                            onChangeText={(displayValue) => onChangeText(displayValue)}
                            placeholder={placeholder}
                            className='p-4 border mt-6 border-subtle-border rounded-lg bg-inner-background'
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                        />
                        <View className='flex-row justify-end gap-3 mt-6'>
                            <AppButton variant='transparent' onPress={() => onOpenChange(false)} className='px-6'>
                                <PoppinsText>Cancel</PoppinsText>
                            </AppButton>
                            <AppButton variant='primary' onPress={() => onOpenChange(false)} className='px-6'>
                                <PoppinsText>Done</PoppinsText>
                            </AppButton>
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>
    );
};

export default DateFieldDialog;
