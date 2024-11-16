import NavButton from "../navbutton/navbutton";
import { IconLabel } from "@/types/userData";

type NavBarProps = {
    iconLabelMapping : Array<IconLabel>,
    setActiveTab: (tab: string) => void;
    activeTab: string
}

const NavBar = ({iconLabelMapping, setActiveTab, activeTab}: NavBarProps) => {

    return <nav className="fixed bottom-0 left-0 bg-white border-t border-gray-200 p-2">
        <div className="max-w-6xl mx-auto flex justify-around justify-items-stretch">
            {
                iconLabelMapping.map(
                    ({label, icon}) =>  
                    <NavButton
                        key={label}
                        icon={icon} 
                        label={label} 
                        setActiveTab={setActiveTab} 
                        activeTab={activeTab}
                    />
                )
            }
        </div>
      </nav>
}

export default NavBar