const FeatureCategory = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <div className="space-y-2.5">
        <h3 className="text-xl text-gray-300 font-roboto-condensed">{label}:</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

export default FeatureCategory;