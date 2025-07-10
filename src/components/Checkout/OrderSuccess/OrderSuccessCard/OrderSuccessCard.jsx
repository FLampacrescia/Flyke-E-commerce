import { useState } from "react";
import OrderSuccessCardHeader from "../OrderSuccessCardHeader/OrderSuccessCardHeader";

export default function OrderSuccessCard({ 
    children, 
    title, 
    showToggle = false, 
    rightElement = null, 
    defaultOpen = true, 
}) {

    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = () => {
        if (showToggle) setIsOpen((prev) => !prev);
    };

    return (
        <div className="order-success-card">
            {title && (
                <OrderSuccessCardHeader 
                    title={title}
                    showToggle={showToggle}
                    rightElement={rightElement}
                    handleToggle={handleToggle}
                    isOpen={isOpen}
                />
            )}

            <div className={`order-success-card-body ${isOpen ? "open" : "closed"}`}>
                {children}
            </div>
        </div>
    );
}