interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className = "" }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gold-50">
      <div
        className={`mx-auto w-full px-4 pb-4 ${className}`}
        style={{ maxWidth: "430px" }}
      >
        {children}
      </div>
    </div>
  );
}
