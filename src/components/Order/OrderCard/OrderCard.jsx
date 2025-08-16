import { useState } from "react";
import OrderCardHeader from "../OrderCardHeader/OrderCardHeader";

export default function OrderCard({ 
    children, 
    title, 
    showToggle = false, 
    defaultOpen = true, 
}) {

    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = () => {
        if (showToggle) setIsOpen((prev) => !prev);
    };

    return (
        <div className="order-page-card">
            {title && (
                <OrderCardHeader 
                    title={title}
                    showToggle={showToggle}
                    handleToggle={handleToggle}
                    isOpen={isOpen}
                />
            )}

            <div className={`order-page-card-body ${isOpen ? "open" : "closed"}`}>
                {children}
            </div>
        </div>
    );
}