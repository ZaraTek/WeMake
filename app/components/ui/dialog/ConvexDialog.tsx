import React from 'react';
import { Dialog } from 'heroui-native/dialog';
import { ConvexReactClient } from 'convex/react';
import { ConvexProvider } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import cn from '../../../lib/utils';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

type ClerkAuthSnapshot = {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: 'convex'; skipCache?: boolean }) => Promise<string | null>;
    orgId: string | undefined | null;
    orgRole: string | undefined | null;
};

const ConvexDialogContent = ({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth?: ClerkAuthSnapshot;
}) => {
    if (auth) {
        const useCapturedAuth = () => auth;

        return (
            <ConvexProviderWithClerk client={convex} useAuth={useCapturedAuth}>
                {children}
            </ConvexProviderWithClerk>
        );
    }

    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    );
};

const ConvexDialog = {
    Root: Dialog,
    Trigger: Dialog.Trigger,
    Portal: Dialog.Portal,
    Overlay: ({ className, ...props }: any) => (
        <Dialog.Overlay className="bg-black/20" {...props} />
    ),
    Content: ({ children, className, auth, ...props }: any) => (
        <ConvexDialogContent auth={auth}>
            <Dialog.Content className={cn("bg-background rounded border border-subtle-border max-w-2xl w-full mx-auto", className)} {...props}>
                {children}
            </Dialog.Content>
        </ConvexDialogContent>
    ),
    Close: Dialog.Close,
    Title: Dialog.Title,
    Description: Dialog.Description,
};

export default ConvexDialog;
