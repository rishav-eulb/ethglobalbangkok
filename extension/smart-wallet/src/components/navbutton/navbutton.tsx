
type NavButtonProps = {
    icon: any,
    label: any,
    setActiveTab: (label: string) => void
    activeTab: string
}


const NavButton = ({ icon: Icon, label, setActiveTab, activeTab }: NavButtonProps) => (
    <button
      onClick={() => setActiveTab(label.toLowerCase())}
      className={`flex flex-1 flex-col items-center p-2 bg-slate-300 mx-1 ${
        activeTab === label.toLowerCase()
          ? 'text-blue-600'
          : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      <Icon size={24} />
      <span className="text-xs mt-1">{label}</span>
    </button>
);

export default NavButton