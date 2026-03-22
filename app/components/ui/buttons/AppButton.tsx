import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Row from '../../layout/Row';

interface AppButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'grey' | 'transparent' | 'fakeTextBox';
    className?: string;
    onPress?: () => void;
    disabled?: boolean;
    dropShadow?: boolean;
    selected?: boolean;
    shadowColor?: string;
}

const AppButton = ({
    children,
    variant = 'outline',
    className = '',
    onPress,
    disabled = false,
    dropShadow = true,
    selected = false,
    shadowColor
}: AppButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const baseStyles = 'h-10 flex-row items-center justify-center rounded gap-2 overflow-hidden';
    let extraStyles = '';

    let pressedStyles = 'brightness-50';
    let shadowStyle = {};

    if (variant === 'outline') {
        const bg = 'bg-none';
        extraStyles = `border-2 border-border ${bg} group hover:bg-border`;
        
    } else if (variant === 'grey') {
        const bg = 'bg-[#374559ae]';
        extraStyles = bg;
        pressedStyles = 'brightness-80';
    } else if (variant === 'primary') {
        const bg = 'bg-primary-accent';
        extraStyles = `${bg} group hover:brightness-125 active:brightness-50`;
    } else if (variant === 'secondary') {
        const bg = 'bg-text';
        extraStyles = `${bg} group hover:brightness-150 active:brightness-50`;
    } else if (variant === 'transparent') {
        const bg = selected ? 'bg-text/10' : 'bg-none';
        extraStyles = bg;
    } else if (variant === 'fakeTextBox') {
        const bg = 'bg-[#2a2a2a]';
        extraStyles = `border border-subtle-border  ${bg} justify-start pl-3`;
        pressedStyles = 'brightness-80';
        // Apply shadow if shadowColor prop is provided
        if (shadowColor) {
            const colorMap: { [key: string]: any } = {
                'red': styles.redShadow,
                'red-500': styles.redShadow,
                'blue': styles.blueShadow,
                'blue-500': styles.blueShadow,
                'green': styles.greenShadow,
                'green-500': styles.greenShadow,
                'purple': styles.purpleShadow,
                'purple-500': styles.purpleShadow,
                'yellow': styles.yellowShadow,
                'yellow-500': styles.yellowShadow,
                'black': styles.blackShadow,
                'gray': styles.grayShadow,
                'gray-500': styles.grayShadow,
            };
            shadowStyle = colorMap[shadowColor] || styles.redShadow;
        }
    }

    return (

        <TouchableOpacity
            style={shadowStyle}
            className={`${baseStyles} ${extraStyles} ${className} ${disabled ? 'opacity-50' : ''} ${isPressed ? pressedStyles : ''}`}
            onPressIn={() => !disabled && setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
            activeOpacity={disabled ? 1 : 0.8}
        >
            <Row className={`items-center w-full h-full ${variant === 'fakeTextBox' ? 'justify-start' : 'justify-center'}`} pointerEvents='none'>
                {children}
            </Row>
            
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    redShadow: {
        shadowColor: '#ef4444',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    blueShadow: {
        shadowColor: '#3b82f6',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    greenShadow: {
        shadowColor: '#10b981',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    purpleShadow: {
        shadowColor: '#8b5cf6',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    yellowShadow: {
        shadowColor: '#eab308',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    blackShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    grayShadow: {
        shadowColor: '#6b7280',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    }
});

export default AppButton;
