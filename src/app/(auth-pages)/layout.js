import Footer from "@/components/footer/Footer";

const FooterLayout = ({children}) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}

export default FooterLayout;