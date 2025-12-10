import { AppHeader } from "@/components/app-header";

const layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <main>
                <AppHeader />
                {children}
            </main>
        </>
    );
}

export default layout;