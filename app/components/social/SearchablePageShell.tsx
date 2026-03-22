import React, { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';

interface SearchablePageShellProps extends PropsWithChildren {
    searchPanel: ReactNode;
}

const SEARCH_PULL_HEIGHT = 126;

const SearchablePageShell = ({ children, searchPanel }: SearchablePageShellProps) => {
    const scrollRef = useRef<ScrollView>(null);
    const { height } = useWindowDimensions();

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ y: SEARCH_PULL_HEIGHT, animated: false });
        });

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <ScrollView
            ref={scrollRef}
            contentOffset={{ x: 0, y: SEARCH_PULL_HEIGHT }}
            className="h-full"
            contentContainerStyle={{ paddingBottom: 140 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View className="px-4 pt-4 pb-3">
                {searchPanel}
            </View>
            <View style={{ minHeight: Math.max(0, height - 160) }}>
                {children}
            </View>
        </ScrollView>
    );
};

export default SearchablePageShell;
