import Header from "@/components/header/Header";

const CommonLayout = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default CommonLayout;